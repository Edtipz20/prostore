"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClink = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });
    router.push(newUrl);
  };
  return (
    <div className="flex gap-2 justify-end">
      <Button
        size="lg"
        variant="outline"
        className="w-28 cursor-pointer"
        disabled={Number(page) <= 1}
        onClick={() => handleClink("prev")}
      >
        <ChevronLeft /> Previous
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-28 cursor-pointer"
        disabled={Number(page) >= totalPages}
        onClick={() => handleClink("next")}
      >
        Next <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
