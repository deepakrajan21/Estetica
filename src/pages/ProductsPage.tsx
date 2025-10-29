import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { sampleProducts, categories } from "../data/productsData";


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
                    className="pl-9 pr-3 py-2 bg-white  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 ${isOpen ?'lg:grid-cols-5 xl:grid-cols-5' : 'lg:grid-cols-7 xl:grid-cols-7' }  gap-6`}>
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
                        <div className="ml-5 shrink-0 transition-all duration-300 md:col-span-1 lg:col-span-2 ">
                            <Cart />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
