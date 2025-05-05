export const metadata = {
  title: "Contact Us | MindShift",
  description:
    "Get in touch with the MindShift team for support, feedback, or inquiries.",
};

export default function ContactPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="card p-8">
          {/* Contact form placeholder */}
          <div className="space-y-4 text-center text-gray-500">
            Coming soon! Our contact page is under development.
          </div>
        </div>
      </div>
    </div>
  );
}
