
import { Link } from "react-router-dom";
import { ShoppingCart, Leaf, Package, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Leaf className="h-8 w-8 text-produce-600" />
            <span className="ml-2 text-xl font-bold text-earth-800">BulkProduce<span className="text-produce-600">Hub</span></span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/catalog" className="text-gray-600 hover:text-produce-600 font-medium">
              Catalog
            </Link>
            <Link to="/order" className="text-gray-600 hover:text-produce-600 font-medium">
              Place Order
            </Link>
            <Link to="/track-order" className="text-gray-600 hover:text-produce-600 font-medium">
              Track Order
            </Link>
            <Link to="/admin/dashboard" className="text-gray-600 hover:text-produce-600 font-medium">
              Admin
            </Link>
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-produce-600">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="hidden sm:flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span>My Cart</span>
            </Button>
            <Button variant="default" className="bg-produce-600 hover:bg-produce-700">
              <Package className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Order Now</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
