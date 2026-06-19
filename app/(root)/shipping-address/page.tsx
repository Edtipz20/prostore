import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import ShippingAddressForm from "./shipping-address-form";
import { ShippingAddress } from "@/types";
import CheckoutSteps from "@/components/shared/checkout-steps";

export const metadata = {
  title: "Shipping Address",
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/cart");

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("User id not found ");

  const user = await getUserById(userId);
  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={user.address as ShippingAddress} />
    </>
  );
};

export default ShippingAddressPage;
