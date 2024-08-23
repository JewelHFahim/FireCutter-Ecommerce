"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";
import { redirects } from "@wix/redirects";

// Get refresh token from cookies
const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");

// Create the Wix client with the required modules and authentication
const wixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
    redirects,
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    tokens: {
      refreshToken,
      accessToken: { value: "", expiresAt: 0 },
    },
  }),
});

// Create a context for the Wix client
const WixClientContext = createContext(wixClient);

// Create a provider component for the Wix client context
const WixClientProvider = ({ children }) => {
  return (
    <WixClientContext.Provider value={wixClient}>
      {children}
    </WixClientContext.Provider>
  );
};

export { WixClientContext, WixClientProvider };
