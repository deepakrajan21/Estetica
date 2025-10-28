import React, { useState } from "react";
import { Search } from "lucide-react";
import ProductCard from "../components/ProductCard";


interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    category: string;
}

const sampleProducts: Product[] = [
    { id: 1, name: "Trillion Protein Transfusion", image: "/assets/p1.png", price: 1200, category: "Massage Therapy" },
    { id: 2, name: "TIRTIR Mask Fit Red Cushion", image: "/assets/p2.png", price: 2300, category: "Nail Bar" },
    { id: 3, name: "Kay Beauty Hydrating Foundation", image: "/assets/p3.png", price: 1800, category: "Hair Cut Wash & Style" },
    { id: 4, name: "L'Oreal Professional Hair Serum", image: "/assets/p4.png", price: 900, category: "Manicure & Pedicure" },
    { id: 5, name: "Suroskie My Glow All-In-One Tinted Moisturizer with SPF 30", image: "/assets/p5.png", price: 500, category: "Skin Care" }
];

const categories = [
    "Massage Therapy",
    "Hair Cut Wash & Style",
    "Nail Bar",
    "Manicure & Pedicure",
    "Skin Care"
];

const ProductsPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = sampleProducts.filter(
        (p) =>
            (selectedCategory === "All" || p.category === selectedCategory) &&
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#f7faff] px-10 py-6">
            <p className="products-title mb-8">Products</p>
            <div className="flex mr-4 mb-8 relative">
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search for Product !"
                    className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
                <button
                    onClick={() => setSelectedCategory("All")}
                    className={`px-4 py-2 rounded-full border ${selectedCategory === "All"
                        ? "bg-[#1A1A1A] text-white"
                        : "bg-white text-black border-black"
                        }`}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full border ${selectedCategory === cat
                            ? "bg-[#1A1A1A] text-white"
                            : "bg-white text-black border-black"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

           <div className="grid grid-cols-7 sm:grid-cols-3 md:grid-cols-7 gap-4">
                {filteredProducts.map((product) => (
                    <ProductCard name={product.name} image={product.image} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
