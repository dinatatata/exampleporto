import { useState } from "react";
import { Icon } from "../lib/icons";
import { Button, Em, SectionIntro, revealDelay } from "./ui";

const faqs = [
  {
    question: "Are you available immediately?",
    answer:
      "Yes — I'm available now and can start within two weeks, including time for a proper handover. If your timeline is tighter, say so and I'll do what I can to flex.",
  },
  {
    question: "Hybrid, remote, or on-site?",
    answer:
      "I'm based in Singapore (GMT+8) and set up for hybrid or fully remote work. I'm also open to relocation for the right long-term role. The details — including work authorisation — are best covered in a first call.",
  },
  {
    question: "What size teams and projects have you supported?",
    answer:
      "I've worked with teams of 5 to 50 across brand, product, and operations, on everything from a six-week identity launch to a year-long product rollout. Budgets I've tracked range from small retainers up to $2.4M.",
  },
  {
    question: "Which tools are you fluent in?",
    answer:
      "Notion, Asana, Jira, ClickUp, Monday, Trello, Slack, Google Workspace, Figma, and Sheets/Excel. I've also migrated teams between tools. If your stack is different, I'll be productive in it within the first week.",
  },
  {
    question: "What are your salary expectations?",
    answer:
      "I'd rather be a clear fit than a cheap hire, so I'm happy to discuss compensation openly on the first call. It's aligned to the scope of the role, the market for the location, and the level of ownership involved.",
  },
  {
    question: "Do you have experience with budgets and vendors?",
    answer:
      "Yes. I've managed vendor onboarding, purchase orders, budget tracking, and invoice reconciliation — and I've built the trackers that keep all of it visible. I'm comfortable being the person who follows up so nobody else has to.",
  },
  {
    question: "How do we start the interview process?",
    answer:
      "Send a note through the form below or email hello@nadiaprojects.com. I reply within one business day. We'll start with a 20-minute intro, then meet the hiring manager and team. My résumé and references are ready when you are.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="relative scroll-mt-24 bg-cream py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionIntro
              eyebrow="06 — Good questions"
              title={
                <>
                  Straight <Em>answers.</Em>
                </>
              }
              description="The things hiring managers usually ask before a first call. If yours isn't here, ask it directly — I'd rather over-communicate."
            />

            <div
              data-reveal
              style={revealDelay(3)}
              className="mt-8 rounded-[1.4rem] border border-ink/[0.09] bg-paper p-5"
            >
              <span className="grid size-10 place-items-center rounded-full bg-forest text-lime">
                <Icon name="mail" size={17} />
              </span>
              <p className="mt-4 text-[0.9rem] font-medium tracking-[-0.02em] text-ink">
                Still have a question?
              </p>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-moss">
                Email me directly — I answer every genuine message within one business day.
              </p>
              <Button href="mailto:hello@nadiaprojects.com" variant="outline" size="sm" className="mt-4" icon="arrowUpRight">
                hello@nadiaprojects.com
              </Button>
            </div>
          </div>

          <div className="lg:col-span-8" data-reveal style={revealDelay(1)}>
            <div className="border-t border-ink/12">
              {faqs.map((faq, index) => {
                const isOpen = open === index;
                return (
                  <div key={faq.question} className="border-b border-ink/12">
                    <h3>
                      <button
                        type="button"
                        id={`faq-trigger-${index}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        onClick={() => setOpen(isOpen ? null : index)}
                        className="group flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6"
                      >
                        <span className="flex items-start gap-3.5 sm:gap-5">
                          <span
                            className={`mt-0.5 font-mono text-[9px] tracking-[0.1em] transition-colors sm:text-[10px] ${
                              isOpen ? "text-ink" : "text-moss group-hover:text-moss"
                            }`}
                          >
                            0{index + 1}
                          </span>
                          <span
                            className={`text-[0.94rem] leading-snug font-medium tracking-[-0.015em] transition-colors sm:text-[1.02rem] ${
                              isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink"
                            }`}
                          >
                            {faq.question}
                          </span>
                        </span>
                        <span
                          className={`grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-300 sm:size-8 ${
                            isOpen
                              ? "border-ink bg-ink text-lime"
                              : "border-ink/15 bg-transparent text-ink group-hover:border-ink/35 group-hover:bg-paper"
                          }`}
                          aria-hidden="true"
                        >
                          <Icon name={isOpen ? "minus" : "plus"} size={13} />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      className="accordion-panel"
                      data-open={isOpen}
                    >
                      <div className="accordion-inner">
                        <p className="max-w-[40rem] pr-8 pb-6 pl-[1.9rem] text-[0.87rem] leading-[1.75] text-moss sm:pl-[2.6rem] sm:text-[0.9rem]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-5 flex items-center gap-2 font-mono text-[8.5px] tracking-[0.13em] text-moss uppercase">
              <Icon name="clock" size={12} /> Average reply time: under 4 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
