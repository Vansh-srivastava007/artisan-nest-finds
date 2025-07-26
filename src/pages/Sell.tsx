import { useState } from 'react';
import { ArrowLeft, Upload, Camera, Plus, X } from 'lucide-react';
import Header from '@/components/ui/header';
import BottomNav from '@/components/ui/bottom-nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Sell = () => {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    price: '',
    stock: '',
    deliveryCharge: '',
    materials: '',
    dimensions: '',
    tags: ''
  });

  const categories = {
    furniture: ['Chairs', 'Tables', 'Cabinets', 'Beds', 'Shelving'],
    pottery: ['Vases', 'Bowls', 'Plates', 'Decorative', 'Planters'],
    textiles: ['Rugs', 'Cushions', 'Throws', 'Curtains', 'Wall Hangings'],
    decor: ['Lighting', 'Mirrors', 'Art', 'Sculptures', 'Candles'],
    jewelry: ['Necklaces', 'Earrings', 'Bracelets', 'Rings', 'Pendants']
  };

  const handleAddImage = () => {
    // Simulate image upload
    setImages([...images, '/placeholder.svg']);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Upload Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square border-2 border-dashed border-border rounded-2xl overflow-hidden">
                    <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {images.length < 6 && (
                  <button
                    onClick={handleAddImage}
                    className="aspect-square border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-craft-sage transition-colors"
                  >
                    <Plus className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Add Photo</span>
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleAddImage} className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Take Photo
                </Button>
                <Button variant="outline" onClick={handleAddImage} className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload from Gallery
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="pottery">Pottery</SelectItem>
                      <SelectItem value="textiles">Textiles</SelectItem>
                      <SelectItem value="decor">Décor</SelectItem>
                      <SelectItem value="jewelry">Jewelry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Select 
                    value={formData.subcategory} 
                    onValueChange={(value) => handleInputChange('subcategory', value)}
                    disabled={!formData.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.category && categories[formData.category as keyof typeof categories]?.map((sub) => (
                        <SelectItem key={sub} value={sub.toLowerCase()}>{sub}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="title">Product Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Handcrafted Wooden Coffee Table"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your product, materials used, crafting process..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="materials">Materials</Label>
                  <Input
                    id="materials"
                    value={formData.materials}
                    onChange={(e) => handleInputChange('materials', e.target.value)}
                    placeholder="e.g., Teak wood, brass fittings"
                  />
                </div>
                <div>
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={(e) => handleInputChange('dimensions', e.target.value)}
                    placeholder="e.g., 120cm x 60cm x 45cm"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="e.g., handmade, vintage, eco-friendly"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Stock</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange('stock', e.target.value)}
                    placeholder="1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="deliveryCharge">Delivery Charge (₹)</Label>
                <Input
                  id="deliveryCharge"
                  type="number"
                  value={formData.deliveryCharge}
                  onChange={(e) => handleInputChange('deliveryCharge', e.target.value)}
                  placeholder="0 for free delivery"
                />
              </div>

              {/* Summary */}
              <div className="bg-muted rounded-2xl p-4 space-y-2">
                <h4 className="font-semibold">Listing Summary</h4>
                <div className="text-sm space-y-1">
                  <p><span className="text-muted-foreground">Title:</span> {formData.title || 'Not set'}</p>
                  <p><span className="text-muted-foreground">Category:</span> {formData.category || 'Not set'}</p>
                  <p><span className="text-muted-foreground">Price:</span> ₹{formData.price || '0'}</p>
                  <p><span className="text-muted-foreground">Photos:</span> {images.length} uploaded</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <div className="container px-4 py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={handlePrev} disabled={step === 1}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 mx-4">
            <h1 className="text-2xl font-bold">List Your Product</h1>
            <p className="text-muted-foreground">Step {step} of 3</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-to-r from-craft-terracotta to-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <Button variant="outline" onClick={handlePrev} className="flex-1">
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button 
              onClick={handleNext} 
              className="flex-1 bg-gradient-to-r from-craft-terracotta to-orange-500 hover:from-craft-terracotta/90 hover:to-orange-500/90"
              disabled={step === 1 && images.length === 0}
            >
              Next
            </Button>
          ) : (
            <Button 
              className="flex-1 bg-gradient-to-r from-craft-terracotta to-orange-500 hover:from-craft-terracotta/90 hover:to-orange-500/90"
            >
              Submit for Approval
            </Button>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Sell;