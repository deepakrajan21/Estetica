import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";


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
    { id: 5, name: "Suroskie My Glow All-In-One Tinted Moisturizer with SPF 30", image: "/assets/p5.png", price: 500, category: "Skin Care" },
    { id: 6, name: "Trillion Protein Transfusion", image: "/assets/p1.png", price: 1200, category: "Massage Therapy" },
    { id: 7, name: "TIRTIR Mask Fit Red Cushion", image: "/assets/p2.png", price: 2300, category: "Nail Bar" },
    { id: 8, name: "Kay Beauty Hydrating Foundation", image: "/assets/p3.png", price: 1800, category: "Hair Cut Wash & Style" },
    { id: 9, name: "L'Oreal Professional Hair Serum", image: "/assets/p4.png", price: 900, category: "Manicure & Pedicure" },
    { id: 10, name: "Suroskie My Glow All-In-One Tinted Moisturizer with SPF 30", image: "/assets/p5.png", price: 500, category: "Skin Care" },
    { id: 11, name: "Trillion Protein Transfusion", image: "/assets/p1.png", price: 1200, category: "Massage Therapy" },
    { id: 12, name: "TIRTIR Mask Fit Red Cushion", image: "/assets/p2.png", price: 2300, category: "Nail Bar" },
    { id: 13, name: "Kay Beauty Hydrating Foundation", image: "/assets/p3.png", price: 1800, category: "Hair Cut Wash & Style" },
    { id: 14, name: "L'Oreal Professional Hair Serum", image: "/assets/p4.png", price: 900, category: "Manicure & Pedicure" },
    { id: 15, name: "Suroskie My Glow All-In-One Tinted Moisturizer with SPF 30", image: "/assets/p5.png", price: 500, category: "Skin Care" },
    { id: 16, name: "Trillion Protein Transfusion", image: "/assets/p1.png", price: 1200, category: "Massage Therapy" },
    { id: 21, name: "TIRTIR Mask Fit Red Cushion", image: "/assets/p2.png", price: 2300, category: "Nail Bar" },
    { id: 32, name: "Kay Beauty Hydrating Foundation", image: "/assets/p3.png", price: 1800, category: "Hair Cut Wash & Style" },
    { id: 44, name: "L'Oreal Professional Hair Serum", image: "/assets/p4.png", price: 900, category: "Manicure & Pedicure" },
    { id: 55, name: "Suroskie My Glow All-In-One Tinted Moisturizer with SPF 30", image: "/assets/p5.png", price: 500, category: "Skin Care" },
    { id: 17, name: "Trillion Protein Transfusion", image: "/assets/p1.png", price: 1200, category: "Massage Therapy" },
    { id: 28, name: "TIRTIR Mask Fit Red Cushion", image: "/assets/p2.png", price: 2300, category: "Nail Bar" },
    { id: 37, name: "Kay Beauty Hydrating Foundation", image: "/assets/p3.png", price: 1800, category: "Hair Cut Wash & Style" },
    { id: 46, name: "L'Oreal Professional Hair Serum", image: "/assets/p4.png", price: 900, category: "Manicure & Pedicure" },
    { id: 53, name: "Suroskie My Glow All-In-One Tinted Moisturizer with SPF 30", image: "/assets/p5.png", price: 500, category: "Skin Care" }
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
    const { isOpen } = useSelector((state: RootState) => state.cart);
    const [visibleCount, setVisibleCount] = useState(10)
    useEffect(() => {
        const handleScroll = () => {
            const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 400;
            if (scrollBottom) {
                setVisibleCount((prev) => prev + 10)
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const filteredProducts = sampleProducts.filter(
        (p) =>
            (selectedCategory === "All" || p.category === selectedCategory) &&
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const visibleProducts = filteredProducts.slice(0, visibleCount);
    return (
        <div className="min-h-screen bg-[#f7faff] px-10 py-6 w-full flex flex-col">
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
            <div className="flex items-start gap-6 w-full">
                <div className={`transition-all duration-300 flex w-full`}>
                    {/* Product grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6">
                        {visibleProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}

                        {visibleCount < filteredProducts.length && (
                            <div className="col-span-full text-center text-gray-500 py-4">
                                Loading more products...
                            </div>
                        )}
                    </div>

                    {/* Side cart */}
                    {isOpen && (
                        <div className="w-[320px] shrink-0 transition-all duration-300">
                            <Cart />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
