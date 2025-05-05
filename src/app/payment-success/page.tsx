"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/checkout-status?session_id=${sessionId}`
        );
        const data = await response.json();
        setPaymentDetails(data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [sessionId]);

  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>

        {loading ? (
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Loading payment details...
          </p>
        ) : (
          <>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Thank you for subscribing to MindShift. Your payment has been
              processed successfully, and your premium features are now active.
            </p>

            {paymentDetails && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-8">
                <h3 className="font-semibold text-lg mb-2">Payment Details</h3>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p>Plan: {paymentDetails.plan}</p>
                  <p>Amount: ${(paymentDetails.amount / 100).toFixed(2)}</p>
                  <p>
                    Date:{" "}
                    {new Date(
                      paymentDetails.created * 1000
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        <div className="space-y-3 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
          <Link href="/meditation" className="btn btn-primary">
            Start Meditating
          </Link>
          <Link href="/account" className="btn btn-secondary">
            View Your Account
          </Link>
        </div>
      </div>
    </div>
  );
}
