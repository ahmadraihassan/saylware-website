import { ctaBanner } from "@/lib/content";
import Reveal from "./Reveal";

export default function CtaBanner() {
  return (
    <section className="relative py-12 sm:py-20 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="scale">
          <div className="notch-frame relative aspect-[16/11] sm:aspect-[21/9] min-h-[320px]">
            <span className="notch-side-left" />
            <span className="notch-side-right" />
            <img
              src={ctaBanner.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.04em] uppercase text-white max-w-3xl">
                {ctaBanner.headline}
              </h2>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={ctaBanner.primary.href}
                  className="rounded-full border border-white/70 px-7 py-3 text-sm font-medium text-white hover:bg-white hover:text-[var(--bg)] transition-colors duration-300"
                >
                  {ctaBanner.primary.label}
                </a>
                <a
                  href={ctaBanner.secondary.href}
                  className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-[var(--bg)] hover:bg-[var(--accent)] hover:text-white transition-colors duration-300"
                >
                  {ctaBanner.secondary.label}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
