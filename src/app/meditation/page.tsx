export const metadata = {
  title: "Meditation | MindShift",
  description:
    "Explore guided meditations designed to help you relax, focus, and find inner peace.",
};

export default function MeditationPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Meditation</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Discover our collection of guided meditations for every moment of your
          day.
        </p>
      </div>

      {/* Meditation content will go here */}
      <div className="py-12 text-center text-gray-500">
        Coming soon! Our meditation page is under development.
      </div>
    </div>
  );
}
