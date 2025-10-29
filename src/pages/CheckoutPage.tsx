
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import complete from "../assets/complete-payment.png"
import discount from "../assets/discount.svg"
import box from "../assets/box.svg"
import edit from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import { removeFromCart } from "../features/cart/cartSlice";

const CheckoutPage = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch()
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
      <div className="flex justify-start flex-col items-start mb-8">
        <p className="text-[24px] font-semibold">Order Completion </p>
        <p className="text-gray-500 text-sm">Booking Summary - APT-001</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="inline-block w-5 h-5 bg-gray-200 rounded-lg flex items-center justify-center">
              <img src={box} />
            </span>
            Products Used
          </h2>

          {(items?.length > 0) ?
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border border-[#E2E8F080] rounded-lg p-4 hover:shadow-sm"
                >
                  <div className="flex flex-col">
                    <p className="font-medium mb-3">{item.name}</p>
                    <div className="flex items-center gap-3">

                      <div className="flex items-center gap-8">
                        <div className="text-left mr-3">
                          <p className="text-gray-600 text-sm">Quantity</p>
                          <p className="font-semibold">{item.quantity}</p>
                        </div>
                        <div className="text-left">
                          <p className="text-gray-600 text-sm">Unit Price</p>
                          <p className="font-semibold">₹{item.price}</p>
                        </div>
                        <div className="text-left">
                          <p className="text-gray-600 text-sm">Total</p>
                          <p className="font-semibold">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-end mb-2">
                      <img src={edit} />
                      <img src={deleteIcon} onClick={() => dispatch(removeFromCart(item.id))} />
                    </div>
                    <button className="flex text-[#1A1A1A] border border-[#DDDFE4] px-3 py-1 rounded-lg text-sm hover:bg-purple-50">
                      <img className="mr-1" src={discount} />
                      <span>
                        Special Discount
                      </span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
            :

            <div className="col-span-full text-center text-gray-500 py-4">
              Your cart is empty.
            </div>
          }

          <button onClick={() => navigate("/")} className="w-full mt-4 py-2 border border-[#DDDFE4] rounded-lg text-[#14161A] hover:bg-gray-50">
            + Add Extra Products
          </button>
        </div>
        <div>
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
                  disabled
                  type="number"
                  className="w-16 border border-[#DDDFE4] rounded-md text-right px-2 py-1 text-gray-700 focus:outline-none"
                  placeholder="0"
                />
              </div>
              <div className="flex justify-between">
                <span>Tax (18%)</span>
                <span>₹{tax}</span>
              </div>
              <hr className="border-[#DDDFE4]" />
              <div className="flex justify-between font-semibold text-base">
                <span>Final Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#BFA6FF] to-[#6C5DD3] text-white py-3 rounded-md  transition-all">
            <img src={complete} className="w-3 h-3 object-contain" />
            <span className="font-medium text-lg">Complete Payment</span>
          </button>

        </div>
      </div>
    </div >
  );
};

export default CheckoutPage;
