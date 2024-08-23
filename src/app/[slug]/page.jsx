import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImaages from "@/components/ProductImages";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import React from "react";

const SinglePage = async ({ params }) => {
  const wixClient = await wixClientServer();

  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];

  return (
    <div className="mt-4 lg:mt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-52 flex flex-col lg:flex-row gap-16">
      {/* Images */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImaages items={product.media?.items} />
      </div>

      {/* Texts */}
      <div className="w-full lg:w-1/2 h-max flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>

        {product.description && (
          <div
            className=" text-gray-500"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description),
            }}
          ></div>
        )}

        <div className="h-[2px] bg-gray-100" />
        <div className="flex items-center gap-4">
          {product.priceData?.price === product.priceData?.discountedPrice ? (
            <h3 className="font-medium text-2xl">
              ${product.priceData?.discountedPrice}
            </h3>
          ) : (
            <>
              <h3 className="text-gray-500 text-xl line-through">
                ${product.priceData?.price}
              </h3>
              <h3 className="font-medium text-2xl">
                ${product.priceData?.discountedPrice}
              </h3>
            </>
          )}
        </div>
        <div className="h-[2px] bg-gray-100" />

        {product.variants && product.productOptions ? (
          <CustomizeProducts
            productId={product._id}
            variants={product.variants}
            productOptions={product.productOptions}
          />
        ) : (
          <Add
            productId={product._id}
            variantId="00000000-000000-000000-000000000000"
            stockNumber={product.stock?.quantity || 0}
          />
        )}

        <div className="h-[2px] bg-gray-100" />

        {product?.additionalInfoSections?.map((section) => (
          <div className="text-sm" key={section.title}>
            <h4 className="font-medium mb-4">{section.title}</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePage;
