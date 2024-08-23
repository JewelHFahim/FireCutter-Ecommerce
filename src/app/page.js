import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import TestProductList from "@/components/TestProductList";
import { Suspense } from "react";

const HomePage = async () => {
  return (
    <div className="">
      <Slider />

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-52">
        <h2 className="text-2xl">Featured Products</h2>

        <Suspense fallback={"loading..."}>
          <ProductList
            categoryId={process.env.FEATURED_CATEGORY_ID}
            limit={4}
          />
        </Suspense>
      </div>

      <div className="mt-24">
        <h2 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-52 mb-12">
          Categories
        </h2>
        <Suspense fallback="Loading...">
          <CategoryList />
        </Suspense>
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-52">
        <h2 className="text-2xl">New Products</h2>
        <Suspense fallback={"loading..."}>
          <TestProductList />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
