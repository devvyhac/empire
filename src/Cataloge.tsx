import React, { useState, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import CatalogHeader from "./components/CatalogHeader";
import ProductListHeader from "./components/ProductListHeader";
import ProductGrid from "./components/ProductGrid";
import type { Product } from "./types";

const allProducts: Product[] = [
  {
    id: 1,
    name: "Xbox Matt One Controller",
    category: "I am a Gamer",
    price: 49.99,
    originalPrice: 99.99,
    imageUrl:
      "https://images.unsplash.com/photo-1605901309584-818e5236a1b7?q=80&w=500&h=500&fit=crop",
    tag: "-50%",
    isWishlisted: false,
    color: "Blue",
  },
  {
    id: 2,
    name: "Car Air Purifier",
    category: "Electronics",
    price: 19.99,
    imageUrl:
      "https://images.unsplash.com/photo-1627992777322-7d34169a93cd?q=80&w=500&h=500&fit=crop",
    isWishlisted: false,
    color: "Blue",
  },
  {
    id: 3,
    name: "JBL Wireless Headphones",
    category: "Electronics",
    price: 71.69,
    imageUrl:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=500&h=500&fit=crop",
    isWishlisted: true,
    color: "Blue",
  },
  {
    id: 4,
    name: "Polaroid Snap Touch",
    category: "Traveling",
    price: 99.89,
    imageUrl:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=500&h=500&fit=crop",
    isWishlisted: false,
    color: "Blue",
  },
  {
    id: 5,
    name: "Apple mini Smart Speaker",
    category: "Smart Home",
    price: 98.69,
    imageUrl:
      "https://images.unsplash.com/photo-1619472629536-0c1a9953931a?q=80&w=500&h=500&fit=crop",
    isWishlisted: false,
    color: "Blue",
  },
  {
    id: 6,
    name: "Apple iPhone 13 Pro",
    category: "Electronics",
    price: 999.99,
    imageUrl:
      "https://images.unsplash.com/photo-1633423485848-70176a60344f?q=80&w=500&h=500&fit=crop",
    tag: "Special",
    isWishlisted: false,
    color: "Blue",
  },
  {
    id: 7,
    name: "Classic White Mechanical Keyboard",
    category: "I am a Gamer",
    price: 129.99,
    imageUrl:
      "https://images.unsplash.com/photo-1618384887924-2c84271757a4?q=80&w=500&h=500&fit=crop",
    isWishlisted: false,
    color: "White",
  },
  {
    id: 8,
    name: "Silver Smart Watch",
    category: "Smart Home",
    price: 249.99,
    imageUrl:
      "https://images.unsplash.com/photo-1544135758-662a4bafc234?q=80&w=500&h=500&fit=crop",
    isWishlisted: true,
    color: "Silver",
  },
  {
    id: 9,
    name: "Black VR Headset",
    category: "I am a Gamer",
    price: 399.0,
    imageUrl:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=500&h=500&fit=crop",
    isWishlisted: false,
    color: "Black",
  },
  {
    id: 10,
    name: "Professional Drone",
    category: "Electronics",
    price: 799.0,
    imageUrl:
      "https://images.unsplash.com/photo-1507582020474-c2a2486c7324?q=80&w=500&h=500&fit=crop",
    isWishlisted: false,
    color: "Black",
  },
  {
    id: 11,
    name: "Silver MacBook Pro",
    category: "Electronics",
    price: 1299.0,
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500&h=500&fit=crop",
    isWishlisted: false,
    color: "Silver",
  },
  {
    id: 12,
    name: "Smart Home Hub",
    category: "Smart Home",
    price: 89.99,
    imageUrl:
      "https://images.unsplash.com/photo-1599691419760-9d04265a443e?q=80&w=500&h=500&fit=crop",
    isWishlisted: true,
    color: "White",
  },
  {
    id: 13,
    name: "Portable Coffee Maker",
    category: "Traveling",
    price: 54.99,
    imageUrl:
      "https://images.unsplash.com/photo-1593973703443-662e2931f7ad?q=80&w=500&h=500&fit=crop",
    isWishlisted: false,
    color: "Black",
  },
  {
    id: 14,
    name: "RGB Gaming Mouse",
    category: "I am a Gamer",
    price: 75.5,
    imageUrl:
      "https://images.unsplash.com/photo-1615663249852-3211513364ac?q=80&w=500&h=500&fit=crop",
    isWishlisted: false,
    color: "Black",
  },
];

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [categories, setCategories] = useState<string[]>([
    "I am a Gamer",
    "Electronics",
  ]);
  const [colors, setColors] = useState<string[]>(["Blue"]);
  const [priceRange, setPriceRange] = useState<[number, number]>([5, 1000]);
  const [inStockOnly, setInStockOnly] = useState(true);

  const handleWishlistToggle = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === id ? { ...p, isWishlisted: !p.isWishlisted } : p
      )
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        categories.length === 0 ||
        categories.some((c) => product.category === c);
      const colorMatch = colors.length === 0 || colors.includes(product.color);
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      // Assuming all items are "in stock" for this demo
      const stockMatch = !inStockOnly || true;
      return categoryMatch && colorMatch && priceMatch && stockMatch;
    });
  }, [products, categories, colors, priceRange, inStockOnly]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-custom-gray-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div>
            <CatalogHeader />
            <Sidebar
              categories={categories}
              setCategories={setCategories}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              colors={colors}
              setColors={setColors}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              itemCount={filteredProducts.length}
            />
          </div>
          <main>
            <ProductListHeader />
            <ProductGrid
              products={filteredProducts}
              onWishlistToggle={handleWishlistToggle}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
