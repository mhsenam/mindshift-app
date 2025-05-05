import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key from environment variable
const stripeKey =
  process.env.STRIPE_SECRET_KEY ||
  "sk_test_51RLN6qD8ah9ocF2pru9HcjomUC9x5xHZAUCXVdPhIjlBfxxKrYahdfxpVyQXOrOqrkG6CfOlKc4fHYqvM14mzHog00jUEGKRzQ";

// Only initialize Stripe if the API key is available
const stripe = stripeKey ? new Stripe(stripeKey) : null;

export async function POST(request: NextRequest) {
  try {
    // Validate that Stripe secret key is set
    if (!stripe || !stripeKey) {
      console.error("Stripe secret key is not configured");
      return NextResponse.json(
        {
          error:
            "Payment service is not properly configured. Missing Stripe API key.",
        },
        { status: 500 }
      );
    }

    // Parse request body
    let req;
    try {
      req = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Validate required fields
    const { price, name, interval, success_url, cancel_url } = req;

    if (!price || !name || !interval) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: price, name, and interval are required",
        },
        { status: 400 }
      );
    }

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
      {
        error:
          "Failed to create checkout session: " +
          (error instanceof Error ? error.message : "Unknown error"),
      },
      { status: 500 }
    );
  }
}
