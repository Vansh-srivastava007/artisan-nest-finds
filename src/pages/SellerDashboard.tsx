import { useState } from 'react';
import { BarChart3, Package, DollarSign, Users, TrendingUp, Eye, Heart, Check, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import potteryImage from '@/assets/pottery-sample.jpg';
import furnitureImage from '@/assets/furniture-sample.jpg';
import textileImage from '@/assets/textile-sample.jpg';

const SellerDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  const overview = {
    totalListings: 24,
    pendingApprovals: 3,
    activeListings: 18,
    totalRevenue: 45600,
    newOrders: 8,
    totalViews: 1247,
    conversionRate: 3.2
  };

  const pendingApprovals = [
    {
      id: 1,
      image: potteryImage,
      title: "Ceramic Plant Pot Set",
      category: "Pottery",
      price: 1800,
      submittedDate: "2024-01-16"
    },
    {
      id: 2,
      image: furnitureImage,
      title: "Handmade Wooden Stool",
      category: "Furniture",
      price: 3200,
      submittedDate: "2024-01-15"
    },
    {
      id: 3,
      image: textileImage,
      title: "Organic Cotton Table Runner",
      category: "Textiles", 
      price: 950,
      submittedDate: "2024-01-14"
    }
  ];

  const recentOrders = [
    {
      id: "ORD001",
      product: "Handcrafted Terracotta Vase Set",
      customer: "Priya S.",
      amount: 2500,
      status: "confirmed",
      date: "2024-01-16"
    },
    {
      id: "ORD002",
      product: "Reclaimed Wood Coffee Table", 
      customer: "Raj M.",
      amount: 8500,
      status: "preparing",
      date: "2024-01-15"
    },
    {
      id: "ORD003",
      product: "Handwoven Cotton Throw",
      customer: "Maya P.",
      amount: 1800,
      status: "shipped",
      date: "2024-01-14"
    }
  ];

  const monthlyData = [
    { month: 'Oct', sales: 12000 },
    { month: 'Nov', sales: 15000 },
    { month: 'Dec', sales: 18500 },
    { month: 'Jan', sales: 22000 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'preparing': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'shipped': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const handleApproval = (id: number, action: 'approve' | 'reject') => {
    console.log(`${action} item ${id}`);
    // Handle approval logic here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Seller Dashboard</h1>
              <p className="text-muted-foreground">Manage your listings and sales</p>
            </div>
          </div>
          <Link to="/sell">
            <Button className="bg-gradient-to-r from-craft-terracotta to-orange-500 hover:from-craft-terracotta/90 hover:to-orange-500/90">
              Add New Listing
            </Button>
          </Link>
        </div>
      </header>

      <div className="container px-4 py-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-craft-terracotta" />
                <span className="text-sm font-medium">Total Listings</span>
              </div>
              <p className="text-2xl font-bold">{overview.totalListings}</p>
              <p className="text-xs text-muted-foreground">{overview.activeListings} active</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-craft-sage" />
                <span className="text-sm font-medium">Revenue</span>
              </div>
              <p className="text-2xl font-bold">₹{overview.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-green-600">+12% this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">New Orders</span>
              </div>
              <p className="text-2xl font-bold">{overview.newOrders}</p>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Total Views</span>
              </div>
              <p className="text-2xl font-bold">{overview.totalViews}</p>
              <p className="text-xs text-muted-foreground">{overview.conversionRate}% conversion</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="approvals">Pending Approvals ({overview.pendingApprovals})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-xl">
                      <div className="flex-1">
                        <h4 className="font-medium">{order.product}</h4>
                        <p className="text-sm text-muted-foreground">
                          Order {order.id} • {order.customer} • {order.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-craft-terracotta">₹{order.amount.toLocaleString()}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="approvals" className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Pending Approvals</h2>
              <p className="text-sm text-muted-foreground">
                {pendingApprovals.length} items waiting for approval
              </p>
            </div>
            
            {pendingApprovals.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-craft-terracotta">₹{item.price.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground">Submitted {item.submittedDate}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleApproval(item.id, 'approve')}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          className="flex-1"
                          onClick={() => handleApproval(item.id, 'reject')}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6 mt-6">
            {/* Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Monthly Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex items-center gap-4">
                      <span className="w-8 text-sm font-medium">{data.month}</span>
                      <div className="flex-1">
                        <Progress 
                          value={(data.sales / 25000) * 100} 
                          className="h-3"
                        />
                      </div>
                      <span className="text-sm font-medium text-craft-terracotta">
                        ₹{data.sales.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Terracotta Vase Set</span>
                      <span className="text-sm font-medium">45 views</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Wooden Coffee Table</span>
                      <span className="text-sm font-medium">38 views</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Cotton Throw</span>
                      <span className="text-sm font-medium">32 views</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Average Order Value</span>
                      <span className="text-sm font-medium">₹3,850</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Conversion Rate</span>
                      <span className="text-sm font-medium">3.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Customer Rating</span>
                      <span className="text-sm font-medium">4.8/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;