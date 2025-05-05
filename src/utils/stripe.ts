import { loadStripe } from "@stripe/stripe-js";

// Load the Stripe client only once
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default stripePromise;
