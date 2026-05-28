export default function PostSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200" />
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200" />
            <div className="h-3 bg-gray-200 rounded w-16" />
          </div>
          <div className="h-3 bg-gray-200 rounded w-12" />
        </div>
      </div>
    </div>
  );
}
