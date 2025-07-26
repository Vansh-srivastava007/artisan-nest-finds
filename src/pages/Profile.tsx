import { useState } from 'react';
import { Settings, Star, Package, ShoppingBag, Heart, MapPin, Phone, Mail, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/ui/header';
import BottomNav from '@/components/ui/bottom-nav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import potteryImage from '@/assets/pottery-sample.jpg';
import furnitureImage from '@/assets/furniture-sample.jpg';
import textileImage from '@/assets/textile-sample.jpg';

const Profile = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const userInfo = {
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    joinDate: "January 2024",
    rating: 4.8,
    totalOrders: 12
  };

  const myListings = [
    {
      id: 1,
      image: potteryImage,
      title: "Handcrafted Terracotta Vase Set",
      price: 2500,
      status: "active",
      views: 45,
      favorites: 8
    },
    {
      id: 2,
      image: furnitureImage,
      title: "Reclaimed Wood Coffee Table",
      price: 8500,
      status: "sold",
      views: 78,
      favorites: 12
    }
  ];

  const myPurchases = [
    {
      id: 1,
      image: textileImage,
      title: "Handwoven Cotton Throw",
      price: 1800,
      purchaseDate: "2024-01-10",
      status: "delivered"
    },
    {
      id: 2,
      image: potteryImage,
      title: "Ceramic Dinner Set",
      price: 3200,
      purchaseDate: "2024-01-05",
      status: "delivered"
    }
  ];

  const favorites = [
    {
      id: 1,
      image: furnitureImage,
      title: "Wooden Bookshelf",
      price: 6500,
      seller: "Artisan Woods"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'sold': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <div className="container px-4 py-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-lg bg-craft-sage/20 text-craft-warm">PS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold">{userInfo.name}</h1>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {userInfo.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {userInfo.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {userInfo.location}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{userInfo.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {userInfo.totalOrders} orders • Joined {userInfo.joinDate}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seller Dashboard Link */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-craft-terracotta/20 p-2 rounded-xl">
                  <Package className="h-5 w-5 text-craft-terracotta" />
                </div>
                <div>
                  <h3 className="font-semibold">Seller Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Manage your listings and sales</p>
                </div>
              </div>
              <Link to="/seller-dashboard">
                <Button variant="outline">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="listings" className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">My Listings ({myListings.length})</h2>
              <Link to="/sell">
                <Button size="sm" className="bg-gradient-to-r from-craft-terracotta to-orange-500 hover:from-craft-terracotta/90 hover:to-orange-500/90">
                  Add New Listing
                </Button>
              </Link>
            </div>
            {myListings.map((listing) => (
              <Card key={listing.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold line-clamp-2">{listing.title}</h3>
                        <Badge className={getStatusColor(listing.status)}>
                          {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="font-bold text-craft-terracotta">₹{listing.price.toLocaleString()}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{listing.views} views</span>
                        <span>{listing.favorites} favorites</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                        <Button size="sm" variant="outline" className="flex-1">Share</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="purchases" className="space-y-4 mt-6">
            <h2 className="text-lg font-semibold">Recent Purchases</h2>
            {myPurchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={purchase.image} alt={purchase.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold line-clamp-2">{purchase.title}</h3>
                      <p className="font-bold text-craft-terracotta">₹{purchase.price.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Purchased on {purchase.purchaseDate}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">Rate & Review</Button>
                        <Button size="sm" variant="outline" className="flex-1">Reorder</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Order updates</Label>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketing">Marketing emails</Label>
                  <Switch id="marketing" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="seller-updates">Seller notifications</Label>
                  <Switch id="seller-updates" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Saved Items
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Help & Support
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive">
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;