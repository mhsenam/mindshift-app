import { loadStripe } from "@stripe/stripe-js";

// Load the Stripe client only once
const stripePromise = loadStripe(
  "pk_test_51RLN6qD8ah9ocF2p96lmW0YzoU2nY6HQhi0fOck1fcSYmCX1T7q5sH6PPqOXkfACudZQDomgb2JNPWQxGUOgveMO001xpebzqV"
);

export default stripePromise;
