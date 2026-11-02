import { useEffect, useState } from "react";
import { Icon } from "../lib/icons";
import { StatusDot } from "./ui";

const exploreLinks = [
  { label: "Strengths", href: "#strengths" },
  { label: "The work", href: "#work" },
  { label: "First 30 days", href: "#onboarding" },
  { label: "Reviews", href: "#reviews" },
];

const moreLinks = [
  { label: "Availability", href: "#availability" },
  { label: "FAQ", href: "#faq" },
  { label: "Interview request", href: "#contact" },
];

function useSingaporeTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Singapore",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    update();
    const interval = window.setInterval(update, 30000);
    return () => window.clearInterval(interval);
  }, []);
  return time;
}

export function Footer({ onOpenResume }: { onOpenResume: () => void }) {
  const time = useSingaporeTime();

  return (
    <footer className="on-dark grain relative overflow-hidden bg-[#0f1a14] pt-16 text-cream sm:pt-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-dark opacity-25 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]" />
        <div className="absolute -top-40 left-1/4 size-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(215,239,130,0.13),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 border-b border-white/10 pb-12 sm:pb-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <a href="#top" className="group inline-flex items-center gap-3" aria-label="Nadia Prameswari — back to top">
              <span className="relative grid size-11 place-items-center overflow-hidden rounded-[0.9rem] bg-cream text-ink transition-transform duration-500 group-hover:-rotate-6">
                <span className="font-serif text-[1.4rem] leading-none italic">n</span>
                <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-forest" aria-hidden="true" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[1rem] font-semibold tracking-[-0.025em] text-cream">Nadia Prameswari</span>
                <span className="mt-1 font-mono text-[8.5px] tracking-[0.16em] text-cream/60 uppercase">
                  Project Administrator
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-[0.9rem] leading-[1.7] text-cream/55">
              Clear plans. Calm teams. On-time delivery. Looking for a full-time Project
              Administrator role in a team that cares about the details.
            </p>
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2">
              <StatusDot className="text-lime" />
              <span className="font-mono text-[8.5px] tracking-[0.13em] text-cream/70 uppercase">
                Open to work · Immediate start
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
            <nav aria-label="Footer — explore">
              <h2 className="font-mono text-[8px] tracking-[0.18em] text-cream/55 uppercase">Explore</h2>
              <ul className="mt-4 space-y-2.5">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-[0.8rem] text-cream/60 transition-colors hover:text-cream"
                    >
                      {link.label}
                      <Icon
                        name="arrowUpRight"
                        size={11}
                        className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-60"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer — more">
              <h2 className="font-mono text-[8px] tracking-[0.18em] text-cream/55 uppercase">More</h2>
              <ul className="mt-4 space-y-2.5">
                {moreLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-[0.8rem] text-cream/60 transition-colors hover:text-cream"
                    >
                      {link.label}
                      <Icon
                        name="arrowUpRight"
                        size={11}
                        className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-60"
                      />
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={onOpenResume}
                    className="inline-flex items-center gap-1 text-[0.8rem] text-cream/60 transition-colors hover:text-cream"
                  >
                    Résumé
                  </button>
                </li>
              </ul>
            </nav>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="font-mono text-[8px] tracking-[0.18em] text-cream/55 uppercase">Say hello</h2>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href="mailto:hello@nadiaprojects.com"
                    className="inline-flex items-center gap-2 text-[0.8rem] text-cream/60 transition-colors hover:text-cream"
                  >
                    <Icon name="mail" size={13} /> Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/nadia-prameswari"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-[0.8rem] text-cream/60 transition-colors hover:text-cream"
                  >
                    <Icon name="linkedin" size={13} /> LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-[0.8rem] text-cream/60 transition-colors hover:text-cream"
                  >
                    <Icon name="calendar" size={13} /> Book a call
                  </a>
                </li>
              </ul>
              <div className="mt-5 flex items-center gap-2 font-mono text-[8px] tracking-[0.1em] text-cream/55 uppercase">
                <Icon name="clock" size={11} />
                <span>{time ? `${time} SGT` : "GMT+8"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative py-8">
          <p className="font-serif text-[clamp(2.6rem,8.6vw,7rem)] leading-[0.9] tracking-[-0.035em] text-cream">
            Nadia <span className="italic text-lime">Prameswari</span>
            <span className="text-lime">.</span>
          </p>
          <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p className="font-mono text-[8px] tracking-[0.12em] text-cream/55 uppercase">
              © 2026 Nadia Prameswari · Built with care, coffee &amp; a very tidy Notion
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:hello@nadiaprojects.com"
                className="font-mono text-[8px] tracking-[0.12em] text-cream/60 uppercase transition-colors hover:text-cream"
              >
                hello@nadiaprojects.com
              </a>
              <a
                href="#top"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1.5 font-mono text-[8px] tracking-[0.1em] text-cream/55 uppercase transition-colors hover:border-white/25 hover:text-cream"
              >
                Back to top
                <Icon name="arrowUp" size={11} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
