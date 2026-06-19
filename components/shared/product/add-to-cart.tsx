"use client";

import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";
import { Plus, Minus, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      // Handle success add to cart
      toast.success(res.message, {
        action: {
          label: "Go To Cart",
          onClick: () => router.push("/cart"),
        },
        actionButtonStyle: {
          backgroundColor: "hsl(222.2 47.4% 11.2%)",
          color: "white",
          fontWeight: "600",
        },
      });
    });
  };

  // handle remove from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      toast.success(res.message, {
        actionButtonStyle: {
          backgroundColor: "var(--accent-foreground)",
          color: "var(--primary-foreground)",
          fontWeight: "600",
        },
      });
    });
  };

  // Check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        className="cursor-pointer"
        onClick={handleRemoveFromCart}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        className="cursor-pointer"
        onClick={handleAddToCart}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <Button
      className="w-full cursor-pointer"
      type="button"
      onClick={handleAddToCart}
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}{" "}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
