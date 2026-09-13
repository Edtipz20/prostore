import {
  Headset,
  LucideIcon,
  MedalIcon,
  ShoppingBag,
  WalletCards,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

type IconBoxItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const iconBoxes: IconBoxItem[] = [
  {
    icon: ShoppingBag,
    title: "Free Shipping",
    description: "Provide free home delivery for all product over $100",
  },
  {
    icon: MedalIcon,
    title: "Quality Products",
    description: "We ensure the product quality that is our main goal",
  },
  {
    icon: WalletCards,
    title: "Flexible Payments",
    description: "Pay with credit card, PayPal or COD",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "We ensure the product quality that you can trust easily",
  },
];

const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className="grid md:grid-cols-4 gap-4 p-4 divide-y md:divide-y-0 md:divide-x divide-border">
          {iconBoxes.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-center gap-2">
              <Icon size={40} className="shrink-0" />
              <div className="space-y-2">
                <div className="text-sm font-bold">{title}</div>
                <div className="text-sm text-muted-foreground">
                  {description}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default IconBoxes;
