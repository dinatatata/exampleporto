import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";
import { Icon, type IconName } from "../lib/icons";

/** Serif italic emphasis used across display headings. */
export function Em({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("font-serif font-normal italic tracking-[-0.01em]", className)}>
      {children}
    </span>
  );
}

export function Delayed({ delay = 0, children }: { delay?: number; children: ReactNode }) {
  return (
    <div className="hero-rise" style={{ "--delay": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

export function revealDelay(index: number, step = 70): CSSProperties {
  return { "--reveal-delay": `${index * step}ms` } as CSSProperties;
}

export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex size-2 shrink-0 text-lime-deep", className)} aria-hidden="true">
      <span className="absolute inset-0 rounded-full bg-current opacity-60 pulse-dot" />
      <span className="relative inline-flex size-2 rounded-full bg-current" />
    </span>
  );
}

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[10.5px] font-normal tracking-[0.2em] uppercase sm:text-[11px]",
        tone === "dark" ? "text-cream/60" : "text-moss",
        className,
      )}
    >
      <span
        className={cn(
          "inline-block size-1.5 rounded-full",
          tone === "dark" ? "bg-lime" : "bg-ink",
        )}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className,
  titleClassName,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div data-reveal="fade">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </div>
      <h2
        data-reveal
        className={cn(
          "max-w-3xl text-[clamp(2.1rem,4.6vw,3.65rem)] leading-[1.02] font-medium tracking-[-0.04em]",
          tone === "dark" ? "text-cream" : "text-ink",
          titleClassName,
        )}
        style={revealDelay(1)}
      >
        {title}
      </h2>
      {description ? (
        <div
          data-reveal
          style={revealDelay(2)}
          className={cn(
            "max-w-xl text-[0.975rem] leading-[1.7] sm:text-[1.05rem]",
            tone === "dark" ? "text-cream/65" : "text-moss",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </div>
      ) : null}
    </div>
  );
}

type ButtonVariant = "primary" | "lime" | "outline" | "outlineDark" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName | null;
  className?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-cream shadow-[0_14px_30px_-16px_rgba(20,32,26,0.8)] hover:bg-forest hover:shadow-[0_18px_36px_-16px_rgba(20,32,26,0.65)]",
  lime:
    "bg-lime text-ink shadow-[0_14px_34px_-18px_rgba(215,239,130,0.9)] hover:bg-lime-soft hover:shadow-[0_18px_40px_-16px_rgba(215,239,130,0.55)]",
  outline:
    "border border-ink/15 bg-transparent text-ink hover:border-ink/35 hover:bg-paper/70",
  outlineDark:
    "border border-cream/20 bg-transparent text-cream hover:border-cream/40 hover:bg-white/[0.07]",
  ghost: "bg-transparent text-ink hover:bg-ink/[0.055]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 gap-2 px-4 text-[0.8125rem]",
  md: "h-12 gap-2.5 px-5 text-[0.9rem]",
  lg: "h-[3.35rem] gap-2.5 px-6 text-[0.95rem] sm:px-7",
};

function buttonClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(
    "group/btn relative inline-flex shrink-0 items-center justify-center rounded-full font-medium tracking-[-0.01em] transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = "arrowUpRight",
  className,
  type = "button",
  onClick,
  ...rest
}: ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: string;
  }) {
  const inner = (
    <>
      <span className="relative z-[2]">{children}</span>
      {icon ? (
        <Icon
          name={icon}
          size={16}
          className="relative z-[2] transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        />
      ) : null}
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
        className={buttonClasses(variant, size, className)}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {inner}
    </button>
  );
}

export function Counter({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1600,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(to * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function Avatar({
  initials,
  index = 0,
  className,
}: {
  initials: string;
  index?: number;
  className?: string;
}) {
  const palettes = [
    "bg-[#20382a] text-lime",
    "bg-[#e9dfc9] text-[#4d5c46]",
    "bg-[#d7ef82] text-[#20382a]",
    "bg-[#d8c1a9] text-[#4b3a2a]",
  ];
  return (
    <span
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 font-mono text-[11px] font-medium tracking-wide",
        palettes[index % palettes.length],
        className,
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function Pill({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "lime";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.7rem] font-medium tracking-wide",
        tone === "light" && "border border-ink/10 bg-paper/70 text-moss",
        tone === "dark" && "border border-white/12 bg-white/[0.06] text-cream/75",
        tone === "lime" && "bg-lime text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
