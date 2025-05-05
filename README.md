
![heroo](https://github.com/user-attachments/assets/f337bebb-6d47-4b72-a0f2-dae9facf1271)

# MindShift - Stay Calm & Focused

MindShift is a Next.js application designed to help users stay calm and focused through guided meditation, focus tools, and mindfulness practices.

## Features

- **Responsive Design**: Fully responsive for mobile devices (Android & iOS)
- **Meditation**: Guided meditation sessions for relaxation and mindfulness
- **Focus Tools**: Enhance your concentration and productivity
- **Progress Tracking**: Monitor your meditation and focus sessions
- **Ambient Sounds**: Create the perfect environment for relaxation or work
- **Dark Mode Support**: Comfortable viewing experience day and night

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Icons

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/yourusername/mindshift.git
cd mindshift
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
.
├── public/               # Static files
├── src/
│   ├── app/              # App router pages
│   │   ├── home/         # Homepage components
│   │   └── layout/       # Layout components (navbar, footer)
│   └── styles/           # Global styles
└── README.md
```

## Deployment

This project can be easily deployed on [Vercel](https://vercel.com/) or any other platform that supports Next.js applications.

```bash
npm run build
```

## Stripe Integration Setup

To enable payment processing with Stripe, you must set up your environment variables:

1. Create a `.env.local` file in the root directory with:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   ```

2. Replace placeholders with your actual Stripe API keys:
   - Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
   - Use test keys for development (`pk_test_...` and `sk_test_...`)
   - Use live keys for production (`pk_live_...` and `sk_live_...`)

3. Restart the development server after adding API keys

**⚠️ Important**: Never commit your `.env.local` file to version control as it contains sensitive data.

For more details on the Stripe integration, refer to [STRIPE_SETUP.md](./STRIPE_SETUP.md).

## License

MIT
