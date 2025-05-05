import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | MindShift",
  description:
    "Explore our flexible pricing plans to find the perfect fit for your mindfulness journey.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
