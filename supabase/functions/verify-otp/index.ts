import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Create Supabase client with service role key to bypass RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface VerifyOTPRequest {
  email: string;
  otp: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received OTP verification request");
    
    const { email, otp }: VerifyOTPRequest = await req.json();
    
    console.log(`Verifying OTP for email: ${email}`);

    // First clean up expired pending users
    await supabase.rpc('cleanup_expired_pending_users');

    // Find the pending user with matching email and OTP
    const { data: pendingUser, error: fetchError } = await supabase
      .from('pending_users')
      .select('*')
      .eq('email', email)
      .eq('otp_code', otp)
      .single();

    if (fetchError || !pendingUser) {
      console.log("Invalid or expired OTP");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid or expired verification code" 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("OTP verified, creating user account");

    // Create the user account using admin API
    const { data: userData, error: createUserError } = await supabase.auth.admin.createUser({
      email: pendingUser.email,
      password: pendingUser.password_hash,
      email_confirm: true, // Auto-confirm since they verified OTP
    });

    if (createUserError || !userData.user) {
      console.error("Error creating user:", createUserError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Failed to create user account" 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("User created successfully, updating profile");

    // Upload profile photo if provided
    let avatarUrl = null;
    if (pendingUser.profile_photo_data) {
      try {
        // Convert base64 to blob
        const base64Data = pendingUser.profile_photo_data.split(',')[1];
        const byteArray = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        
        const fileName = `${userData.user.id}/profile.jpg`;
        
        const { error: uploadError } = await supabase.storage
          .from('profile-photos')
          .upload(fileName, byteArray, {
            contentType: 'image/jpeg',
            upsert: true
          });

        if (!uploadError) {
          const { data } = supabase.storage
            .from('profile-photos')
            .getPublicUrl(fileName);
          avatarUrl = data.publicUrl;
        }
      } catch (photoError) {
        console.error("Error uploading photo:", photoError);
        // Continue even if photo upload fails
      }
    }

    // Create profile record
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        user_id: userData.user.id,
        email: pendingUser.email,
        display_name: pendingUser.full_name?.split(' ')[0] || pendingUser.email.split('@')[0],
        full_name: pendingUser.full_name,
        phone_number: pendingUser.phone_number,
        date_of_birth: pendingUser.date_of_birth,
        address: pendingUser.address,
        avatar_url: avatarUrl
      });

    if (profileError) {
      console.error("Error creating profile:", profileError);
      // Don't fail the whole process if profile creation fails
    }

    // Delete the pending user record
    await supabase
      .from('pending_users')
      .delete()
      .eq('id', pendingUser.id);

    console.log("User registration completed successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Account verified and created successfully!" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in verify-otp function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Verification failed. Please try again." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);