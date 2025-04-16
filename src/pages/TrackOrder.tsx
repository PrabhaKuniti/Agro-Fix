import { useState, useEffect } from "react";
import { CheckCircle2, Clock, Loader2, Search, TruckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { getOrderById, getProductById } from "@/lib/mockData";
import { Order, OrderStatus } from "@/types";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleTrackOrder = (id = orderId) => {
    if (!id.trim()) {
      setError("Please enter an order ID");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      const foundOrder = getOrderById(id);
      
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError(`No order found with ID: ${id}`);
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      setOrderId(id);
      handleTrackOrder(id);
    }
  }, []);  // Empty dependency array ensures this runs only once on component mount
  
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-6 w-6 text-amber-500" />;
      case "IN_PROGRESS":
        return <TruckIcon className="h-6 w-6 text-blue-500" />;
      case "DELIVERED":
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
    }
  };
  
  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "Order Received";
      case "IN_PROGRESS":
        return "Out for Delivery";
      case "DELIVERED":
        return "Delivered";
    }
  };
  
  const getStepStatus = (orderStatus: OrderStatus, step: OrderStatus) => {
    const statusOrder = ["PENDING", "IN_PROGRESS", "DELIVERED"];
    const orderIndex = statusOrder.indexOf(orderStatus);
    const stepIndex = statusOrder.indexOf(step);
    
    if (stepIndex < orderIndex) return "complete";
    if (stepIndex === orderIndex) return "active";
    return "upcoming";
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-earth-800 mb-2">Track Your Order</h1>
          <p className="text-gray-600 mb-8">Enter your order ID to check the current status</p>
          
          <div className="mb-10">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Enter Order ID (e.g. ORD-2023-001)"
                  className="pl-10"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => handleTrackOrder()}
                disabled={isLoading}
                className="bg-produce-600 hover:bg-produce-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : "Track Order"}
              </Button>
            </div>
            {error && (
              <p className="text-red-500 mt-2">{error}</p>
            )}
          </div>
          
          {order && (
            <div className="animate-fade-in">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="p-6 bg-gray-50 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-earth-800">Order #{order.id}</h2>
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className="ml-2 font-medium">
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    Placed on {order.createdAt.toLocaleDateString()} at {order.createdAt.toLocaleTimeString()}
                  </p>
                </div>
                
                <div className="p-6">
                  {/* Order Progress Tracker */}
                  <div className="mb-8">
                    <div className="relative">
                      <div className="absolute left-0 top-5 w-full h-1 bg-gray-200"></div>
                      <div 
                        className="absolute left-0 top-5 h-1 bg-produce-500 transition-all duration-500"
                        style={{ 
                          width: order.status === "PENDING" ? "0%" : 
                                  order.status === "IN_PROGRESS" ? "50%" : "100%" 
                        }}
                      ></div>
                      <div className="relative flex justify-between">
                        {(["PENDING", "IN_PROGRESS", "DELIVERED"] as OrderStatus[]).map((step) => {
                          const stepStatus = getStepStatus(order.status, step);
                          return (
                            <div key={step} className="text-center">
                              <div 
                                className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                                  stepStatus === "complete" || stepStatus === "active" ? "bg-produce-500 text-white" : "bg-gray-200"
                                }`}
                              >
                                {stepStatus === "complete" && <CheckCircle2 className="h-5 w-5" />}
                                {stepStatus === "active" && getStatusIcon(step)}
                                {stepStatus === "upcoming" && <div className="w-3 h-3 bg-gray-400 rounded-full"></div>}
                              </div>
                              <span className={`text-sm font-medium ${
                                stepStatus === "active" ? "text-produce-600" : "text-gray-500"
                              }`}>
                                {getStatusText(step)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Order Items */}
                    <div>
                      <h3 className="font-medium text-earth-800 mb-3">Order Items</h3>
                      <div className="space-y-3">
                        {order.items.map((item) => {
                          const product = getProductById(item.productId);
                          if (!product) return null;
                          
                          return (
                            <div key={item.productId} className="flex gap-3 items-center">
                              <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                <img 
                                  src={product.imageUrl || "/placeholder.svg"} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{product.name}</p>
                                <p className="text-xs text-gray-500">
                                  {item.quantity} {product.unit} × ${product.pricePerUnit.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="flex justify-between">
                          <span className="font-medium">Total:</span>
                          <span className="font-semibold">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Delivery Details */}
                    <div>
                      <h3 className="font-medium text-earth-800 mb-3">Delivery Details</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium">{order.buyerName}</p>
                        <p className="text-sm text-gray-600 mt-1">{order.contact}</p>
                        <p className="text-sm text-gray-600 mt-1">{order.address}</p>
                      </div>
                      
                      <div className="mt-4">
                        <h3 className="font-medium text-earth-800 mb-2">Need Help?</h3>
                        <p className="text-sm text-gray-600">
                          If you have any questions about your order, please contact our customer support.
                        </p>
                        <Button variant="outline" className="mt-3">Contact Support</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {!order && !isLoading && !error && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-medium text-gray-700 mb-2">Enter your order ID</h2>
              <p className="text-gray-500">
                Track the status of your bulk produce order
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TrackOrder;
