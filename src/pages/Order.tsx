
import { useState } from "react";
import { ArrowRight, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import { products, addOrder } from "@/lib/mockData";
import { OrderItem, Product } from "@/types";

const Order = () => {
  const [selectedProducts, setSelectedProducts] = useState<{[id: number]: number}>({});
  const [buyerName, setBuyerName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const handleQuantityChange = (productId: number, quantity: number) => {
    if (quantity === 0) {
      const newSelected = { ...selectedProducts };
      delete newSelected[productId];
      setSelectedProducts(newSelected);
    } else {
      setSelectedProducts({ ...selectedProducts, [productId]: quantity });
    }
  };
  
  const calculateTotal = () => {
    return Object.entries(selectedProducts).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === Number(productId));
      return total + (product ? product.pricePerUnit * quantity : 0);
    }, 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const orderItems: OrderItem[] = Object.entries(selectedProducts).map(([productId, quantity]) => ({
      productId: Number(productId),
      quantity
    }));
    
    // In a real application, this would be an API call
    setTimeout(() => {
      const newOrder = addOrder({
        buyerName,
        contact,
        address,
        status: 'PENDING',
        items: orderItems,
        total: calculateTotal()
      });
      
      setOrderId(newOrder.id);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };
  
  if (isSuccess && orderId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-lg mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-6">
              <PackageCheck className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-earth-800 mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your order. We've received your request and will process it shortly.
            </p>
            
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <p className="font-medium text-lg">Order ID:</p>
                  <p className="text-lg font-mono">{orderId}</p>
                </div>
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <p className="font-medium">Order Details:</p>
                  <p className="text-gray-600">{buyerName}</p>
                  <p className="text-gray-600">{contact}</p>
                  <p className="text-gray-600">{address}</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <p className="font-medium">Total:</p>
                    <p className="font-semibold">${calculateTotal().toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={() => {
                setSelectedProducts({});
                setBuyerName("");
                setContact("");
                setAddress("");
                setIsSuccess(false);
                setOrderId(null);
              }}>
                Place Another Order
              </Button>
              <Button>
                <a href={`/track-order?id=${orderId}`}>Track Your Order</a>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-earth-800 mb-2">Place Bulk Order</h1>
          <p className="text-gray-600 mb-8">Select products, quantities, and provide your delivery information</p>
          
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-earth-800">1. Select Products</h2>
                <p className="text-gray-500 text-sm mt-1">Choose the items and quantities for your order</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {products.map(product => (
                    <ProductSelection 
                      key={product.id} 
                      product={product}
                      quantity={selectedProducts[product.id] || 0}
                      onQuantityChange={(quantity) => handleQuantityChange(product.id, quantity)}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-earth-800">2. Delivery Information</h2>
                <p className="text-gray-500 text-sm mt-1">Provide details for delivery</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Business/Organization Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Enter your business name"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number
                    </label>
                    <Input
                      id="contact"
                      placeholder="Enter your contact number"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Address
                    </label>
                    <Textarea
                      id="address"
                      placeholder="Enter your full delivery address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-earth-800">3. Review Order</h2>
                <p className="text-gray-500 text-sm mt-1">Verify your selections before confirming</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {Object.entries(selectedProducts).map(([productId, quantity]) => {
                    const product = products.find(p => p.id === Number(productId));
                    if (!product) return null;
                    
                    return (
                      <div key={productId} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{quantity} {product.unit}</p>
                        </div>
                        <p className="font-medium">${(product.pricePerUnit * quantity).toFixed(2)}</p>
                      </div>
                    );
                  })}
                  
                  {Object.keys(selectedProducts).length === 0 && (
                    <p className="text-gray-500 text-center py-4">No products selected yet</p>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg">Total</p>
                      <p className="font-semibold text-lg">${calculateTotal().toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2 mt-6">
                    <Checkbox id="terms" required />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms and conditions
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-produce-600 hover:bg-produce-700"
                disabled={isSubmitting || Object.keys(selectedProducts).length === 0}
              >
                {isSubmitting ? "Processing..." : (
                  <span className="flex items-center">
                    Place Order <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

interface ProductSelectionProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const ProductSelection = ({ product, quantity, onQuantityChange }: ProductSelectionProps) => {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-white">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
          <img 
            src={product.imageUrl || "/placeholder.svg"} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <p className="font-medium">{product.name}</p>
          <p className="text-sm text-gray-500">${product.pricePerUnit.toFixed(2)} / {product.unit}</p>
        </div>
      </div>
      
      <div className="flex items-center">
        <Button 
          type="button"
          variant="outline" 
          size="icon"
          className="h-8 w-8 rounded-l-md rounded-r-none"
          onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
        >
          -
        </Button>
        <Input
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => onQuantityChange(Math.max(0, parseInt(e.target.value) || 0))}
          className="w-16 h-8 text-center rounded-none border-l-0 border-r-0"
        />
        <Button 
          type="button"
          variant="outline" 
          size="icon"
          className="h-8 w-8 rounded-r-md rounded-l-none"
          onClick={() => onQuantityChange(quantity + 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default Order;
