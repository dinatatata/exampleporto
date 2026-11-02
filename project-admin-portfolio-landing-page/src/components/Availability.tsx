import { Icon } from "../lib/icons";
import { Button, Em, SectionIntro, StatusDot, revealDelay } from "./ui";

const options = [
  {
    index: "01",
    label: "Full-time",
    title: "Project Administrator",
    blurb:
      "The role I'm actively interviewing for. In-house, embedded, and building with your team for the long run.",
    metric: "40 hrs",
    unit: "/ week",
    features: [
      "Immediate start — two weeks max",
      "Hybrid or remote · Singapore / GMT+8",
      "End-to-end project ownership",
      "On-site onboarding welcome",
      "Long-term, in-house role",
      "Salary discussed openly",
    ],
    cta: "Discuss the role",
    note: "Preferred engagement",
    featured: true,
    badge: "Actively interviewing",
  },
  {
    index: "02",
    label: "Fixed-term",
    title: "Launch & transition support",
    blurb:
      "Extra structure exactly when you need it — a launch, a handover, or a team still finding its feet.",
    metric: "3–12 mo",
    unit: "per scope",
    features: [
      "25–40 hours per week",
      "Launch & event coordination",
      "Tracker and docs set-up",
      "Handover playbook included",
      "Two-week notice, flexible handover",
      "Day rate shared on request",
    ],
    cta: "Talk timelines",
    note: "Best for launches & transitions",
    featured: false,
  },
  {
    index: "03",
    label: "Part-time",
    title: "Flexible operations coverage",
    blurb:
      "A steady admin rhythm without a full-time hire. Ideal for lean teams and founders wearing too many hats.",
    metric: "10–20 h",
    unit: "/ week",
    features: [
      "Weekly reporting rhythm",
      "Documentation clean-up sprints",
      "Vendor & inbox coordination",
      "Fully remote, async-first",
      "One-month trial welcome",
      "Monthly retainer on request",
    ],
    cta: "Check availability",
    note: "Best for lean teams",
    featured: false,
  },
] as const;

