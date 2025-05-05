import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key
const stripe = new Stripe(
  "sk_test_51RLN6qD8ah9ocF2pru9HcjomUC9x5xHZAUCXVdPhIjlBfxxKrYahdfxpVyQXOrOqrkG6CfOlKc4fHYqvM14mzHog00jUEGKRzQ"
);

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { price, name, interval, success_url, cancel_url } = req;

    // Define line items for checkout
    let lineItems = [];

    // For a real app, you'd have these price IDs stored and validated
    if (interval === "lifetime") {
      // Create a one-time payment
      lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name,
              description: "Lifetime access to MindShift Premium",
            },
            unit_amount: Math.round(price * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ];
    } else {
      // For subscription plans (monthly or yearly)
      lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name,
              description: `${
                interval === "month" ? "Monthly" : "Annual"
              } subscription to MindShift Premium`,
            },
            unit_amount: Math.round(price * 100), // Stripe uses cents
            recurring: {
              interval: interval, // 'month' or 'year'
            },
          },
          quantity: 1,
        },
      ];
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: interval === "lifetime" ? "payment" : "subscription",
      success_url:
        success_url ||
        `${request.nextUrl.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url || `${request.nextUrl.origin}/pricing`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
