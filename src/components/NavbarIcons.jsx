"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";
import CartModal from "./cartModal";

const NavbarIcons = () => {
  const router = useRouter();
  const wixClient = useWixClient();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedin = wixClient.auth.loggedIn();

  const handleProfile = () => {
    if (!isLoggedin) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  // const handleLogout = async () => {
  //   setIsLoading(true);
  //   Cookies.remove("refreshToken");
  //   const { logoutUrl } = await wixClient.auth.logout(window.location.href);
  //   setIsLoading(false);
  //   setIsProfileOpen(false);
  //   router.push(logoutUrl);
  // };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      Cookies.remove("refreshToken");
      const { logoutUrl } = await wixClient.auth.logout(window.location.href);
      router.push(logoutUrl);
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, set an error message to display to the user
    } finally {
      setIsLoading(false);
      setIsProfileOpen(false);
    }
  };

  const { cart, count, getCart } = useCartStore();
  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
        // onClick={login}
      />
      {isProfileOpen && (
        <div className="absolute bg-white z-10 left-0 top-12 p-4 rounded-md text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          {/* <Link href="/profile">Profile</Link> */}
          <Link href="/profile" onClick={() => setIsProfileOpen(false)}>Profile</Link>


          {/* <button className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Logging out" : "Logout"}
          </button> */}

          <button
            className={`mt-2 cursor-pointer ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}

      <Image
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
      />

      <div
        className="cursor-pointer relative"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/cart.png" alt="" width={22} height={22} />

        <div className="absolute -top-4 -right-4 w-6 h-6 bg-vsb text-white text-sm rounded-full flex justify-center items-center ">
          {count}
        </div>
      </div>

      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavbarIcons;
