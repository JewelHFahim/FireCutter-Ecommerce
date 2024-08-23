import Filter from "@/components/Filters";
import ProductList from "@/components/ProductList";
import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import React, { Suspense } from "react";

const ListPage = async ({ searchParams }) => {
  const wixClient = await wixClientServer();

  const cat = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );

  return (
    <div className="lg:mt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-52">
      {/* CAMPAIGN */}
      <div className="bg-pink-50 px-4 hidden lg:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700 ">
            Grab up to 50% on <br /> Selected Products
          </h1>
          <button className="w-max bg-vsb text-white rounded-3xl py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>

        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>

      {/* FILTER */}
      <Filter />

      {/* PRODUCT LIST */}
      <h1 className="mt-12 text-xl font-semibold">
        {cat?.collection?.name} For You
      </h1>
      <Suspense fallback={"loading..."}>
        <ProductList
          categoryId={
            cat.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
};

export default ListPage;
