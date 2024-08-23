// import { createClient, OAuthStrategy } from "@wix/sdk";
// import { NextResponse } from "next/server";

// export const middleware = async (request) => {
//   const cookies = request.cookies;
//   const res = NextResponse.next();

//   if (cookies.get("refreshToken")) {
//     return res;
//   }

//   const wixClient = createClient({
//     auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID }),
//   });

//   const tokens = await wixClient.auth.generateVisitorTokens();
//   res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken)),
//     {
//       maxAge: 60 * 60 * 24 * 30,
//     };
//   return res;
// };


// ==================== Updated Code =====================
import { createClient, OAuthStrategy } from "@wix/sdk";
import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const cookies = request.cookies;
  const res = NextResponse.next();

  if (cookies.get("refreshToken")) {
    // If refreshToken exists, proceed with the request
    return res;
  }

  // Initialize Wix client without accessToken initially
  const wixClient = createClient({
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
      // Consider adding clientSecret if needed
    }),
  });

  // Generate visitor tokens (ensure clientSecret if needed is handled securely)
  const tokens = await wixClient.auth.generateVisitorTokens();

  // Set the refreshToken as a cookie with secure options
  res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,            // Makes the cookie inaccessible via JavaScript
    secure: process.env.NODE_ENV === 'production', // Secure in production
    path: '/',                 // Available across the entire application
  });

  return res;
};
