// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { Order } from "@/types";
import { formatCurreny } from "@/lib/utils";
import sampleData from "@/db/sample-data";

PurchaseReceiptEmail.PreviewProps = {
  order: {
    id: "636a8d5d-6fa1-4149-98d6-b17b0f0071b3",
    userId: "b5afb44e-9b45-40ce-a174-2123f78654b1",
    user: {
      name: "Eduard Tipoh",
      email: "ed@ed.com",
    },
    paymentMethod: "Cash On Delivery",
    shippingAddress: {
      fullName: "amanda",
      streetAddress: "coloran",
      city: "siay",
      postalCode: "9000",
      country: "phil",
    },
    createdAt: new Date(),
    totalPrice: "234",
    taxPrice: "32",
    shippingPrice: "32",
    itemsPrice: "234",
    orderItems: sampleData.products.map((x) => ({
      name: x.name,
      orderId: "123",
      productId: "123",
      slug: x.slug,
      qty: x.stock,
      image: x.images[0],
      price: x.price.toString(),
    })),
    isDelivered: true,
    deliveredAt: new Date(),
    isPaid: true,
    paidAt: new Date(),
    paymentResult: {
      id: "123",
      status: "succeeded",
      pricePaid: "100",
      email_address: "ed@ed.com",
    },
  },
} satisfies OrderInfoProps;

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

type OrderInfoProps = {
  order: Order;
};

export default function PurchaseReceiptEmail({ order }: OrderInfoProps) {
  return (
    <Html>
      <Preview>View order receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <Section>
              <Row>
                <Column>
                  <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
                    Order ID
                  </Text>
                  <Text className="mb-0 mr-4">{order.id.toString()}</Text>
                </Column>
                <Column>
                  <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
                    Purchase Date
                  </Text>
                  <Text className="mb-0 mr-4">
                    {dateFormatter.format(order.createdAt)}
                  </Text>
                </Column>
                <Column>
                  <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
                    Price Paid
                  </Text>
                  <Text className="mb-0 mr-4">
                    {formatCurreny(order.totalPrice)}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
              {order.orderItems.map((item) => (
                <Row key={item.productId} className="mt-8">
                  <Column className="w-20">
                    <Img
                      width="80"
                      alt={item.name}
                      className="rounded"
                      src={
                        item.image.startsWith("/")
                          ? `${process.env.NEXT_PUBLIC_SERVER_URL}${item.image}`
                          : item.image
                      }
                    />
                  </Column>
                  <Column className="align-top">
                    {item.name} x {item.qty}
                  </Column>
                  <Column align="right" className="align-top">
                    {formatCurreny(item.price)}
                  </Column>
                </Row>
              ))}
              {[
                { name: "Items", price: order.itemsPrice },
                { name: "Tax", price: order.taxPrice },
                { name: "Shipping", price: order.shippingPrice },
                { name: "Total", price: order.totalPrice },
              ].map(({ name, price }) => (
                <Row key={name} className="py-1">
                  <Column align="right">{name}:</Column>
                  <Column align="right" width={70} className="align-top">
                    <Text className="m-0">{formatCurreny(price)}</Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
