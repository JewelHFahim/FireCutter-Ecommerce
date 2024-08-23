import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
// import NavbarIcons from "./NavbarIcons";
import dynamic from "next/dynamic";

const NavbarIcons = dynamic(() => import("./NavbarIcons"), { ssr: false });

const Navbar = () => {
  return (
    <div className="sticky top-0 h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-52 z-[999] bg-white border-black border-opacity-[5%] shadow-sm">
      {/* MOBILE */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/">
          <div className="text-2xl tracking-wider">FireCutter</div>
        </Link>
        <Menu />
      </div>

      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-center justify-center h-full">
        {/* LEFT */}
        <div className="w-1/2 xl:w-[60%] flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={24} height={24} />
            <div className="text-2xl tracking-wider">FireCutter</div>
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link href="/list?cat=summer">Summer</Link>
            <Link href="/list?cat=denim">Denim</Link>
            <Link href="/list?cat=t-shirt">T-Shirt</Link>
            <Link href="/list?cat=shoes">Shoes</Link>
            <Link href="/list?cat=accessories">Accessopris</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-2/3 xl:w-[40%] flex items-center justify-between gap-8">
          <SearchBar />
          <NavbarIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
