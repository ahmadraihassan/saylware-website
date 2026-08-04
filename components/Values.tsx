import { values } from "@/lib/content";
import Reveal from "./Reveal";
import Icon from "./Icon";

export default function Values() {
  return (
    <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl w-full">
        <Reveal>
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-tight text-center mb-8 sm:mb-12">
            {values.headline}
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {values.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <article className="h-full soft-shell p-5 sm:p-6 transition-transform duration-400 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center text-[var(--accent)]">
                  <Icon name={item.icon} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
