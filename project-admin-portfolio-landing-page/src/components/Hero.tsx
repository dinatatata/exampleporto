import type { CSSProperties } from "react";
import { Icon } from "../lib/icons";
import { Button, Counter, Em, StatusDot, revealDelay } from "./ui";

const stats = [
  { value: 4, suffix: "+", label: "Years in project ops", note: "Studios & agencies" },
  { value: 30, suffix: "+", label: "Projects coordinated", note: "Kickoff to close-out" },
  { value: 98, suffix: "%", label: "Milestones on time", note: "Across the last 4 quarters" },
  { value: 2.4, prefix: "$", suffix: "M", decimals: 1, label: "Budgets kept in check", note: "Vendors & resourcing" },
];

function RotatingBadge() {
  return (
    <a
      href="#contact"
      className="group absolute -top-5 right-1 z-30 grid size-[5.7rem] place-items-center rounded-full bg-lime text-ink shadow-[0_18px_36px_-18px_rgba(20,32,26,0.6)] transition-transform duration-500 hover:scale-105 sm:-top-7 sm:-right-4 sm:size-[6.7rem]"
      aria-label="Open to work — jump to the interview request form"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
        </defs>
        <text className="fill-ink font-mono text-[8px] tracking-[0.2em] uppercase">
          <textPath href="#badge-circle">
            Open to work · Let's talk · Open to work · Let's talk ·
          </textPath>
        </text>
      </svg>
      <span className="grid size-9 place-items-center rounded-full bg-ink text-lime transition-transform duration-500 group-hover:rotate-45 sm:size-10">
        <Icon name="arrowUpRight" size={17} />
      </span>
    </a>
  );
}

