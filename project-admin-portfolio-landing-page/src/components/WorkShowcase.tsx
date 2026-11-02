import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { Icon, type IconName } from "../lib/icons";
import { Button, Em, SectionIntro, StatusDot, revealDelay } from "./ui";

type TabId = "tracker" | "report" | "playbook";

const tabs: { id: TabId; label: string; icon: IconName }[] = [
  { id: "tracker", label: "Project tracker", icon: "target" },
  { id: "report", label: "Weekly report", icon: "chart" },
  { id: "playbook", label: "The playbook", icon: "folder" },
];

const tasks = [
  { task: "Finalise design system", owner: "Mira K.", due: "Jun 12", status: "Done", tone: "done" },
  { task: "Stakeholder review", owner: "Nadia", due: "Jun 14", status: "In review", tone: "active" },
  { task: "Vendor handoff", owner: "Leo T.", due: "Jun 16", status: "In progress", tone: "progress" },
  { task: "Launch comms", owner: "You", due: "Jun 18", status: "Queued", tone: "queued" },
] as const;

const reportBars = [
  { week: "W19", value: 68 },
  { week: "W20", value: 76 },
  { week: "W21", value: 72 },
  { week: "W22", value: 85 },
  { week: "W23", value: 91 },
  { week: "W24", value: 98 },
];

const docs = [
  { title: "Kickoff checklist", meta: "12 steps · 4 min read", tag: "Checklist" },
  { title: "Weekly status template", meta: "8 sections · 2 min read", tag: "Template" },
  { title: "Vendor onboarding SOP", meta: "9 steps · 6 min read", tag: "SOP" },
  { title: "Risk log & escalation", meta: "6 rules · 3 min read", tag: "Playbook" },
];

function PanelHeader({
  icon,
  title,
  subtitle,
  right,
}: {
  icon: IconName;
  title: string;
  subtitle: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/[0.05] text-lime">
          <Icon name={icon} size={15} />
        </span>
        <div>
          <p className="text-[0.82rem] leading-tight font-medium text-cream">{title}</p>
          <p className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-cream/60 uppercase sm:text-[8.5px]">
            {subtitle}
          </p>
        </div>
      </div>
      {right}
    </div>
  );
}

