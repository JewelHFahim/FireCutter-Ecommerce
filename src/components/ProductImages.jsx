"use client";

import Image from "next/image";
import React, { useState } from "react";

const ProductImaages = ({ items }) => {
    
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="relative h-[500px]">
        <Image
          src={items[index].image?.url}
          alt=""
          fill
          sizes="50vw"
          className="object-contain rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {items.map((item, i) => (
          <div
            key={item._id}
            className="relative w-1/4 h-32 gap-4 cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.image?.url}
              alt=""
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImaages;
