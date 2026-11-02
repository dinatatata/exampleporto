import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SocialProof } from "./components/SocialProof";
import { Strengths } from "./components/Strengths";
import { WorkShowcase } from "./components/WorkShowcase";
import { FirstThirtyDays } from "./components/FirstThirtyDays";
import { Testimonials } from "./components/Testimonials";
import { Availability } from "./components/Availability";
import { Faq } from "./components/Faq";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ResumeDialog } from "./components/ResumeDialog";
import { Button, StatusDot } from "./components/ui";

function MobileInterviewBar({ hidden }: { hidden: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      const contactTop = contact
        ? contact.getBoundingClientRect().top + window.scrollY
        : Number.POSITIVE_INFINITY;
      const reached = window.scrollY > 680;
      const approachingContact = window.scrollY + window.innerHeight > contactTop - 120;
      setVisible(reached && !approachingContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!visible || hidden) return null;

  return (
    <div className="hero-rise fixed inset-x-3 bottom-3 z-40 lg:hidden">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-paper/90 p-2 shadow-[0_18px_50px_-20px_rgba(20,32,26,0.45)] backdrop-blur-xl">
        <div className="flex min-w-0 items-center gap-2.5 pl-1.5">
          <StatusDot className="text-[#6b8a3f]" />
          <div className="min-w-0">
            <p className="font-mono text-[7.5px] tracking-[0.13em] text-moss uppercase">Open to work</p>
            <p className="truncate text-[0.74rem] font-medium text-ink">Project Administrator</p>
          </div>
        </div>
        <Button href="#contact" size="sm" className="shrink-0">
          Interview
        </Button>
      </div>
    </div>
  );
}

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openResume = useCallback(() => {
    setMenuOpen(false);
    setResumeOpen(true);
  }, []);

  const closeResume = useCallback(() => setResumeOpen(false), []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-cream">
      <a
        href="#main"
        className="fixed top-4 left-4 z-[100] -translate-y-24 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-cream transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <Header onOpenResume={openResume} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main id="main" tabIndex={-1}>
        <Hero onOpenResume={openResume} />
        <SocialProof />
        <Strengths />
        <WorkShowcase />
        <FirstThirtyDays />
        <Testimonials />
        <Availability />
        <Faq />
        <Contact onOpenResume={openResume} />
      </main>

      <Footer onOpenResume={openResume} />
      <MobileInterviewBar hidden={menuOpen || resumeOpen} />
      <ResumeDialog open={resumeOpen} onClose={closeResume} />
    </div>
  );
}
