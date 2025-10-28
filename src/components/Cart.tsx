import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { increment, decrement, removeAllFromCart } from "../features/cart/cartSlice";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
    const { items } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="p-4 w-full flex flex-col h-100 justify-between">
            <div className="bg-white shadow-md rounded-xl p-4 w-full">
                <h2 className="text-lg font-semibold mb-3 flex justify-between items-center">
                    Product Cart
                    <Trash2 onClick={() => dispatch(removeAllFromCart())} className="w-5 h-5 text-red-500 cursor-pointer" />
                </h2>

                {(items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-[#64748B1A]">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-md object-contain" />
                        <div className="flex-1 px-3">
                            <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                            <p className="text-sm text-gray-600">₹{item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-1 rounded-lg border-[#EEEEEE]" onClick={() => dispatch(decrement(item.id))}><Minus className="w-4 h-4" /></button>
                            <span>{item.quantity}</span>
                            <button className="bg-gradient-to-r from-[#6C5DD3] to-[#BFA6FF] p-1 rounded-lg" onClick={() => dispatch(increment(item.id))}><Plus className="text-white  w-4 h-4" /></button>
                        </div>
                    </div>
                ))
                )}
            </div>

            {items.length > 0 && (
                <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-4 py-2 bg-gradient-to-r from-[#6C5DD3] to-[#BFA6FF] text-white rounded-lg font-medium">
                    Checkout
                </button>
            )}
        </div>
    );
};

export default Cart;