function TrackerPanel() {
  return (
    <div className="tab-enter">
      <PanelHeader
        icon="folder"
        title="Lantern rebrand"
        subtitle="Phase 02 · 12 tasks · 4 owners"
        right={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/25 bg-lime/10 px-2.5 py-1 font-mono text-[8px] tracking-[0.1em] text-lime uppercase">
            <span className="size-1 rounded-full bg-lime" /> On track
          </span>
        }
      />

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "Scope", value: 92, color: "bg-lime" },
          { label: "Timeline", value: 86, color: "bg-[#a5c98c]" },
          { label: "Budget", value: 74, color: "bg-[#d5c19d]" },
        ].map((metric) => (
          <div key={metric.label} className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-2.5">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[8px] tracking-[0.1em] text-cream/60 uppercase">
                {metric.label}
              </span>
              <span className="text-[0.7rem] font-medium text-cream/85">{metric.value}%</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <div className={`h-full rounded-full ${metric.color}`} style={{ width: `${metric.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-white/[0.08]">
        <div className="hidden grid-cols-[1.9fr_0.8fr_0.7fr_0.9fr] gap-3 border-b border-white/[0.08] bg-white/[0.03] px-3 py-2 font-mono text-[7.5px] tracking-[0.12em] text-cream/70 uppercase sm:grid">
          <span>Task</span>
          <span>Owner</span>
          <span>Due</span>
          <span className="text-right">Status</span>
        </div>
        {tasks.map((task) => (
          <div
            key={task.task}
            className="group flex items-center justify-between gap-3 border-b border-white/[0.06] px-3 py-2.5 transition-colors last:border-0 hover:bg-white/[0.04] sm:grid sm:grid-cols-[1.9fr_0.8fr_0.7fr_0.9fr]"
          >
            <div className="flex min-w-0 items-center gap-2">
              {task.tone === "done" ? (
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-lime/20 text-lime">
                  <Icon name="check" size={9} />
                </span>
              ) : (
                <span
                  className={`size-1.5 shrink-0 rounded-full ${
                    task.tone === "active" ? "bg-lime" : task.tone === "progress" ? "bg-[#a5c98c]" : "bg-cream/25"
                  }`}
                />
              )}
              <span className="truncate text-[0.72rem] text-cream/80">{task.task}</span>
            </div>
            <span className="hidden text-[0.68rem] text-cream/65 sm:block">{task.owner}</span>
            <span className="hidden font-mono text-[0.63rem] text-cream/60 sm:block">{task.due}</span>
            <span className="flex justify-end">
              <span
                className={`rounded-full px-2 py-0.5 text-[0.6rem] font-medium whitespace-nowrap ${
                  task.tone === "done"
                    ? "bg-white/10 text-cream/60"
                    : task.tone === "active"
                      ? "bg-lime text-ink"
                      : task.tone === "progress"
                        ? "bg-white/[0.08] text-cream/70"
                        : "bg-white/[0.05] text-cream/60"
                }`}
              >
                {task.status}
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5">
        <span className="font-mono text-[8px] tracking-[0.1em] text-cream/60 uppercase">
          Overall progress
        </span>
        <div className="flex flex-1 items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-lime/60 to-lime" />
          </div>
          <span className="text-[0.68rem] font-medium text-cream">68%</span>
        </div>
      </div>
    </div>
  );
}

function ReportPanel() {
  return (
    <div className="tab-enter">
      <PanelHeader
        icon="chart"
        title="Weekly pulse · Week 24"
        subtitle="Sent Monday 09:00 · 6 subscribers"
        right={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 font-mono text-[8px] tracking-[0.1em] text-cream/65 uppercase">
            <Icon name="check" size={9} /> Delivered
          </span>
        }
      />

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "On-time", value: "98%", trend: "+22%" },
          { label: "Risks cleared", value: "08", trend: "+3" },
          { label: "Reports sent", value: "100%", trend: "14 mo" },
        ].map((metric) => (
          <div key={metric.label} className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-2.5">
            <p className="font-mono text-[7.5px] tracking-[0.1em] text-cream/60 uppercase">{metric.label}</p>
            <p className="mt-1 text-[1.05rem] leading-none font-medium tracking-[-0.03em] text-cream">
              {metric.value}
            </p>
            <p className="mt-1 text-[0.6rem] text-lime">{metric.trend}</p>
          </div>
        ))}
      </div>

      <div
        className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3"
        role="img"
        aria-label="Bar chart of on-time project milestones from week 19 to week 24, rising from 68 to 98 percent"
      >
        <div className="flex items-center justify-between">
          <span className="text-[0.7rem] font-medium text-cream/75">Milestones on time</span>
          <span className="font-mono text-[8px] tracking-[0.08em] text-cream/70 uppercase">Last 6 weeks</span>
        </div>
        <div className="mt-4 flex h-[5.4rem] items-end gap-2 sm:gap-3">
          {reportBars.map((bar, index) => (
            <div key={bar.week} className="group flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <span className="font-mono text-[7px] text-cream/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {bar.value}%
              </span>
              <div
                className={`w-full rounded-t-[3px] transition-all duration-500 group-hover:brightness-125 ${
                  index === reportBars.length - 1 ? "bg-lime" : "bg-white/15"
                }`}
                style={{ height: `${bar.value - 22}%` }}
              />
              <span className="font-mono text-[7.5px] text-cream/70">{bar.week}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-3">
          <p className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.1em] text-lime uppercase">
            <span className="size-1 rounded-full bg-lime" /> This week's wins
          </p>
          <ul className="mt-2 space-y-1.5 text-[0.68rem] leading-snug text-cream/70">
            <li>• 3 review rounds closed two days early</li>
            <li>• Asset handover signed off by client</li>
          </ul>
        </div>
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-3">
          <p className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.1em] text-[#e2c9a8] uppercase">
            <span className="size-1 rounded-full bg-[#e2c9a8]" /> Needs a decision
          </p>
          <ul className="mt-2 space-y-1.5 text-[0.68rem] leading-snug text-cream/70">
            <li>• Launch date vs. final photography</li>
            <li>• One vendor quote awaiting sign-off</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function PlaybookPanel() {
  return (
    <div className="tab-enter">
      <PanelHeader
        icon="folder"
        title="Operations playbook"
        subtitle="24 pages · Shared with the whole team"
        right={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 font-mono text-[8px] tracking-[0.1em] text-cream/65 uppercase">
            <Icon name="users" size={9} /> Team access
          </span>
        }
      />
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {docs.map((doc) => (
          <div
            key={doc.title}
            className="group cursor-default rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 transition-colors duration-300 hover:border-lime/25 hover:bg-white/[0.055]"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="grid size-7 place-items-center rounded-md border border-white/10 bg-white/[0.05] text-lime">
                <Icon name="file" size={13} />
              </span>
              <span className="rounded-full bg-white/[0.06] px-2 py-0.5 font-mono text-[7px] tracking-[0.1em] text-cream/65 uppercase">
                {doc.tag}
              </span>
            </div>
            <p className="mt-3 text-[0.74rem] leading-tight font-medium text-cream/85">{doc.title}</p>
            <p className="mt-1 font-mono text-[8px] text-cream/70">{doc.meta}</p>
            <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2">
              <span className="font-mono text-[7.5px] tracking-[0.08em] text-cream/70 uppercase">Updated recently</span>
              <Icon
                name="arrowUpRight"
                size={11}
                className="text-cream/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-lime/20 bg-lime/[0.07] px-3 py-2.5">
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-lime text-ink">
          <Icon name="check" size={11} />
        </span>
        <p className="text-[0.68rem] leading-snug text-cream/70">
          The goal: if I'm out for a week, the project still moves. <span className="text-lime">No single point of failure.</span>
        </p>
      </div>
    </div>
  );
}

export function WorkShowcase() {
  const [active, setActive] = useState<TabId>("tracker");
  const baseId = useId();

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = tabs.findIndex((tab) => tab.id === active);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setActive(tabs[next].id);
    document.getElementById(`${baseId}-tab-${tabs[next].id}`)?.focus();
  };

  const sidebarItems: { label: string; icon: IconName; tab?: TabId }[] = [
    { label: "Overview", icon: "layers" },
    { label: "Projects", icon: "target", tab: "tracker" },
    { label: "Reports", icon: "chart", tab: "report" },
    { label: "Playbook", icon: "folder", tab: "playbook" },
    { label: "Team", icon: "users" },
  ];

  return (
    <section
      id="work"
      aria-label="Inside Nadia's project operations"
      className="on-dark grain relative scroll-mt-24 overflow-hidden bg-forest py-20 text-cream sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-dark opacity-40 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_75%)]" />
        <div className="absolute -top-40 left-1/3 size-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(215,239,130,0.17),transparent_65%)] blur-3xl animate-drift" />
        <div className="absolute -right-32 bottom-0 size-[26rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(169,106,69,0.22),transparent_68%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10 xl:gap-14">
          <div className="lg:col-span-4">
            <SectionIntro
              tone="dark"
              eyebrow="02 — Inside the work"
              title={
                <>
                  A look at the system behind <Em className="text-lime">the calm.</Em>
                </>
              }
              description="Not a mood board — the actual artifacts. Here's what a week of project operations looks like when it's set up properly."
            />
            <ul className="mt-8 space-y-3.5" data-reveal style={revealDelay(3)}>
              {[
                "A tracker anyone can read in 30 seconds",
                "A weekly report you never have to chase",
                "Documentation that outlives the project",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.85rem] leading-snug text-cream/70">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-lime/30 bg-lime/10 text-lime">
                    <Icon name="check" size={11} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal style={revealDelay(4)}>
              <Button href="#contact" variant="lime" size="md">
                Walk me through it
              </Button>
              <span className="font-mono text-[8.5px] tracking-[0.13em] text-cream/70 uppercase">
                Built in Notion + Asana
              </span>
            </div>
          </div>

          <div className="lg:col-span-8" data-reveal="scale" style={revealDelay(1, 80)}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div
                role="tablist"
                aria-label="Project operations examples"
                className="hide-scrollbar flex max-w-full gap-1.5 overflow-x-auto rounded-full border border-white/10 bg-white/[0.045] p-1 backdrop-blur"
              >
                {tabs.map((tab) => {
                  const selected = active === tab.id;
                  return (
                    <button
                      key={tab.id}
                      id={`${baseId}-tab-${tab.id}`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls={`${baseId}-panel-${tab.id}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActive(tab.id)}
                      onKeyDown={handleKeyDown}
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[0.72rem] font-medium whitespace-nowrap transition-all duration-300 sm:px-3.5 ${
                        selected
                          ? "bg-cream text-ink shadow-sm"
                          : "text-cream/70 hover:bg-white/[0.06] hover:text-cream"
                      }`}
                    >
                      <Icon name={tab.icon} size={13} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              <span className="hidden shrink-0 items-center gap-1.5 font-mono text-[8px] tracking-[0.12em] text-cream/70 uppercase sm:inline-flex">
                <StatusDot className="text-lime/70" /> Live examples
              </span>
            </div>

            <div className="relative overflow-hidden rounded-[1.35rem] border border-white/12 bg-[#0f1d16]/95 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-4 py-2.5">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="size-2 rounded-full bg-[#e6a48a]/70" />
                  <span className="size-2 rounded-full bg-[#d9cf9a]/70" />
                  <span className="size-2 rounded-full bg-[#a7c58d]/70" />
                </div>
                <div className="flex min-w-0 items-center gap-1.5 rounded-md border border-white/[0.07] bg-black/20 px-2.5 py-1">
                  <Icon name="shield" size={9} className="text-cream/70" />
                  <span className="truncate font-mono text-[7.5px] tracking-[0.06em] text-cream/70">
                    workspace / nadia-prameswari / operations
                  </span>
                </div>
                <Icon name="menuDots" size={14} className="shrink-0 text-cream/25" />
              </div>

              <div className="flex">
                <aside
                  className="hidden w-[8.2rem] shrink-0 border-r border-white/[0.07] p-2.5 sm:block"
                  aria-hidden="true"
                >
                  <div className="flex items-center gap-1.5 px-2 py-1.5">
                    <span className="grid size-5 place-items-center rounded-md bg-lime text-[10px] font-semibold text-ink">
                      n
                    </span>
                    <span className="text-[0.66rem] font-medium text-cream/70">Nadia's space</span>
                  </div>
                  <div className="mt-2 space-y-0.5">
                    {sidebarItems.map((item) => {
                      const isActive = item.tab === active;
                      return (
                        <div
                          key={item.label}
                          className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[0.64rem] transition-colors ${
                            isActive ? "bg-white/[0.08] text-cream" : "text-cream/70"
                          }`}
                        >
                          <Icon name={item.icon} size={11} className={isActive ? "text-lime" : ""} />
                          {item.label}
                          {isActive && <span className="ml-auto size-1 rounded-full bg-lime" />}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 rounded-md border border-white/[0.07] bg-white/[0.03] p-2">
                    <p className="font-mono text-[7px] tracking-[0.1em] text-cream/70 uppercase">This week</p>
                    <p className="mt-1 text-[0.62rem] leading-snug text-cream/70">6 milestones cleared</p>
                    <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-3/4 rounded-full bg-lime" />
                    </div>
                  </div>
                </aside>

                <div className="min-h-[21.5rem] min-w-0 flex-1 p-3.5 sm:min-h-[24rem] sm:p-4 lg:p-5">
                  {tabs.map((tab) => (
                    <div
                      key={tab.id}
                      id={`${baseId}-panel-${tab.id}`}
                      role="tabpanel"
                      aria-labelledby={`${baseId}-tab-${tab.id}`}
                      tabIndex={0}
                      hidden={active !== tab.id}
                      className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
                    >
                      {tab.id === "tracker" ? <TrackerPanel /> : tab.id === "report" ? <ReportPanel /> : <PlaybookPanel />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-3 flex items-center gap-2 font-mono text-[8px] tracking-[0.12em] text-cream/70 uppercase sm:hidden">
              <Icon name="arrowRight" size={11} /> Try the tabs to explore
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-white/10 pt-9 sm:grid-cols-3 sm:gap-6" data-reveal>
          {[
            { value: "22%", label: "Lift in on-time delivery", note: "After rebuilding the status rhythm" },
            { value: "6 hrs", label: "Given back each week", note: "By removing duplicate admin work" },
            { value: "100%", label: "Reports delivered on time", note: "14 months and counting" },
          ].map((outcome) => (
            <div key={outcome.label} className="flex gap-4">
              <span className="text-[1.75rem] leading-none font-medium tracking-[-0.04em] text-lime">{outcome.value}</span>
              <div>
                <p className="text-[0.82rem] font-medium text-cream/85">{outcome.label}</p>
                <p className="mt-1 text-[0.72rem] text-cream/60">{outcome.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
