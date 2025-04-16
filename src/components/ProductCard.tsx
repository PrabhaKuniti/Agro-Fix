
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onAddToOrder: (product: Product, quantity: number) => void;
}

const ProductCard = ({ product, onAddToOrder }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToOrder = () => {
    if (quantity > 0) {
      onAddToOrder(product, quantity);
      setQuantity(0);
    }
  };

  return (
    <Card className="product-card overflow-hidden border border-gray-200 h-full flex flex-col">
      <div className="relative pt-[56.25%] bg-gray-100">
        <img 
          src={product.imageUrl || "/placeholder.svg"} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <CardContent className="flex-grow p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg text-earth-800">{product.name}</h3>
          <div className="bg-produce-100 text-produce-800 px-2 py-1 rounded-full text-xs font-semibold">
            ${product.pricePerUnit.toFixed(2)} / {product.unit}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t border-gray-100">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <Button 
              size="icon" 
              variant="outline" 
              className="h-8 w-8 rounded-full"
              onClick={handleDecrement}
              disabled={quantity === 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button 
              size="icon" 
              variant="outline" 
              className="h-8 w-8 rounded-full" 
              onClick={handleIncrement}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            size="sm" 
            className="bg-produce-600 hover:bg-produce-700"
            onClick={handleAddToOrder}
            disabled={quantity === 0}
          >
            Add to Order
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
