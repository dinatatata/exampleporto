import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../lib/icons";
import { Button } from "./ui";

const experience = [
  {
    role: "Project Administrator",
    company: "Meridian Studio",
    period: "2022 — Present",
    location: "Singapore",
    bullets: [
      "Coordinate 8–10 concurrent brand and product projects across design, copy, and development — consistently delivering 98% of milestones on time.",
      "Rebuilt the project tracking and weekly reporting rhythm, lifting on-time delivery from 76% to 98% in one quarter and removing roughly six hours of duplicate admin per week.",
      "Own documentation, vendor onboarding, budget tracking, and stakeholder comms for projects with budgets up to $2.4M.",
    ],
  },
  {
    role: "Operations Coordinator",
    company: "Northwind",
    period: "2021 — 2022",
    location: "Singapore",
    bullets: [
      "Supported a 20-person operations team across scheduling, procurement, and internal communications for three regional launches.",
      "Introduced a single source of truth for task tracking and a standard kickoff checklist, reducing project set-up time by 30%.",
    ],
  },
];

const skillGroups = [
  { label: "Project operations", items: ["Project coordination", "Scheduling & resourcing", "Risk & dependency tracking", "Budget admin", "Vendor management", "Documentation & SOPs"] },
  { label: "Tools", items: ["Notion", "Asana", "Jira", "ClickUp", "Monday", "Trello", "Slack", "Google Workspace", "Figma"] },
];

