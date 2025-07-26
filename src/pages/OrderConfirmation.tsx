import { CheckCircle, Truck, MapPin, Phone, Mail, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import potteryImage from '@/assets/pottery-sample.jpg';

const OrderConfirmation = () => {
  const orderDetails = {
    id: "ORD001",
    item: {
      image: potteryImage,
      title: "Handcrafted Terracotta Vase Set",
      seller: "Rajesh Pottery",
      price: 2500,
      quantity: 1
    },
    delivery: {
      address: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001",
      estimatedDate: "January 18, 2024",
      charge: 0
    },
    payment: {
      subtotal: 2500,
      deliveryCharge: 0,
      total: 2500,
      method: "UPI"
    },
    seller: {
      name: "Rajesh Pottery",
      phone: "+91 98765 43210",
      email: "rajesh@pottery.com"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Success Header */}
      <div className="bg-gradient-to-br from-craft-terracotta to-orange-500 text-white">
        <div className="container px-4 py-12 text-center">
          <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-lg opacity-90">Thank you for your order. Your handcrafted item is being prepared.</p>
          <p className="text-sm opacity-75 mt-2">Order ID: {orderDetails.id}</p>
        </div>
      </div>

      <div className="container px-4 py-6 space-y-6">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src={orderDetails.item.image} 
                  alt={orderDetails.item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{orderDetails.item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">by {orderDetails.item.seller}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Quantity: {orderDetails.item.quantity}</span>
                  <span className="font-bold text-craft-terracotta">₹{orderDetails.item.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Delivery Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p className="text-sm text-muted-foreground">{orderDetails.delivery.address}</p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm">Estimated Delivery</span>
              <Badge variant="outline" className="bg-craft-sage/20 text-craft-warm border-craft-sage/30">
                {orderDetails.delivery.estimatedDate}
              </Badge>
            </div>
            {orderDetails.delivery.charge === 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm">Delivery Charge</span>
                <Badge variant="outline" className="bg-green-500/20 text-green-700 border-green-500/30">
                  Free Delivery
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{orderDetails.payment.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600">
                {orderDetails.payment.deliveryCharge === 0 ? 'Free' : `₹${orderDetails.payment.deliveryCharge}`}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Paid</span>
              <span className="text-craft-terracotta">₹{orderDetails.payment.total.toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground">Paid via {orderDetails.payment.method}</p>
          </CardContent>
        </Card>

        {/* Seller Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Seller Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-craft-terracotta/20 p-2 rounded-full">
                <Phone className="h-4 w-4 text-craft-terracotta" />
              </div>
              <div>
                <p className="font-medium">{orderDetails.seller.name}</p>
                <p className="text-sm text-muted-foreground">{orderDetails.seller.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-craft-sage/20 p-2 rounded-full">
                <Mail className="h-4 w-4 text-craft-sage" />
              </div>
              <p className="text-sm text-muted-foreground">{orderDetails.seller.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <Link to={`/orders`}>
            <Button className="w-full bg-gradient-to-r from-craft-terracotta to-orange-500 hover:from-craft-terracotta/90 hover:to-orange-500/90">
              Track Your Order
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Order Information */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">What happens next?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your order is being prepared by the artisan</li>
              <li>• You'll receive tracking information via SMS/email</li>
              <li>• Free delivery to your doorstep</li>
              <li>• Contact seller directly for any questions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderConfirmation;