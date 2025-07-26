import { useState } from 'react';
import { ArrowLeft, Filter, Truck, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/ui/header';
import BottomNav from '@/components/ui/bottom-nav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import potteryImage from '@/assets/pottery-sample.jpg';
import furnitureImage from '@/assets/furniture-sample.jpg';
import textileImage from '@/assets/textile-sample.jpg';

const Orders = () => {
  const currentOrders = [
    {
      id: "ORD001",
      image: potteryImage,
      title: "Handcrafted Terracotta Vase Set",
      seller: "Rajesh Pottery",
      price: 2500,
      status: "shipped",
      orderDate: "2024-01-15",
      estimatedDelivery: "2024-01-18",
      trackingId: "TRK123456789"
    },
    {
      id: "ORD002", 
      image: furnitureImage,
      title: "Reclaimed Wood Coffee Table",
      seller: "Wooden Wonders",
      price: 8500,
      status: "processing",
      orderDate: "2024-01-14",
      estimatedDelivery: "2024-01-20"
    }
  ];

  const pastOrders = [
    {
      id: "ORD003",
      image: textileImage,
      title: "Handwoven Cotton Throw",
      seller: "Maya Textiles",
      price: 1800,
      status: "delivered",
      orderDate: "2024-01-10",
      deliveredDate: "2024-01-13"
    },
    {
      id: "ORD004",
      image: potteryImage,
      title: "Ceramic Dinner Set",
      seller: "Clay Creations", 
      price: 3200,
      status: "delivered",
      orderDate: "2024-01-05",
      deliveredDate: "2024-01-08"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'shipped': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      case 'delivered': return 'bg-green-500/20 text-green-700 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const OrderCard = ({ order, showTracking = false }: { order: any; showTracking?: boolean }) => (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <img src={order.image} alt={order.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="font-semibold line-clamp-2">{order.title}</h3>
              <p className="text-sm text-muted-foreground">by {order.seller}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-craft-terracotta">₹{order.price.toLocaleString()}</span>
              <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                {getStatusIcon(order.status)}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              Order ID: {order.id} • {order.orderDate}
            </div>
            {showTracking && order.trackingId && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Track Order
                </Button>
                <Button size="sm" variant="outline">
                  Contact Seller
                </Button>
              </div>
            )}
            {order.status === 'delivered' && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Rate & Review
                </Button>
                <Button size="sm" variant="outline">
                  Reorder
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <div className="container px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Orders</h1>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Orders</TabsTrigger>
            <TabsTrigger value="past">Order History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-4 mt-6">
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <OrderCard key={order.id} order={order} showTracking={true} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="bg-muted rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">No current orders</h3>
                <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
                <Link to="/categories">
                  <Button className="bg-gradient-to-r from-craft-terracotta to-orange-500 hover:from-craft-terracotta/90 hover:to-orange-500/90">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4 mt-6">
            {pastOrders.length > 0 ? (
              pastOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="bg-muted rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">No past orders</h3>
                <p className="text-muted-foreground">Your order history will appear here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Orders;