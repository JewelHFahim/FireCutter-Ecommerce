import { useCartStore } from "@/hooks/useCartStore";
import Image from "next/image";
import React from "react";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";
import toast from "react-hot-toast";

const CartModal = () => {

  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();

  const handleCheckout = async () => {
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });
      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-max absolute top-12 right-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white rounded-md flex flex-col gap-6 p-4 z-20">
      {!cart?.lineItems ? (
        <div>Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            {cart?.lineItems?.map((item) => (
              <div className="flex gap-4" key={item._id}>
                {item?.image && (
                  <Image
                    src={wixMedia?.getScaledToFillImageUrl(
                      item?.image,
                      72,
                      96,
                      {}
                    )}
                    alt=""
                    width={72}
                    height={96}
                    className="object-cover rounded-md h-[96px]"
                  />
                )}

                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">
                        {item?.productName?.original}
                      </h3>
                      <div className="p-1 bg-gray-100 rounded-sm flex items-center gap-2">
                        {item?.quantity && item?.quantity > 1 && (
                          <div className="text-sm text-green-500">
                            {item?.quantity} x{" "}
                          </div>
                        )}
                        ${item?.price?.amount}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {item?.availability?.status}
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item?.quantity}</span>
                    <span
                      className="text-blue-500"
                      onClick={() => {
                        {
                          removeItem(wixClient, item?._id)
                            .then(() => {
                              toast.success(
                                "Item remove from cart successfully!"
                              );
                            })
                            .catch(() => {
                              toast.error("Failed to remove item from cart.");
                            });
                        }
                      }}
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">${cart?.subtotal?.amount}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
              <button
                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isLoading}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
