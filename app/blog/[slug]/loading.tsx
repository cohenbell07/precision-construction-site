export default function Loading() {
  return (
    <div className="flex flex-col">
      <section className="pt-24 pb-10 bg-black">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="h-3 w-24 rounded-full bg-white/[0.06] animate-pulse mb-6" />
          <div className="h-10 sm:h-14 w-full rounded-md bg-white/[0.06] animate-pulse mb-4" />
          <div className="h-10 sm:h-14 w-3/4 rounded-md bg-white/[0.06] animate-pulse mb-6" />
          <div className="h-3 w-40 rounded-full bg-white/[0.04] animate-pulse" />
        </div>
      </section>
      <section className="bg-black">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="aspect-[16/9] rounded-xl bg-white/[0.03] animate-pulse" />
        </div>
      </section>
      <section className="py-14 bg-black">
        <div className="container mx-auto px-6 max-w-3xl space-y-4">
          <div className="h-4 w-full rounded bg-white/[0.04] animate-pulse" />
          <div className="h-4 w-[95%] rounded bg-white/[0.04] animate-pulse" />
          <div className="h-4 w-[88%] rounded bg-white/[0.04] animate-pulse" />
          <div className="h-4 w-[92%] rounded bg-white/[0.04] animate-pulse" />
          <div className="h-4 w-[80%] rounded bg-white/[0.04] animate-pulse" />
        </div>
      </section>
    </div>
  );
}
