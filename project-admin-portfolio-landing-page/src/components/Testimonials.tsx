import { Icon } from "../lib/icons";
import { Avatar, Em, SectionIntro, revealDelay } from "./ui";

const testimonials = [
  {
    quote:
      "Ask Nadia for a status update and you'll get an answer before you've finished the question. More importantly, it's always right. She turned our reporting from a scramble into a two-minute read.",
    name: "Daniel Osei",
    role: "Operations Lead, Northwind",
    initials: "DO",
    result: "5 projects together",
  },
  {
    quote:
      "She gave our ten-person team the operating backbone of a company ten times our size — without a single heavy process. Nothing gets lost, nothing gets over-engineered.",
    name: "Clara Voss",
    role: "Founder, Lumina Labs",
    initials: "CV",
    result: "Scaled through 3 launches",
  },
  {
    quote:
      "The first delivery lead we've had who protects the team's focus as fiercely as the deadline. She makes the work feel lighter, not more managed.",
    name: "Mira Kusuma",
    role: "Design Lead, Fieldwork",
    initials: "MK",
    result: "2 years as a team",
  },
];

export function Testimonials() {
  return (
    <section
      id="reviews"
      aria-label="Testimonials"
      className="relative scroll-mt-24 bg-cream py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="04 — Kind words"
            title={
              <>
                Trusted by teams who <Em>hate surprises.</Em>
              </>
            }
            className="max-w-[48rem]"
          />
          <div className="max-w-xs lg:pb-2" data-reveal style={revealDelay(3)}>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["PR", "DO", "CV"].map((initials, index) => (
                  <Avatar key={initials} initials={initials} index={index} className="size-8 border-2 border-cream text-[9px]" />
                ))}
              </div>
              <span className="font-mono text-[9px] tracking-[0.13em] text-moss uppercase">
                3 references available
              </span>
            </div>
            <p className="mt-3 text-[0.82rem] leading-relaxed text-moss">
              Former managers have offered to take reference calls. Just ask.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-3 sm:gap-4 lg:grid-cols-12">
          <figure
            data-reveal="scale"
            className="lift relative flex flex-col overflow-hidden rounded-[1.7rem] border border-ink/[0.09] bg-paper p-6 sm:p-8 lg:col-span-7 lg:p-10"
          >
            <div
              className="pointer-events-none absolute -top-24 -right-20 size-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(215,239,130,0.55),transparent_65%)] blur-2xl"
              aria-hidden="true"
            />
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-10 place-items-center rounded-full bg-ink text-lime">
                  <Icon name="quote" size={19} />
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3 py-1.5 font-mono text-[8.5px] tracking-[0.1em] text-ink uppercase">
                  <Icon name="arrowUp" size={10} /> 22% on-time delivery
                </span>
              </div>
              <blockquote className="mt-7 sm:mt-9">
                <p className="font-serif text-[1.55rem] leading-[1.28] tracking-[-0.01em] text-ink italic sm:text-[1.9rem] lg:text-[2.1rem]">
                  "Nadia is the person I want on a project that's already on fire. She doesn't just
                  document the chaos — she quietly removes it. Our on-time delivery went from 76%
                  to 98% in a quarter."
                </p>
              </blockquote>
              <figcaption className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                <div className="flex items-center gap-3">
                  <Avatar initials="PR" index={0} className="size-11 border-0" />
                  <div>
                    <p className="text-[0.86rem] font-medium text-ink">Priya Raman</p>
                    <p className="mt-0.5 text-[0.72rem] text-moss">Senior Project Manager · Meridian Studio</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[8px] tracking-[0.12em] text-moss uppercase">
                  <Icon name="check" size={11} /> Worked together 2 yrs
                </span>
              </figcaption>
            </div>
          </figure>

          <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-5">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.name}
              data-reveal="right"
              style={revealDelay(index + 1, 90)}
              className="lift group relative flex flex-1 flex-col rounded-[1.5rem] border border-ink/[0.09] bg-paper p-5 transition-colors hover:border-ink/20 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-ink/25" aria-hidden="true">
                  <Icon name="quote" size={15} />
                </div>
                <span className="rounded-full border border-ink/10 bg-cream px-2.5 py-1 font-mono text-[7.5px] tracking-[0.1em] text-moss uppercase">
                  {testimonial.result}
                </span>
              </div>
              <blockquote className="mt-3 flex-1">
                <p className="text-[0.86rem] leading-[1.7] text-ink/80">"{testimonial.quote}"</p>
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-2.5 border-t border-ink/[0.08] pt-4">
                <Avatar initials={testimonial.initials} index={index + 1} className="size-8 border-0 text-[9px]" />
                <div>
                  <p className="text-[0.76rem] font-medium text-ink">{testimonial.name}</p>
                  <p className="mt-0.5 text-[0.66rem] text-moss">{testimonial.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
