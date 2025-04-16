
import { ArrowRight, Leaf, Star, Truck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/mockData";
import { Product } from "@/types";

const Index = () => {
  const featuredProducts = products.slice(0, 4);
  
  const handleAddToOrder = (product: Product, quantity: number) => {
    console.log(`Added ${quantity} ${product.unit} of ${product.name} to order`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-produce-100 to-produce-50 overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-earth-800 mb-6">
              Fresh Produce<br />
              <span className="text-produce-700">Bulk Ordering</span><br />
              Made Simple
            </h1>
            <p className="text-lg text-earth-600 mb-8 max-w-lg">
              Order fresh fruits and vegetables in bulk for your restaurant, event, or business. 
              Quality produce delivered when you need it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-produce-600 hover:bg-produce-700 text-white">
                <Link to="/catalog" className="flex items-center">
                  Browse Catalog <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link to="/track-order">Track Your Order</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative">
            <div className="relative z-10 ml-auto w-full max-w-md">
              <img 
                src="https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Fresh produce" 
                className="rounded-2xl shadow-lg object-cover h-96 w-full"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 h-72 w-72 bg-produce-200 rounded-full opacity-40 blur-3xl"></div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-earth-800 text-center mb-12">Why Choose BulkProduceHub</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="h-12 w-12 bg-produce-100 rounded-lg flex items-center justify-center mb-4">
              <Leaf className="text-produce-600 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-earth-800 mb-2">Fresh & Local</h3>
            <p className="text-gray-600">We source the freshest produce directly from local farms, ensuring quality and supporting local growers.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="h-12 w-12 bg-produce-100 rounded-lg flex items-center justify-center mb-4">
              <Truck className="text-produce-600 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-earth-800 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Order by 6pm for next-day delivery. Ensuring your business operations run smoothly without interruption.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="h-12 w-12 bg-produce-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-produce-600 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-earth-800 mb-2">Bulk Discounts</h3>
            <p className="text-gray-600">Enjoy competitive pricing and volume discounts for larger orders, saving your business money.</p>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16 bg-gray-50 rounded-3xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-earth-800">Featured Products</h2>
            <p className="text-gray-600 mt-2">Our most popular seasonal selections</p>
          </div>
          <Link to="/catalog" className="text-produce-600 hover:text-produce-800 font-medium flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToOrder={handleAddToOrder} 
            />
          ))}
        </div>
      </section>
      
      {/* Testimonial */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-earth-50 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Happy customer" 
                className="rounded-2xl shadow-md w-full h-80 object-cover"
              />
            </div>
            <div className="md:w-2/3">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-medium text-earth-800 mb-6">
                "BulkProduceHub has transformed our restaurant's supply chain. The produce is always fresh, delivered on time, and their ordering system is incredibly easy to use."
              </blockquote>
              <div>
                <p className="font-semibold text-earth-900">Elena Rodriguez</p>
                <p className="text-gray-600">Head Chef, Green Leaf Restaurant</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-produce-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to simplify your produce ordering?</h2>
          <p className="text-produce-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that trust BulkProduceHub for their fresh produce needs.
          </p>
          <Button size="lg" variant="secondary" className="font-medium">
            <Link to="/order">Place Your First Order</Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-earth-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <Leaf className="h-8 w-8 text-produce-400" />
                <span className="ml-2 text-xl font-bold">BulkProduce<span className="text-produce-400">Hub</span></span>
              </div>
              <p className="mt-4 text-gray-400 max-w-xs">
                Connecting businesses with fresh, local produce through our simple bulk ordering platform.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-produce-200">Navigation</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                  <li><Link to="/catalog" className="text-gray-400 hover:text-white">Catalog</Link></li>
                  <li><Link to="/order" className="text-gray-400 hover:text-white">Place Order</Link></li>
                  <li><Link to="/track-order" className="text-gray-400 hover:text-white">Track Order</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-produce-200">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-produce-200">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-gray-400">hello@bulkproducehub.com</li>
                  <li className="text-gray-400">+1 (555) 123-4567</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} BulkProduceHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
