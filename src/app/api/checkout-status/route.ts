import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key from environment variable
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

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
      { error: "Failed to retrieve checkout session" },
      { status: 500 }
    );
  }
}
