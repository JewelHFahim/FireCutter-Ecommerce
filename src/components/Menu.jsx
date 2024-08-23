"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Menu = () => {
  const wixClient = useWixClient();
  const [open, setOpen] = useState(false);

  const { cart, count, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div>
      <div onClick={() => setOpen((prev) => !prev)}>
        {open ? (
          <p className="text-2xl">X</p>
        ) : (
          <Image
            src="/menu.png"
            alt="menu icon"
            width={28}
            height={28}
            className="cursor-pointer"
          />
        )}
      </div>

      {open && (
        <div className="absolute bg-black text-white w-full left-0 top-20 h-[calc(100vh-80px)] flex flex-col items-center justify-center text-xl gap-8 z-[999]">
          <Link href="/list?cat=summer">Summer</Link>
          <Link href="/list?cat=denim">Denim</Link>
          <Link href="/list?cat=t-shirt">T-Shirt</Link>
          <Link href="/list?cat=shoes">Shoes</Link>
          <Link href="/list?cat=accessories">Accessopris</Link>

          <Link href="">Cart({count})</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
