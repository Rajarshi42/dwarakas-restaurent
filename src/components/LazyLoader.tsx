export default function LazyLoader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-20 text-center">
      <div className="animate-pulse rounded-3xl bg-white/5 p-10 shadow-card">
        <div className="mb-4 h-4 w-48 rounded-full bg-white/10" />
        <div className="space-y-3">
          <div className="h-3 rounded-full bg-white/10" />
          <div className="h-3 rounded-full bg-white/10 w-5/6" />
          <div className="h-3 rounded-full bg-white/10 w-3/5" />
        </div>
      </div>
    </div>
  );
}
