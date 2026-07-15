"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AdminSearch = () => {
  const pathname = usePathname();
  const formActionUrl = pathname.includes("/admin/orders")
    ? "/admin/orders"
    : pathname.includes("/admin/users")
      ? "/admin/users"
      : "/admin/products";

  const searchParams = useSearchParams();
  const [queryValue, setQueryValue] = useState(searchParams.get("query") || "");

  useEffect(() => {
    setQueryValue(searchParams.get("query") || "");
  }, [searchParams]);

  return (
    <form action={formActionUrl} method="GET">
      <Input
        type="search"
        placeholder="Search..."
        name="query"
        value={queryValue}
        className="md:w-25 lg:w-75"
        onChange={(e) => setQueryValue(e.target.value)}
      />
      <button className="sr-only" type="submit">
        Search
      </button>
    </form>
  );
};

export default AdminSearch;
