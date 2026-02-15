export function HomeLoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mx-auto mb-4 h-4 w-[250px] bg-gray-200" />
      <div className="mx-auto h-8 w-[500px] bg-gray-200" />
      <div className="mt-8 flex gap-4">
        <div className="h-[400px] w-full rounded-xl bg-gray-200" />
        <div className="h-[400px] w-full rounded-xl bg-gray-200" />
        <div className="h-[400px] w-full rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}
