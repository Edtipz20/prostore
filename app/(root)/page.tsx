import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { Suspense } from "react";
import LoadingPage from "./loading";

export const revalidate = 3600;

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <>
      <Suspense key="new-arrival" fallback={<LoadingPage />}>
        <ProductList data={latestProducts} title="Newest Arrivals" />
      </Suspense>
    </>
  );
};

export default Homepage;
