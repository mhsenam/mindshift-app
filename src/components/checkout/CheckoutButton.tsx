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
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    // Reset error state
    setError(null);

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
        let errorMessage = `API returned ${response.status}: ${response.statusText}`;

        try {
          // Try to parse the error message from JSON response
          const errorData = await response.json();
          if (errorData && errorData.error) {
            errorMessage = errorData.error;
          }
        } catch {
          // If response isn't JSON, try to get text content
          try {
            const errorText = await response.text();
            if (errorText) {
              console.error("API error:", response.status, errorText);
            }
          } catch {
            // If we can't get text either, just use the status message
          }
        }

        throw new Error(errorMessage);
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

      // Set error message for UI
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error occurred. Please try again later.";

      setError(errorMessage);

      // Also alert for immediate feedback
      alert("Something went wrong with the checkout process: " + errorMessage);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className={buttonClassName}
      >
        {isLoading ? "Processing..." : buttonText}
      </button>

      {error && <div className="text-red-500 mt-2 text-sm">Error: {error}</div>}
    </div>
  );
}
