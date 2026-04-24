export default function Loading() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] min-h-[420px] bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="relative container mx-auto px-6 max-w-7xl h-full flex flex-col justify-end pb-16">
          <div className="h-3 w-28 rounded-full bg-white/[0.06] animate-pulse mb-5" />
          <div className="h-12 sm:h-16 w-3/4 max-w-2xl rounded-md bg-white/[0.06] animate-pulse mb-4" />
          <div className="h-4 w-2/3 max-w-xl rounded-md bg-white/[0.04] animate-pulse" />
        </div>
      </section>
      <section className="py-16 sm:py-24 bg-black">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-48 rounded-xl bg-white/[0.03] animate-pulse" />
            <div className="h-48 rounded-xl bg-white/[0.03] animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
}
