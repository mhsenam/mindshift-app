# Stripe Integration Setup

This application uses Stripe for payment processing. To ensure security, Stripe API keys are stored as environment variables.

## Setting up Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
# Stripe API Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

Replace the placeholder values with your actual API keys:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key (starts with `pk_`)
- `STRIPE_SECRET_KEY`: Your Stripe secret key (starts with `sk_`)

## Important Security Notes

1. Never commit your `.env.local` file or API keys to version control
2. The `.env.local` file is already added to `.gitignore`
3. For production, securely set these environment variables in your hosting platform

## Testing Stripe Integration

When testing, you can use Stripe's test cards:

- Card Number: 4242 4242 4242 4242
- Expiration Date: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

This will simulate a successful payment without charging a real card.

## Troubleshooting

If you encounter issues with the Stripe integration:

1. Verify that your environment variables are correctly set
2. Check that the API keys are valid and have the necessary permissions
3. Make sure you're using test keys in development and live keys in production 