import ProductList from "@/components/shared/product/product-list";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";
import { Suspense } from "react";
import LoadingPage from "./loading";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ViewAllProductsButton from "@/components/view-all-products-button";

export const revalidate = 3600;

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <Suspense key="new-arrival" fallback={<LoadingPage />}>
        <ProductList data={latestProducts} title="Newest Arrivals" />
        <ViewAllProductsButton />
      </Suspense>
    </>
  );
};

export default Homepage;
