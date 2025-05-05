import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key from environment variable
const stripeKey =
  process.env.STRIPE_SECRET_KEY ||
  "sk_test_51RLN6qD8ah9ocF2pru9HcjomUC9x5xHZAUCXVdPhIjlBfxxKrYahdfxpVyQXOrOqrkG6CfOlKc4fHYqvM14mzHog00jUEGKRzQ";

// Only initialize Stripe if the API key is available
const stripe = stripeKey ? new Stripe(stripeKey) : null;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Validate that Stripe is initialized
    if (!stripe) {
      console.error("Stripe client is not initialized");
      return NextResponse.json(
        { error: "Payment service is not properly configured" },
        { status: 500 }
      );
    }

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "payment_intent"],
    });

    // Extract relevant data
    const lineItems = session.line_items?.data || [];
    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;

    // Simplified response data
    const responseData = {
      id: session.id,
      status: session.status,
      amount: paymentIntent?.amount || session.amount_total,
      currency: session.currency,
      plan: lineItems[0]?.description || "MindShift Premium",
      email: session.customer_details?.email,
      created: session.created,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error retrieving checkout session:", error);
    return NextResponse.json(
      {
        error:
          "Failed to retrieve checkout session: " +
          (error instanceof Error ? error.message : "Unknown error"),
      },
      { status: 500 }
    );
  }
}
