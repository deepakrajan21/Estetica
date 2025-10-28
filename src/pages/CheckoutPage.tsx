
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  // Auto-calculated billing summary
  const { serviceTotal, productTotal, tax, finalTotal } = useMemo(() => {
    const productTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const serviceTotal = 1800; // static for now
    const tax = Math.round((serviceTotal + productTotal) * 0.18);
    const finalTotal = serviceTotal + productTotal + tax;
    return { serviceTotal, productTotal, tax, finalTotal };
  }, [items]);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold">Order Completion</h1>
        <p className="text-gray-500 text-sm">Booking Summary - APT-001</p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Products Used */}
        <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="inline-block w-5 h-5 bg-gray-200 rounded-lg flex items-center justify-center">🧴</span>
            Products Used
          </h2>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border rounded-lg p-4 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-gray-600 text-sm">Unit Price</p>
                    <p className="font-semibold">₹{item.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-sm">Total</p>
                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                  </div>
                  <button className="text-purple-600 border border-purple-300 px-3 py-1 rounded-lg text-sm hover:bg-purple-50">
                    Special Discount
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => navigate("/")} className="w-full mt-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
            + Add Extra Products
          </button>
        </div>

        {/* Right: Billing Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Billing Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Service Total</span>
              <span>₹{serviceTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Product Total</span>
              <span>₹{productTotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Order Discount (%)</span>
              <input
                type="number"
                className="w-16 border rounded-md text-right px-2 py-1 text-gray-700 focus:outline-none"
                placeholder="0"
              />
            </div>
            <div className="flex justify-between">
              <span>Tax (18%)</span>
              <span>₹{tax}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-base">
              <span>Final Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>

          <button className="mt-6 w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition">
            ✨ Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
