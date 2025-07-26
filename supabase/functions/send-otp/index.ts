import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendOTPRequest {
  email: string;
  otp: string;
  fullName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received OTP send request");
    
    const { email, otp, fullName }: SendOTPRequest = await req.json();
    
    console.log(`Sending OTP to ${email} for user ${fullName}`);

    const emailResponse = await resend.emails.send({
      from: "Marketplace <onboarding@resend.dev>",
      to: [email],
      subject: "Your Verification Code - Marketplace",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Verification Code</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .otp-container { background: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
            .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2563eb; margin: 10px 0; font-family: 'Courier New', monospace; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; font-size: 14px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Welcome to Marketplace!</h1>
          </div>
          
          <p>Hi ${fullName},</p>
          
          <p>Thank you for signing up! Please use the verification code below to complete your account setup:</p>
          
          <div class="otp-container">
            <p><strong>Your Verification Code:</strong></p>
            <div class="otp-code">${otp}</div>
            <p style="margin-top: 15px; color: #6b7280;">This code will expire in 10 minutes</p>
          </div>
          
          <p>If you didn't request this verification code, please ignore this email.</p>
          
          <div class="footer">
            <p>Best regards,<br>The Marketplace Team</p>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "OTP sent successfully",
        emailId: emailResponse.data?.id 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-otp function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to send OTP" 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);