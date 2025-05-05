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

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error:", response.status, errorText);
        throw new Error(
          `API returned ${response.status}: ${response.statusText}`
        );
      }

      // Safely parse JSON response
      const responseData = await response.json();
      const { url } = responseData;

      if (!url) {
        throw new Error("No checkout URL received from API");
      }

      // Redirect to Stripe Checkout
      window.location.href = url;
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
