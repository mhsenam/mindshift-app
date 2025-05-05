export const metadata = {
  title: "Sign Up | MindShift",
  description:
    "Create your MindShift account and start your journey to better focus and mindfulness today.",
};

export default function SignUpPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Create Your Account
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Join thousands of people on their journey to mindfulness and better
          focus.
        </p>

        {/* Sign-up form placeholder */}
        <div className="card p-8">
          <div className="space-y-4 text-center text-gray-500">
            Coming soon! Our sign-up page is under development.
          </div>
        </div>
      </div>
    </div>
  );
}
