"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Add = ({ productId, variantId, stockNumber }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type) => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };
  
  const wixClient = useWixClient();

  const { addItem, isLoading } = useCartStore();

  const handleAddToCart = () => {
    addItem(wixClient, productId, variantId, quantity)
      .then(() => {
        toast.success("Item added to cart successfully!");
      })
      .catch(() => {
        toast.error("Failed to add item to cart.");
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <h4>Choose a Quantity</h4>

      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="text-xl cursor-pointer"
              onClick={() => handleQuantity("d")}
            >
              -
            </button>
            {quantity}
            <button
              className="text-xl cursor-pointer"
              onClick={() => handleQuantity("i")}
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className="text-sm text-orange-500">Product out of stock</div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span>
              left! <br />
              {"Dont't"} miss it
            </div>
          )}
        </div>

        <button
          className="w-36 text-sm rounded-3xl ring-1 ring-vsb text-vsb py-2 px-4 hover:bg-vsb hover:text-white disabled:ring-0 disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none"
          disabled={isLoading || stockNumber < 1}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
