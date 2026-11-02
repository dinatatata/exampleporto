import type { ReactNode } from "react";
import { Icon, type IconName } from "../lib/icons";
import { Em, SectionIntro, revealDelay } from "./ui";

const toolStack = [
  "Notion",
  "Asana",
  "Jira",
  "ClickUp",
  "Monday",
  "Trello",
  "Slack",
  "Google Workspace",
  "Figma",
  "Sheets / Excel",
];

const timeline = [
  { label: "Kickoff", width: "100%", state: "done" },
  { label: "Build", width: "100%", state: "done" },
  { label: "Review", width: "64%", state: "active" },
  { label: "Launch", width: "12%", state: "next" },
] as const;

function CardShell({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <article
      data-reveal
      style={revealDelay(delay, 70)}
      className={`lift group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-ink/[0.09] bg-paper p-6 sm:p-7 ${className}`}
    >
      <div
        className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(215,239,130,0.5),transparent_65%)] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
        aria-hidden="true"
      />
      {children}
    </article>
  );
}

function CardIcon({ name, dark = false }: { name: IconName; dark?: boolean }) {
  return (
    <span
      className={`relative grid size-11 place-items-center rounded-[0.9rem] border transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105 ${
        dark
          ? "border-white/12 bg-white/[0.07] text-lime"
          : "border-ink/10 bg-cream text-forest"
      }`}
    >
      <Icon name={name} size={19} />
    </span>
  );
}

function CardTag({ children }: { children: ReactNode }) {
  return (
    <span className="absolute top-6 right-6 hidden rounded-full border border-ink/10 bg-cream/80 px-2.5 py-1 font-mono text-[8.5px] tracking-[0.14em] text-moss uppercase sm:inline-flex">
      {children}
    </span>
  );
}

