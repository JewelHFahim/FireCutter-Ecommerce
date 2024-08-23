import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@wix/sdk";

// Create the Zustand store
export const useCartStore = create((set) => ({
  cart: null,
  isLoading: false,
  count: 0,

  getCart: async (wixClient) => {
    try {
      set({ isLoading: true });
      const cart = await wixClient.currentCart.getCurrentCart();
      if (!cart) {
        console.warn("Cart not found, initializing an empty cart.");
        set({
          cart: null,
          isLoading: false,
          count: 0,
        });
        return;
      }

      set({
        cart,
        isLoading: false,
        count: cart.lineItems.length,
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      set({
        cart: null,
        isLoading: false,
        count: 0,
      });
    }
  },

  addItem: async (wixClient, productId, variantId, quantity) => {
    try {
      set({ isLoading: true });

      const response = await wixClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: process.env.NEXT_PUBLIC_WIX_ID,
              catalogItemId: productId,
              ...(variantId && { options: { variantId } }),
            },
            quantity: quantity,
          },
        ],
      });

      set({
        cart: response.cart,
        count: response.cart.lineItems.length,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      set({ isLoading: false });
    }
  },

  removeItem: async (wixClient, itemId) => {
    try {
      set({ isLoading: true });

      const response = await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);

      set({
        cart: response.cart,
        count: response.cart.lineItems.length,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      set({ isLoading: false });
    }
  },
}));
