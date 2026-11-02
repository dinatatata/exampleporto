import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Icon } from "../lib/icons";
import { Button, Em, SectionIntro, StatusDot, revealDelay } from "./ui";

const EMAIL = "hello@nadiaprojects.com";

type FormValues = {
  name: string;
  email: string;
  company: string;
  role: string;
  window: string;
  message: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  role: "Full-time Project Administrator",
  window: "This week",
  message: "",
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

function fieldClass(hasError: boolean) {
  return `w-full rounded-xl border bg-white/70 px-3.5 py-3 text-[0.86rem] text-ink transition-all duration-200 placeholder:text-moss focus:bg-white focus:ring-2 focus:ring-lime/70 focus:outline-none ${
    hasError ? "border-[#b4513a]/60" : "border-ink/12 hover:border-ink/25 focus:border-ink/40"
  }`;
}

const labelClass = "mb-1.5 flex items-center gap-1 font-mono text-[8.5px] tracking-[0.13em] text-moss uppercase";

export function Contact({ onOpenResume }: { onOpenResume: () => void }) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const [copied, setCopied] = useState(false);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const copyTimer = useRef<number | undefined>(undefined);

  const updateField = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (values.name.trim().length < 2) nextErrors.name = "Please share your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      nextErrors.email = "Please use a valid work email.";
    if (values.company.trim().length < 2) nextErrors.company = "Which team are you hiring for?";
    if (!values.window) nextErrors.window = "Choose a preferred window.";

    setErrors(nextErrors);
    const firstInvalid = (["name", "email", "company", "window"] as const).find(
      (key) => nextErrors[key],
    );
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setSubmitted(values);
    window.setTimeout(() => successHeadingRef.current?.focus(), 80);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const mailtoHref = submitted
    ? `mailto:${EMAIL}?subject=${encodeURIComponent(
        `Interview request — ${submitted.role}`,
      )}&body=${encodeURIComponent(
        `Hi Nadia,\n\nI'd like to request an interview for a Project Administrator role.\n\nName: ${submitted.name}\nCompany: ${submitted.company}\nRole type: ${submitted.role}\nPreferred window: ${submitted.window}\n\n${submitted.message || "Looking forward to speaking."}\n\nBest,\n${submitted.name}`,
      )}`
    : `mailto:${EMAIL}`;

  return (
    <section
      id="contact"
      aria-label="Request a job interview"
      className="relative scroll-mt-24 overflow-hidden bg-cream py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[86rem] px-4 sm:px-8 lg:px-10">
        <div className="on-dark grain relative overflow-hidden rounded-[1.8rem] bg-forest px-5 py-10 text-cream shadow-[0_50px_100px_-60px_rgba(20,32,26,0.75)] sm:rounded-[2.2rem] sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-grid-dark opacity-35 [mask-image:radial-gradient(ellipse_at_20%_0%,black,transparent_75%)]" />
            <div className="absolute -top-32 -left-20 size-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(215,239,130,0.22),transparent_65%)] blur-3xl animate-drift" />
            <div className="absolute right-0 bottom-0 size-[22rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(169,106,69,0.25),transparent_70%)] blur-3xl" />
          </div>

          <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionIntro
                tone="dark"
                eyebrow="07 — One conversation"
                title={
                  <>
                    Let's schedule <Em className="text-lime">the interview.</Em>
                  </>
                }
                description="You've seen the systems, the proof, and the way I think. The next step is 20 minutes about your Project Administrator role — and whether I'm the calm your team is missing."
              />

              <div
                className="glass-dark mt-8 rounded-2xl p-4 sm:p-5"
                data-reveal
                style={revealDelay(3)}
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3.5">
                  <span className="inline-flex items-center gap-2 font-mono text-[8.5px] tracking-[0.13em] text-cream/65 uppercase">
                    <StatusDot className="text-lime" /> Current status
                  </span>
                  <span className="rounded-full bg-lime/15 px-2.5 py-1 font-mono text-[8px] tracking-[0.08em] text-lime uppercase">
                    Open to work
                  </span>
                </div>
                <dl className="mt-1">
                  {[
                    { icon: "briefcase" as const, label: "Looking for", value: "Project Administrator · Full-time" },
                    { icon: "calendar" as const, label: "Availability", value: "Immediate · 20-min intro calls this week" },
                    { icon: "clock" as const, label: "Reply time", value: "Within 1 business day · GMT+8" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start gap-3 border-b border-white/[0.07] py-3 last:border-0 last:pb-0">
                      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-lime">
                        <Icon name={row.icon} size={13} />
                      </span>
                      <div className="min-w-0">
                        <dt className="font-mono text-[7.5px] tracking-[0.13em] text-cream/70 uppercase">
                          {row.label}
                        </dt>
                        <dd className="mt-0.5 text-[0.78rem] leading-snug text-cream/80">{row.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-5 flex flex-col gap-2" data-reveal style={revealDelay(4)}>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group inline-flex min-w-0 flex-1 items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.08]"
                  >
                    <Icon name="mail" size={15} className="shrink-0 text-lime" />
                    <span className="truncate text-[0.78rem] text-cream/75 group-hover:text-cream">
                      {EMAIL}
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-[0.72rem] text-cream/60 transition-colors hover:border-white/25 hover:text-cream"
                    aria-label="Copy email address"
                  >
                    <Icon name={copied ? "check" : "copy"} size={14} />
                    <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
                  </button>
                  <span className="sr-only" aria-live="polite">
                    {copied ? "Email address copied to clipboard." : ""}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://www.linkedin.com/in/nadia-prameswari"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-[0.72rem] text-cream/60 transition-colors hover:border-white/25 hover:text-cream"
                  >
                    <Icon name="linkedin" size={13} /> LinkedIn
                  </a>
                  <button
                    type="button"
                    onClick={onOpenResume}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-[0.72rem] text-cream/60 transition-colors hover:border-white/25 hover:text-cream"
                  >
                    <Icon name="file" size={13} /> Preview résumé
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7" data-reveal="right" style={revealDelay(1, 80)}>
              <div className="on-light rounded-[1.5rem] border border-white/40 bg-paper p-5 text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink/10 pb-5">
                  <div>
                    <p className="flex items-center gap-2 font-mono text-[8.5px] tracking-[0.15em] text-moss uppercase">
                      <Icon name="calendar" size={12} /> Interview request
                    </p>
                    <h3 className="mt-2 text-[1.2rem] font-medium tracking-[-0.03em] text-ink sm:text-[1.35rem]">
                      {submitted ? "One last step." : "Tell me about the role."}
                    </h3>
                  </div>
                  <span className="rounded-full border border-ink/10 bg-cream px-2.5 py-1.5 font-mono text-[8px] tracking-[0.1em] text-moss uppercase">
                    20 min · No hard sell
                  </span>
                </div>

                {submitted ? (
                  <div className="tab-enter pt-6" aria-live="polite">
                    <span className="grid size-11 place-items-center rounded-full bg-lime text-ink">
                      <Icon name="check" size={20} />
                    </span>
                    <h4
                      ref={successHeadingRef}
                      tabIndex={-1}
                      className="mt-4 text-[1.35rem] leading-tight font-medium tracking-[-0.03em] text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                      Your note is drafted, {submitted.name.trim().split(" ")[0]}.
                    </h4>
                    <p className="mt-2 max-w-md text-[0.85rem] leading-[1.7] text-moss">
                      Your interview request for the{" "}
                      <span className="font-medium text-ink">{submitted.role}</span> at{" "}
                      <span className="font-medium text-ink">{submitted.company}</span> is ready to
                      send. I reply within one business day — usually much sooner.
                    </p>

                    <div className="mt-5 grid gap-2 rounded-xl border border-ink/10 bg-cream/60 p-4 text-[0.76rem] sm:grid-cols-2">
                      <p className="text-moss">
                        <span className="font-mono text-[7.5px] tracking-[0.1em] text-moss uppercase">From</span>
                        <br />
                        <span className="text-ink">{submitted.email}</span>
                      </p>
                      <p className="text-moss">
                        <span className="font-mono text-[7.5px] tracking-[0.1em] text-moss uppercase">Preferred window</span>
                        <br />
                        <span className="text-ink">{submitted.window}</span>
                      </p>
                    </div>

                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                      <Button href={mailtoHref} variant="primary" size="md" icon="mail" className="sheen flex-1">
                        Send my interview request
                      </Button>
                      <Button
                        variant="outline"
                        size="md"
                        icon={null}
                        onClick={() => setSubmitted(null)}
                      >
                        Edit details
                      </Button>
                    </div>
                    <p className="mt-3 text-[0.7rem] leading-relaxed text-moss">
                      This opens your email client with everything filled in. Prefer to skip it?
                      Email{" "}
                      <a href={`mailto:${EMAIL}`} className="underline underline-offset-2 hover:text-ink">
                        {EMAIL}
                      </a>
                      .
                    </p>
                  </div>
                ) : (
                  <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className={labelClass}>
                          Your name <span className="text-clay" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          value={values.name}
                          onChange={updateField}
                          autoComplete="name"
                          placeholder="Jordan Lee"
                          required
                          aria-required="true"
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? "contact-name-error" : undefined}
                          className={fieldClass(Boolean(errors.name))}
                        />
                        {errors.name && (
                          <p id="contact-name-error" className="mt-1.5 text-[0.7rem] text-[#a1462f]">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="contact-email" className={labelClass}>
                          Work email <span className="text-clay" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          inputMode="email"
                          value={values.email}
                          onChange={updateField}
                          autoComplete="email"
                          placeholder="jordan@company.com"
                          required
                          aria-required="true"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? "contact-email-error" : undefined}
                          className={fieldClass(Boolean(errors.email))}
                        />
                        {errors.email && (
                          <p id="contact-email-error" className="mt-1.5 text-[0.7rem] text-[#a1462f]">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-company" className={labelClass}>
                          Company / team <span className="text-clay" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-company"
                          name="company"
                          type="text"
                          value={values.company}
                          onChange={updateField}
                          autoComplete="organization"
                          placeholder="Meridian Studio"
                          required
                          aria-required="true"
                          aria-invalid={Boolean(errors.company)}
                          aria-describedby={errors.company ? "contact-company-error" : undefined}
                          className={fieldClass(Boolean(errors.company))}
                        />
                        {errors.company && (
                          <p id="contact-company-error" className="mt-1.5 text-[0.7rem] text-[#a1462f]">
                            {errors.company}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="contact-role" className={labelClass}>
                          Role type
                        </label>
                        <div className="relative">
                          <select
                            id="contact-role"
                            name="role"
                            value={values.role}
                            onChange={updateField}
                            className={`${fieldClass(false)} appearance-none pr-9`}
                          >
                            <option>Full-time Project Administrator</option>
                            <option>Fixed-term project support</option>
                            <option>Part-time / fractional</option>
                            <option>Something else — let's discuss</option>
                          </select>
                          <Icon
                            name="chevronDown"
                            size={14}
                            className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-moss"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-window" className={labelClass}>
                        Preferred interview window <span className="text-clay" aria-hidden="true">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="contact-window"
                          name="window"
                          value={values.window}
                          onChange={updateField}
                          required
                          aria-required="true"
                          aria-invalid={Boolean(errors.window)}
                          aria-describedby={errors.window ? "contact-window-error" : undefined}
                          className={`${fieldClass(Boolean(errors.window))} appearance-none pr-9`}
                        >
                          <option>This week</option>
                          <option>Next week</option>
                          <option>Within 30 days</option>
                          <option>Flexible — work around the team</option>
                        </select>
                        <Icon
                          name="chevronDown"
                          size={14}
                          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-moss"
                        />
                      </div>
                      {errors.window && (
                        <p id="contact-window-error" className="mt-1.5 text-[0.7rem] text-[#a1462f]">
                          {errors.window}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-message" className={labelClass}>
                        Anything I should know? <span className="normal-case opacity-60">optional</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={3}
                        value={values.message}
                        onChange={updateField}
                        placeholder="A little about the role, the team, and what would make this a great hire…"
                        className={`${fieldClass(false)} resize-none`}
                      />
                    </div>

                    <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                      <Button type="submit" size="lg" icon="arrowUpRight" className="sheen w-full flex-1 sm:w-auto">
                        Request an interview
                      </Button>
                      <p className="flex items-center gap-1.5 text-[0.7rem] leading-snug text-moss">
                        <Icon name="shield" size={13} className="shrink-0" />
                        Your details stay between us. No newsletters, ever.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