export function Strengths() {
  return (
    <section
      id="strengths"
      aria-label="What Nadia brings to your team"
      className="relative scroll-mt-24 bg-cream py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="01 — What I bring to the table"
            title={
              <>
                The quiet engine behind <Em>great delivery.</Em>
              </>
            }
            className="max-w-[44rem]"
          />
          <div data-reveal style={revealDelay(3)} className="max-w-sm lg:pb-1">
            <p className="text-[0.95rem] leading-[1.75] text-moss">
              Not another task-taker. A proactive operator who builds the clarity, rhythm, and
              calm that ambitious projects run on.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-[9.5px] tracking-[0.16em] text-ink/55 uppercase">
              <Icon name="sparkle" size={13} />
              Project admin, not just admin
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-3 sm:mt-14 sm:gap-4 md:grid-cols-12">
          {/* Coordination — wide */}
          <CardShell className="md:col-span-7" delay={0}>
            <div className="flex items-start justify-between gap-6">
              <CardIcon name="target" />
              <CardTag>Core strength</CardTag>
            </div>
            <h3 className="mt-6 max-w-[22rem] text-[1.3rem] leading-[1.2] font-medium tracking-[-0.03em] text-ink sm:text-[1.45rem]">
              From kickoff to close-out, nothing slips.
            </h3>
            <p className="mt-2.5 max-w-md text-[0.88rem] leading-[1.7] text-moss">
              Scope, milestones, owners, and dependencies — mapped in one place and checked
              before they become a problem.
            </p>
            <div className="mt-auto pt-7">
              <div className="rounded-xl border border-ink/[0.08] bg-cream/70 p-4 transition-colors duration-300 group-hover:bg-cream">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[0.76rem] font-medium text-ink">Lantern rebrand</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-2 py-0.5 font-mono text-[8px] tracking-[0.08em] text-ink uppercase">
                    <span className="size-1 rounded-full bg-ink" /> On track
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-1.5 sm:gap-2">
                  {timeline.map((phase) => (
                    <div key={phase.label}>
                      <div className="h-1.5 overflow-hidden rounded-full bg-ink/[0.08]">
                        <div
                          className={`h-full rounded-full transition-[width] duration-1000 ease-out ${
                            phase.state === "active"
                              ? "bg-lime-deep"
                              : phase.state === "done"
                                ? "bg-forest"
                                : "bg-ink/15"
                          }`}
                          style={{ width: phase.width }}
                        />
                      </div>
                      <p className="mt-2 font-mono text-[8.5px] tracking-[0.08em] text-moss uppercase">
                        {phase.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardShell>

          {/* Documentation — tall */}
          <CardShell className="md:col-span-5" delay={1}>
            <div className="flex items-start justify-between gap-6">
              <CardIcon name="file" />
              <CardTag>Loved by PMs</CardTag>
            </div>
            <h3 className="mt-6 text-[1.3rem] leading-[1.2] font-medium tracking-[-0.03em] text-ink sm:text-[1.45rem]">
              Documentation people actually use.
            </h3>
            <p className="mt-2.5 text-[0.88rem] leading-[1.7] text-moss">
              Meeting notes that become decisions. SOPs people follow. A Drive you'd let a
              client open.
            </p>
            <div className="mt-auto space-y-1.5 pt-7">
              {["Kickoff brief", "Decision log", "Weekly status"].map((doc, index) => (
                <div
                  key={doc}
                  className="flex items-center gap-2.5 rounded-lg border border-ink/[0.07] bg-cream/60 px-3 py-2 transition-transform duration-300 group-hover:translate-x-0.5"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Icon name="file" size={13} className="text-forest/70" />
                  <span className="flex-1 text-[0.73rem] text-ink/80">{doc}</span>
                  <Icon name="check" size={12} className="text-forest/50" />
                </div>
              ))}
            </div>
          </CardShell>

          {/* Communication */}
          <CardShell className="md:col-span-4" delay={2}>
            <CardIcon name="message" />
            <h3 className="mt-5 text-[1.12rem] leading-[1.25] font-medium tracking-[-0.025em] text-ink">
              Stakeholders, in sync.
            </h3>
            <p className="mt-2 text-[0.85rem] leading-[1.7] text-moss">
              One source of truth for leads, clients, and makers. No side-channels. No deadline
              surprises.
            </p>
            <div className="mt-auto flex items-center gap-3 pt-6">
              <div className="flex -space-x-2">
                {["PR", "DO", "CV", "MK"].map((initials, index) => (
                  <span
                    key={initials}
                    className={`grid size-7 place-items-center rounded-full border-2 border-paper font-mono text-[8px] ${
                      index === 3 ? "bg-lime text-ink" : "bg-forest text-cream"
                    }`}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[8.5px] tracking-[0.12em] text-moss uppercase">
                Always aligned
              </span>
            </div>
          </CardShell>

          {/* Reporting */}
          <CardShell className="md:col-span-4" delay={3}>
            <CardIcon name="chart" />
            <h3 className="mt-5 text-[1.12rem] leading-[1.25] font-medium tracking-[-0.025em] text-ink">
              Reporting, before you ask.
            </h3>
            <p className="mt-2 text-[0.85rem] leading-[1.7] text-moss">
              Weekly pulse, live dashboards, and the one risk that matters — flagged first,
              with options.
            </p>
            <div className="mt-auto pt-6">
              <svg viewBox="0 0 180 46" className="h-12 w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="strength-chart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d7ef82" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#d7ef82" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M2 37 L28 32 L52 34 L76 22 L100 26 L124 14 L150 17 L178 5 L178 46 L2 46 Z"
                  fill="url(#strength-chart)"
                />
                <path
                  d="M2 37 L28 32 L52 34 L76 22 L100 26 L124 14 L150 17 L178 5"
                  fill="none"
                  stroke="#20382a"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="178" cy="5" r="3" fill="#20382a" stroke="#fbf8f1" strokeWidth="1.6" />
              </svg>
              <div className="mt-1 flex items-center justify-between font-mono text-[8.5px] tracking-[0.1em] text-moss uppercase">
                <span>Week 01</span>
                <span className="text-ink">100% on time</span>
              </div>
            </div>
          </CardShell>

          {/* Process */}
          <CardShell className="md:col-span-4" delay={4}>
            <CardIcon name="workflow" />
            <h3 className="mt-5 text-[1.12rem] leading-[1.25] font-medium tracking-[-0.025em] text-ink">
              Friction, designed out.
            </h3>
            <p className="mt-2 text-[0.85rem] leading-[1.7] text-moss">
              Duplicate trackers and zombie meetings don't stand a chance. I find the friction,
              then build around it.
            </p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
              {["−3 status meetings", "+6 hrs back / wk", "1 source of truth"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink/10 bg-cream px-2.5 py-1 text-[0.65rem] font-medium text-forest transition-colors duration-300 group-hover:border-lime-deep/50 group-hover:bg-lime-soft/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardShell>

          {/* Tool stack — dark */}
          <article
            data-reveal
            style={revealDelay(5, 70)}
            className="grain relative overflow-hidden rounded-[1.5rem] bg-forest p-6 text-cream md:col-span-12 sm:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -top-32 right-0 size-[24rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(215,239,130,0.22),transparent_65%)] blur-2xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-8 md:grid-cols-12 md:items-center">
              <div className="md:col-span-5">
                <CardIcon name="layers" dark />
                <h3 className="mt-5 max-w-[20rem] text-[1.35rem] leading-[1.18] font-medium tracking-[-0.03em] sm:text-[1.5rem]">
                  Fluent in your stack. Fast on whatever comes next.
                </h3>
                <p className="mt-2.5 max-w-sm text-[0.88rem] leading-[1.7] text-cream/60">
                  I've set up, migrated, and rescued more tools than I can count. The software
                  changes — the system underneath is what makes it stick.
                </p>
              </div>
              <div className="md:col-span-7">
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {toolStack.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[0.72rem] font-medium text-cream/75 backdrop-blur-sm transition-colors duration-300 hover:border-lime/40 hover:bg-lime/10 hover:text-cream"
                    >
                      {tool}
                    </span>
                  ))}
                  <span className="rounded-full border border-lime/40 bg-lime px-3 py-1.5 text-[0.72rem] font-medium text-ink">
                    + your stack
                  </span>
                </div>
                <p className="mt-4 font-mono text-[9px] tracking-[0.14em] text-cream/60 uppercase md:text-right">
                  Tool-agnostic by design · Systems before software
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
