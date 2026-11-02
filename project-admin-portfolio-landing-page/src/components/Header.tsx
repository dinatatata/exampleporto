import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { Icon } from "../lib/icons";
import { Button, StatusDot } from "./ui";

const navItems = [
  { label: "Strengths", href: "#strengths" },
  { label: "The work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "Availability", href: "#availability" },
  { label: "FAQ", href: "#faq" },
];

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="#top"
      className="group inline-flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4"
      aria-label="Nadia Prameswari — back to top"
    >
      <span className="relative grid size-10 place-items-center overflow-hidden rounded-[0.8rem] bg-ink text-cream transition-transform duration-500 group-hover:-rotate-6">
        <span className="font-serif text-[1.3rem] leading-none italic">n</span>
        <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-lime" aria-hidden="true" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[0.94rem] font-semibold tracking-[-0.025em] text-ink">
            Nadia Prameswari
          </span>
          <span className="mt-1 font-mono text-[9px] tracking-[0.17em] text-moss uppercase">
            Project Administrator
          </span>
        </span>
      )}
    </a>
  );
}

export function Header({
  onOpenResume,
  menuOpen,
  setMenuOpen,
}: {
  onOpenResume: () => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("");
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 16);
      setProgress(height > 0 ? Math.min(scrollTop / height, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-38% 0px -52% 0px", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    window.setTimeout(() => menuButtonRef.current?.focus({ preventScroll: true }), 60);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMenuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 120);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent" aria-hidden="true">
        <div
          className="h-full origin-left bg-gradient-to-r from-lime-deep via-lime to-clay transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-all duration-500",
          scrolled
            ? "border-b border-ink/[0.07] bg-cream/85 shadow-[0_12px_40px_-30px_rgba(20,32,26,0.5)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[86rem] items-center justify-between gap-6 px-5 sm:px-8 lg:h-20 lg:px-10">
          <Logo />

          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? "page" : undefined}
                className={cn(
                  "underline-grow text-[0.83rem] font-medium tracking-[-0.005em] transition-colors duration-300",
                  active === item.href ? "text-ink" : "text-moss hover:text-ink",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <span className="mr-1 hidden items-center gap-2 xl:inline-flex">
              <StatusDot className="text-[#6b8a3f]" />
              <span className="font-mono text-[10px] tracking-[0.12em] text-moss uppercase">
                Open to work
              </span>
            </span>
            <button
              type="button"
              onClick={onOpenResume}
              className="hidden size-10 place-items-center rounded-full border border-ink/12 text-ink transition-all duration-300 hover:border-ink/25 hover:bg-paper md:grid"
              aria-label="Preview Nadia's résumé"
            >
              <Icon name="file" size={17} />
            </button>
            <Button href="#contact" size="md" className="hidden sm:inline-flex">
              Book an interview
            </Button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-full border border-ink/12 bg-paper/60 text-ink transition-colors hover:bg-paper lg:hidden"
            >
              <Icon name={menuOpen ? "x" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[55] flex flex-col bg-cream px-6 pt-24 pb-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-3 opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-lime/30 blur-[90px]" aria-hidden="true" />
        <nav aria-label="Mobile navigation" className="relative flex flex-col">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={item.href}
              onClick={closeMenu}
              className="group flex items-center justify-between border-b border-ink/10 py-4 transition-colors hover:text-ink"
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className="flex items-baseline gap-4">
                <span className="font-mono text-[10px] text-moss">0{index + 1}</span>
                <span className="text-[1.7rem] font-medium tracking-[-0.03em]">{item.label}</span>
              </span>
              <Icon
                name="arrowUpRight"
                size={20}
                className="text-moss transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </nav>

        <div className="relative mt-auto space-y-4 pt-8">
          <div className="flex items-center gap-2.5">
            <StatusDot className="text-[#6b8a3f]" />
            <span className="font-mono text-[10px] tracking-[0.14em] text-moss uppercase">
              Available immediately · GMT+8
            </span>
          </div>
          <Button href="#contact" size="lg" className="w-full" onClick={closeMenu}>
            Schedule an interview
          </Button>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onOpenResume();
            }}
            className="flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-moss"
            tabIndex={menuOpen ? 0 : -1}
          >
            <Icon name="file" size={15} /> Preview résumé
          </button>
          <div className="flex items-center justify-between border-t border-ink/10 pt-5">
            <a
              href="mailto:hello@nadiaprojects.com"
              className="text-[0.8rem] text-moss underline-grow"
              tabIndex={menuOpen ? 0 : -1}
            >
              hello@nadiaprojects.com
            </a>
            <a
              href="https://www.linkedin.com/in/nadia-prameswari"
              target="_blank"
              rel="noreferrer noopener"
              className="grid size-10 place-items-center rounded-full border border-ink/12 text-ink"
              aria-label="Nadia on LinkedIn"
              tabIndex={menuOpen ? 0 : -1}
            >
              <Icon name="linkedin" size={16} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
