import { Icon } from "../lib/icons";
import { Button, Em, SectionIntro, revealDelay } from "./ui";

const phases = [
  {
    days: "Days 01–05",
    title: "Listen, then map.",
    copy: "I audit live projects, tools, and stakeholders. Existing docs get reviewed, not replaced. You get a clear picture of what's working — and what quietly isn't.",
    tag: "Project & tool audit",
  },
  {
    days: "Days 06–15",
    title: "Build the source of truth.",
    copy: "One tracker, one status format, one place for decisions. I clear the admin debt so the team can spend its energy on the actual work.",
    tag: "Single source of truth",
  },
  {
    days: "Days 16–24",
    title: "Take the weight off.",
    copy: "Weekly reporting, meeting notes, vendor chasing, and handovers become mine. Quietly and consistently, without a new process for everything.",
    tag: "Own the rhythm",
  },
  {
    days: "Days 25–30",
    title: "Leave it better.",
    copy: "Fewer surprise emails. Clearer priorities. Reports before the question. You get a project admin who is already part of the team — not still finding their feet.",
    tag: "Fully embedded",
  },
];

export function FirstThirtyDays() {
  return (
    <section
      id="onboarding"
      aria-label="The first 30 days"
      className="relative scroll-mt-24 overflow-hidden border-y border-ink/[0.08] bg-[#efe9dc] py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-24 -left-24 size-[26rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(215,239,130,0.48),transparent_66%)] blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_bottom_right,black,transparent_72%)]" />
      </div>

      <div className="relative mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div data-reveal="left" className="relative">
              <div className="group relative overflow-hidden rounded-[1.8rem] border border-white/50 bg-forest shadow-[0_40px_80px_-44px_rgba(20,32,26,0.55)]">
                <img
                  src="/images/nadia-at-work.jpg"
                  alt="Nadia working through a printed project timeline at her desk"
                  width={1400}
                  height={1000}
                  loading="lazy"
                  className="aspect-[5/4] w-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1711]/70 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
                  <span className="font-mono text-[8.5px] tracking-[0.13em] text-cream uppercase">
                    At work, week 2
                  </span>
                </div>
                <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/15 bg-white/[0.1] p-3.5 backdrop-blur-md sm:p-4">
                  <Icon name="quote" size={18} className="text-lime" />
                  <p className="mt-1.5 font-serif text-[1.05rem] leading-[1.35] italic text-cream sm:text-[1.15rem]">
                    "Within two weeks, Nadia was running the room. I stopped being the answer to
                    every question."
                  </p>
                  <p className="mt-2.5 font-mono text-[8.5px] tracking-[0.11em] text-cream/70 uppercase">
                    Priya Raman · Senior PM, Meridian
                  </p>
                </div>
              </div>

              <div className="glass-light animate-floaty-slow absolute -top-5 -right-3 hidden items-center gap-2.5 rounded-xl px-3.5 py-2.5 sm:flex lg:-right-5">
                <span className="grid size-8 place-items-center rounded-full bg-lime text-ink">
                  <Icon name="zap" size={15} />
                </span>
                <div>
                  <p className="text-[0.7rem] font-medium text-ink">Ramp-up, handled</p>
                  <p className="font-mono text-[7.5px] tracking-[0.1em] text-moss uppercase">Day 30: fully embedded</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionIntro
              eyebrow="03 — The first 30 days"
              title={
                <>
                  Less onboarding. <Em>More momentum.</Em>
                </>
              }
              description="You shouldn't have to teach a Project Administrator how to be one. Here's exactly how I'd earn my place in your team — and start giving time back in week one."
            />

            <div className="mt-9 border-t border-ink/12" data-reveal style={revealDelay(2)}>
              {phases.map((phase, index) => (
                <div
                  key={phase.days}
                  className="group relative border-b border-ink/12 py-5 transition-colors duration-300 hover:bg-paper/45 sm:py-6"
                >
                  <div className="flex gap-4 sm:gap-6">
                    <div className="flex shrink-0 flex-col items-center">
                      <span className="grid size-9 place-items-center rounded-full border border-ink/15 bg-paper font-mono text-[10px] text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-lime sm:size-10">
                        0{index + 1}
                      </span>
                      {index < phases.length - 1 && (
                        <span className="mt-1 w-px flex-1 bg-ink/12" aria-hidden="true" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 pb-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <p className="font-mono text-[9px] tracking-[0.15em] text-moss uppercase">
                          {phase.days}
                        </p>
                        <span className="rounded-full border border-ink/10 bg-paper/70 px-2 py-0.5 text-[0.62rem] font-medium text-forest">
                          {phase.tag}
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-[1.1rem] font-medium tracking-[-0.025em] text-ink sm:text-[1.2rem]">
                        {phase.title}
                      </h3>
                      <p className="mt-1.5 max-w-[34rem] text-[0.85rem] leading-[1.7] text-moss">
                        {phase.copy}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center" data-reveal style={revealDelay(3)}>
              <Button href="#contact" size="lg">
                Talk through the role
              </Button>
              <p className="max-w-[17rem] text-[0.75rem] leading-relaxed text-moss">
                Prefer a quick intro call first? That works too — I'll bring questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
