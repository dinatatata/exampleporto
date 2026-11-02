import type { ReactNode } from "react";
import { Icon, type IconName } from "../lib/icons";

type Partner = { name: string; icon: IconName; className: string };

const partners: Partner[] = [
  { name: "Meridian Studio", icon: "layers", className: "font-serif italic text-[1.45rem] tracking-[-0.01em]" },
  { name: "NORTHWIND", icon: "zap", className: "font-mono text-[0.78rem] tracking-[0.19em]" },
  { name: "Lumina", icon: "sparkle", className: "text-[1.15rem] font-semibold tracking-[-0.04em]" },
  { name: "fieldwork", icon: "target", className: "font-mono text-[0.95rem] tracking-[-0.02em]" },
  { name: "Atlas & Co.", icon: "shield", className: "font-serif text-[1.35rem] tracking-[-0.02em]" },
  { name: "Paperplane", icon: "workflow", className: "text-[1.1rem] font-medium tracking-[-0.03em]" },
];

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden ? "true" : undefined}
      aria-label={hidden ? undefined : "Teams and partners Nadia has supported"}
    >
      {partners.map((partner) => (
        <li
          key={partner.name}
          className="mx-7 flex items-center gap-2.5 text-ink/45 transition-colors duration-300 hover:text-ink sm:mx-10 sm:gap-3"
        >
          <Icon name={partner.icon} size={19} className="shrink-0 opacity-80" />
          <span className={partner.className}>{partner.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function SocialProof() {
  return (
    <section
      className="relative border-b border-ink/[0.07] bg-cream py-9 sm:py-11"
      aria-label="Social proof and trusted teams"
    >
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <div className="mb-6 flex items-center gap-5 sm:mb-7">
          <span className="h-px flex-1 bg-ink/10" aria-hidden="true" />
          <p className="shrink-0 text-center font-mono text-[9.5px] tracking-[0.2em] text-moss uppercase sm:text-[10px]">
            Teams &amp; partners I've supported
          </p>
          <span className="h-px flex-1 bg-ink/10" aria-hidden="true" />
        </div>

        <div className="marquee fade-edges relative -mx-5 overflow-hidden sm:mx-0">
          <div className="marquee-track items-center">
            <LogoRow />
            <LogoRow hidden />
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.72rem] text-moss sm:text-[0.76rem]">
          {[
            "12+ repeat collaborations",
            "4.9/5 collaboration rating",
            "References available on request",
          ].map((item, index) => (
            <span key={item} className="inline-flex items-center gap-2">
              {index === 0 ? (
                <Icon name="check" size={13} className="text-ink/50" />
              ) : index === 1 ? (
                <Icon name="sparkle" size={13} className="text-ink/50" />
              ) : (
                <Icon name="mail" size={13} className="text-ink/50" />
              )}
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProofNote({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[10px] tracking-[0.16em] text-moss uppercase">{children}</p>;
}