export function Hero({ onOpenResume }: { onOpenResume: () => void }) {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 size-[42rem] rounded-full bg-[radial-gradient(circle_at_center,#e6f5bd_0%,rgba(230,245,189,0.35)_45%,transparent_70%)] opacity-80 blur-2xl animate-drift" />
        <div className="absolute top-1/3 -left-48 size-[30rem] rounded-full bg-[radial-gradient(circle_at_center,#ead8c4_0%,transparent_68%)] opacity-70 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-[46rem] bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_55%_20%,black,transparent_72%)]" />
      </div>

      <div className="relative mx-auto max-w-[86rem] px-5 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div className="lg:col-span-7 xl:pr-4">
            <div className="hero-rise flex flex-wrap items-center gap-2" style={{ "--delay": "0ms" } as CSSProperties}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-paper/70 py-1.5 pr-4 pl-2.5 shadow-[0_6px_18px_-14px_rgba(20,32,26,0.5)] backdrop-blur">
                <span className="grid size-6 place-items-center rounded-full bg-lime">
                  <StatusDot className="text-ink" />
                </span>
                <span className="font-mono text-[10px] font-normal tracking-[0.14em] text-ink uppercase">
                  Open to Project Admin roles
                </span>
              </span>
              <span className="hidden h-4 w-px bg-ink/15 sm:block" aria-hidden="true" />
              <span className="hidden font-mono text-[10px] tracking-[0.14em] text-moss uppercase sm:block">
                Immediate start
              </span>
            </div>

            <h1
              id="hero-heading"
              className="hero-rise mt-7 text-[clamp(2.75rem,7vw,5rem)] leading-[0.97] font-medium tracking-[-0.045em] text-ink"
              style={{ "--delay": "90ms" } as CSSProperties}
            >
              Clear plans.
              <br />
              Calm teams.
              <br />
              <span className="relative inline-block">
                <Em className="relative z-10 text-forest">On-time delivery.</Em>
                <svg
                  viewBox="0 0 340 18"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 z-0 h-3 w-full text-lime-deep/80 sm:-bottom-2.5"
                  aria-hidden="true"
                >
                  <path
                    d="M3 13C70 4 156 3 337 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <div
              className="hero-rise mt-9 max-w-[34rem]"
              style={{ "--delay": "190ms" } as CSSProperties}
            >
              <p className="text-[1.02rem] leading-[1.72] text-moss sm:text-[1.11rem]">
                I'm Nadia — a Project Administrator who turns scattered briefs into clear plans,
                tidy documentation, and launches that land on time. Four years keeping ambitious
                teams calm. Now looking for the right one.
              </p>
            </div>

            <div
              className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ "--delay": "280ms" } as CSSProperties}
            >
              <Button href="#contact" size="lg" className="sheen">
                Schedule an interview
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon="file"
                onClick={onOpenResume}
                className="bg-paper/40 backdrop-blur"
              >
                Preview my résumé
              </Button>
            </div>

            <div
              className="hero-rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[0.78rem] text-moss"
              style={{ "--delay": "360ms" } as CSSProperties}
            >
              <span className="inline-flex items-center gap-1.5">
                <Icon name="mapPin" size={14} className="text-ink/60" />
                Singapore · Remote / hybrid
              </span>
              <span className="hidden size-1 rounded-full bg-ink/20 sm:block" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5">
                <Icon name="clock" size={14} className="text-ink/60" />
                GMT+8 · Replies within 24h
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[24rem] sm:max-w-[26rem] lg:col-span-5 lg:max-w-[29rem] xl:max-w-[31rem]">
            <div
              className="absolute -inset-3 -z-10 rounded-[2.6rem] border border-ink/[0.07] sm:-inset-4"
              aria-hidden="true"
            />
            <div
              className="absolute -right-5 -bottom-7 -z-10 size-44 rounded-full bg-lime/50 blur-[60px]"
              aria-hidden="true"
            />
            <div
              className="hero-rise relative rounded-[1.9rem] border border-white/25 bg-forest p-2.5 shadow-[0_40px_80px_-40px_rgba(20,32,26,0.7)] sm:rounded-[2.2rem] sm:p-3"
              style={{ "--delay": "220ms" } as CSSProperties}
            >
              <RotatingBadge />
              <div className="relative overflow-hidden rounded-[1.4rem] sm:rounded-[1.65rem]">
                <img
                  src="/images/nadia-portrait.jpg"
                  alt="Portrait of Nadia Prameswari, Project Administrator"
                  width={960}
                  height={1200}
                  fetchPriority="high"
                  className="aspect-[4/5] w-full object-cover object-[center_22%] transition-transform duration-[1.6s] ease-out hover:scale-[1.025]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d1711]/75 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-3 rounded-[1.1rem] border border-white/15 bg-white/[0.09] px-3.5 py-3 backdrop-blur-md sm:inset-x-3 sm:bottom-3 sm:px-4">
                  <div className="min-w-0">
                    <p className="truncate text-[0.88rem] font-medium text-cream">Nadia Prameswari</p>
                    <p className="mt-0.5 truncate font-mono text-[9px] tracking-[0.12em] text-cream/60 uppercase">
                      Project Administrator
                    </p>
                  </div>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-lime text-ink">
                    <Icon name="arrowUpRight" size={15} />
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-light animate-floaty absolute -bottom-7 -left-3 hidden w-[12.7rem] rounded-2xl p-3.5 sm:block lg:-left-9">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8.5px] tracking-[0.16em] text-moss uppercase">
                  On-time delivery
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-lime px-1.5 py-0.5 font-mono text-[8.5px] text-ink">
                  <Icon name="arrowUp" size={9} /> 22%
                </span>
              </div>
              <p className="mt-1.5 text-[1.65rem] leading-none font-medium tracking-[-0.04em] text-ink">
                98<span className="text-[1rem]">%</span>
              </p>
              <div className="mt-3 flex h-7 items-end gap-1" aria-hidden="true">
                {[38, 52, 46, 68, 60, 82, 74, 96].map((height, index) => (
                  <span
                    key={index}
                    className={`flex-1 rounded-[2px] ${index > 5 ? "bg-ink" : "bg-ink/15"}`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="glass-light animate-floaty-slow absolute top-[26%] -right-2 hidden items-center gap-2 rounded-full py-2 pr-3.5 pl-2 md:flex lg:-right-6">
              <span className="grid size-7 place-items-center rounded-full bg-ink text-lime">
                <Icon name="check" size={14} />
              </span>
              <span className="text-[0.7rem] font-medium text-ink">6 milestones cleared</span>
            </div>
          </div>
        </div>

        <div className="mt-16 border-y border-ink/12 sm:mt-20">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                data-reveal
                style={revealDelay(index, 90)}
                className="group relative border-ink/10 py-6 pr-4 sm:border-r sm:px-6 sm:py-7 sm:first:pl-0 sm:last:border-r-0 [&:nth-child(-n+2)]:border-b sm:[&:nth-child(-n+2)]:border-b-0 [&:nth-child(odd)]:pr-3 sm:[&:nth-child(odd)]:pr-6"
              >
                <p className="flex items-baseline text-[1.9rem] leading-none font-medium tracking-[-0.045em] text-ink sm:text-[2.15rem]">
                  <Counter
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                  />
                  <span className="ml-1.5 size-1.5 rounded-full bg-lime-deep opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                </p>
                <p className="mt-2 text-[0.78rem] font-medium text-ink sm:text-[0.82rem]">{stat.label}</p>
                <p className="mt-1 hidden text-[0.7rem] text-moss sm:block">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