export function Availability() {
  return (
    <section
      id="availability"
      aria-label="Availability and engagement options"
      className="relative scroll-mt-24 border-y border-ink/[0.08] bg-paper py-20 sm:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-grid opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="05 — Availability & fit"
            title={
              <>
                Let's find the <Em>right shape.</Em>
              </>
            }
            description="I'm looking for a full-time home, but great teams come in different shapes. Here's how I can help — and what's genuinely available right now."
            className="max-w-[46rem]"
          />
          <div
            data-reveal
            style={revealDelay(3)}
            className="w-full max-w-xs rounded-2xl border border-ink/10 bg-cream/70 p-4 lg:mb-1"
          >
            <div className="flex items-center gap-2">
              <StatusDot className="text-[#6b8a3f]" />
              <span className="font-mono text-[9px] tracking-[0.13em] text-ink uppercase">
                Open to offers
              </span>
            </div>
            <p className="mt-2.5 text-[0.78rem] leading-relaxed text-moss">
              Interview windows this week: <span className="text-ink">Tue–Thu, 09:00–17:00</span>.
              20 minutes is all we need.
            </p>
          </div>
        </div>

        <div className="mt-11 grid gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-3">
          {options.map((option, index) => (
            <article
              key={option.label}
              data-reveal="scale"
              style={revealDelay(index, 90)}
              className={`lift relative flex flex-col overflow-hidden rounded-[1.6rem] p-6 sm:p-7 ${
                option.featured
                  ? "on-dark grain border border-forest bg-forest text-cream shadow-[0_36px_70px_-40px_rgba(20,32,26,0.7)]"
                  : "border border-ink/[0.09] bg-cream/55 text-ink hover:border-ink/20"
              }`}
            >
              {option.featured && (
                <>
                  <div
                    className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(215,239,130,0.3),transparent_65%)] blur-2xl"
                    aria-hidden="true"
                  />
                </>
              )}

              <div className="relative flex items-start justify-between gap-3">
                <span
                  className={`font-mono text-[9px] tracking-[0.16em] uppercase ${
                    option.featured ? "text-cream/65" : "text-moss"
                  }`}
                >
                  {option.index} / {option.label}
                </span>
                {option.featured ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-1 font-mono text-[8px] tracking-[0.08em] text-ink uppercase">
                    <span className="size-1 rounded-full bg-ink" />
                    {option.badge}
                  </span>
                ) : (
                  <span
                    className={`rounded-full border px-2.5 py-1 font-mono text-[8px] tracking-[0.08em] uppercase ${
                      option.featured
                        ? "border-cream/20 text-cream/60"
                        : "border-ink/10 bg-cream/70 text-moss"
                    }`}
                  >
                    Open
                  </span>
                )}
              </div>

              <h3
                className={`relative mt-5 text-[1.25rem] leading-[1.2] font-medium tracking-[-0.03em] sm:text-[1.35rem] ${
                  option.featured ? "text-cream" : "text-ink"
                }`}
              >
                {option.title}
              </h3>
              <p
                className={`relative mt-2.5 text-[0.84rem] leading-[1.7] ${
                  option.featured ? "text-cream/60" : "text-moss"
                }`}
              >
                {option.blurb}
              </p>

              <div
                className={`relative mt-6 flex items-end justify-between gap-3 border-t pt-5 ${
                  option.featured ? "border-white/12" : "border-ink/10"
                }`}
              >
                <div className="flex items-baseline gap-1.5">
                  <span
                    className={`text-[1.9rem] leading-none font-medium tracking-[-0.045em] ${
                      option.featured ? "text-lime" : "text-ink"
                    }`}
                  >
                    {option.metric}
                  </span>
                  <span
                    className={`font-mono text-[9px] tracking-[0.08em] uppercase ${
                      option.featured ? "text-cream/60" : "text-moss"
                    }`}
                  >
                    {option.unit}
                  </span>
                </div>
                <span
                  className={`max-w-[7rem] text-right font-mono text-[8px] leading-relaxed tracking-[0.08em] uppercase ${
                    option.featured ? "text-cream/60" : "text-moss"
                  }`}
                >
                  {option.note}
                </span>
              </div>

              <ul className="relative mt-6 space-y-2.5">
                {option.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-2.5 text-[0.8rem] leading-snug ${
                      option.featured ? "text-cream/75" : "text-ink/75"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${
                        option.featured ? "bg-lime/15 text-lime" : "bg-ink/[0.06] text-forest"
                      }`}
                    >
                      <Icon name="check" size={9} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="relative mt-auto pt-7">
                <Button
                  href="#contact"
                  variant={option.featured ? "lime" : "outline"}
                  size="md"
                  className="w-full"
                >
                  {option.cta}
                </Button>
                <p
                  className={`mt-2.5 text-center font-mono text-[8px] tracking-[0.1em] uppercase ${
                    option.featured ? "text-cream/70" : "text-moss"
                  }`}
                >
                  Reply within 1 business day
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          data-reveal
          className="mt-4 flex flex-col justify-between gap-5 rounded-[1.3rem] border border-ink/[0.09] bg-lime-soft/60 p-5 sm:flex-row sm:items-center sm:px-6"
        >
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-lime">
              <Icon name="calendar" size={16} />
            </span>
            <div>
              <p className="text-[0.85rem] font-medium text-ink">
                Every conversation starts with 20 minutes — no strings, no hard sell.
              </p>
              <p className="mt-1 text-[0.76rem] leading-relaxed text-moss">
                Bring the role, the team, and the honest version of the plan. I'll bring questions.
              </p>
            </div>
          </div>
          <Button href="#contact" variant="primary" size="md" className="shrink-0">
            Book the intro call
          </Button>
        </div>
      </div>
    </section>
  );
}
