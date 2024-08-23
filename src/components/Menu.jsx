"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Image
        src="/menu.png"
        alt="menu icon"
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-black text-white w-full left-0 top-20 h-[calc(100vh-80px)] flex flex-col items-center justify-center text-xl gap-8 z-[999]">
          <Link href="">Home</Link>
          <Link href="">Shop</Link>
          <Link href="">Deals</Link>
          <Link href="">Contact</Link>
          <Link href="">Logout</Link>
          <Link href="">Cart(1)</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
