import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-indigo-600">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Mental Well-being?
          </h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of individuals who have improved their focus, reduced
            stress, and found peace of mind with MindShift.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/sign-up"
              className="bg-white text-indigo-600 hover:bg-indigo-50 btn"
            >
              Get Started Free
              <FiArrowRight className="ml-2" />
            </Link>
            <Link
              href="/contact"
              className="bg-transparent text-white border border-white hover:bg-indigo-700 btn"
            >
              Contact Us
            </Link>
          </div>
          <p className="text-indigo-200 mt-6 text-sm">
            No credit card required. Free 14-day trial.
          </p>
        </div>
      </div>
    </section>
  );
}
