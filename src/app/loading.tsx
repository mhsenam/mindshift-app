export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin"></div>
          <div className="absolute inset-3 rounded-full border-2 border-gray-200 dark:border-gray-700"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 animate-pulse">
          Taking a deep breath...
        </p>
      </div>
    </div>
  );
}