export function ResumeDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 80);

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled") && element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="resume-overlay fixed inset-0 z-[90] flex items-end justify-center overflow-y-auto bg-ink/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-dialog-title"
        onClick={(event) => event.stopPropagation()}
        className="resume-dialog tab-enter relative my-0 flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.6rem] border border-white/30 bg-paper shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] sm:my-4 sm:rounded-[1.6rem]"
      >
        <div className="no-print flex items-center justify-between gap-3 border-b border-ink/10 bg-paper/95 px-4 py-3 backdrop-blur sm:px-5">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-lime text-ink">
              <Icon name="file" size={13} />
            </span>
            <div>
              <p id="resume-dialog-title" className="text-[0.8rem] font-medium text-ink">
                Nadia Prameswari — Résumé
              </p>
              <p className="font-mono text-[7.5px] tracking-[0.12em] text-moss uppercase">
                Updated June 2026 · PDF ready
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              icon="printer"
              onClick={() => window.print()}
              className="hidden sm:inline-flex"
            >
              Print / Save PDF
            </Button>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close résumé preview"
              className="grid size-9 place-items-center rounded-full border border-ink/12 text-ink transition-colors hover:bg-cream"
            >
              <Icon name="x" size={16} />
            </button>
          </div>
        </div>

        <div className="resume-scroll overflow-y-auto overscroll-contain">
          <div className="print-sheet px-5 py-6 sm:px-9 sm:py-8">
            <div className="flex flex-col justify-between gap-4 border-b border-ink/15 pb-5 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-[9px] tracking-[0.16em] text-moss uppercase">
                  Project Administrator
                </p>
                <h2 className="mt-1.5 font-serif text-[2rem] leading-none tracking-[-0.02em] text-ink sm:text-[2.5rem]">
                  Nadia Prameswari
                </h2>
                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[8.5px] tracking-[0.06em] text-moss">
                  <span className="inline-flex items-center gap-1"><Icon name="mapPin" size={11} /> Singapore · GMT+8</span>
                  <span className="hidden size-1 rounded-full bg-ink/20 sm:block" />
                  <span className="inline-flex items-center gap-1"><Icon name="mail" size={11} /> hello@nadiaprojects.com</span>
                  <span className="hidden size-1 rounded-full bg-ink/20 sm:block" />
                  <span>linkedin.com/in/nadia-prameswari</span>
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-lime px-3 py-1.5 font-mono text-[8px] tracking-[0.1em] text-ink uppercase">
                <span className="size-1.5 rounded-full bg-ink" /> Available immediately
              </span>
            </div>

            <section className="mt-5">
              <h3 className="font-mono text-[8.5px] tracking-[0.16em] text-moss uppercase">Profile</h3>
              <p className="mt-2 max-w-[42rem] text-[0.82rem] leading-[1.7] text-ink/75">
                Project Administrator with four years of experience bringing structure to
                fast-moving creative and product teams. Known for calm ownership, immaculate
                documentation, and a delivery rhythm that makes deadlines feel predictable. Looking
                for a full-time Project Administrator role where the details matter.
              </p>
            </section>

            <div className="mt-6 grid gap-7 sm:grid-cols-12">
              <div className="sm:col-span-8">
                <h3 className="font-mono text-[8.5px] tracking-[0.16em] text-moss uppercase">Experience</h3>
                <div className="mt-3 space-y-5">
                  {experience.map((job) => (
                    <div key={job.company} className="border-l border-ink/15 pl-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="text-[0.9rem] font-medium tracking-[-0.01em] text-ink">{job.role}</h4>
                        <span className="font-mono text-[8px] tracking-[0.04em] text-moss">{job.period}</span>
                      </div>
                      <p className="mt-0.5 text-[0.76rem] font-medium text-moss">
                        {job.company} · {job.location}
                      </p>
                      <ul className="mt-2.5 space-y-1.5">
                        {job.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2 text-[0.75rem] leading-[1.62] text-ink/70">
                            <span className="mt-[0.42rem] size-1 shrink-0 rounded-full bg-clay" aria-hidden="true" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 sm:col-span-4">
                <div>
                  <h3 className="font-mono text-[8.5px] tracking-[0.16em] text-moss uppercase">Selected results</h3>
                  <div className="mt-3 space-y-3">
                    {[
                      { value: "98%", label: "Milestones on time" },
                      { value: "30+", label: "Projects coordinated" },
                      { value: "100%", label: "Weekly reports on time" },
                    ].map((result) => (
                      <div key={result.label} className="rounded-lg border border-ink/10 bg-cream/60 px-3 py-2.5">
                        <p className="text-[1.15rem] leading-none font-medium tracking-[-0.03em] text-ink">{result.value}</p>
                        <p className="mt-1 text-[0.68rem] text-moss">{result.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-[8.5px] tracking-[0.16em] text-moss uppercase">Education</h3>
                  <p className="mt-2 text-[0.76rem] font-medium text-ink">BA, Communication Science</p>
                  <p className="mt-0.5 text-[0.7rem] text-moss">Universitas Indonesia · 2019</p>
                  <p className="mt-2 text-[0.76rem] font-medium text-ink">Google Project Management Certificate</p>
                  <p className="mt-0.5 text-[0.7rem] text-moss">Coursera · 2023</p>
                </div>

                <div>
                  <h3 className="font-mono text-[8.5px] tracking-[0.16em] text-moss uppercase">References</h3>
                  <p className="mt-2 text-[0.73rem] leading-relaxed text-moss">
                    Three former managers available on request — including the Senior PM who
                    watched on-time delivery climb from 76% to 98%.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-ink/15 pt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <h3 className="font-mono text-[8.5px] tracking-[0.16em] text-moss uppercase">{group.label}</h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-ink/10 bg-cream/60 px-2 py-1 text-[0.65rem] text-ink/70"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-5 font-mono text-[7px] tracking-[0.1em] text-moss uppercase">
              References &amp; detailed case studies available on request · hello@nadiaprojects.com
            </p>
          </div>

          <div className="no-print flex flex-col gap-2 border-t border-ink/10 bg-paper px-5 py-4 sm:hidden">
            <Button
              variant="primary"
              size="md"
              icon="printer"
              onClick={() => window.print()}
              className="w-full"
            >
              Print / Save as PDF
            </Button>
            <p className="text-center text-[0.68rem] text-moss">
              Use your browser's print menu to save a PDF copy.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
