import { useState } from "react";

interface CheckoutButtonProps {
  planName: string;
  planPrice: number;
  interval: "month" | "year" | "lifetime";
  buttonText: string;
  buttonClassName: string;
}

export default function CheckoutButton({
  planName,
  planPrice,
  interval,
  buttonText,
  buttonClassName,
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      // Create a checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: planName,
          price: planPrice,
          interval: interval,
        }),
      });

      const { url } = await response.json();

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      setIsLoading(false);
      // You could add error handling UI here
      alert(
        "Something went wrong with the checkout process. Please try again."
      );
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={buttonClassName}
    >
      {isLoading ? "Processing..." : buttonText}
    </button>
  );
}
