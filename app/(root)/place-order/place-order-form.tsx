"use client";

import { Button } from "@/components/ui/button";
import { CreateOrder } from "@/lib/actions/order.action";
import { Check, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const PlaceOrderForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const res = await CreateOrder();
      if (res.redirectTo) {
        router.push(res.redirectTo);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Button disabled={isPending} className="w-full">
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Check className="w-4 h-4" />
        )}{" "}
        Place Order
      </Button>
    </form>
  );
};

export default PlaceOrderForm;
