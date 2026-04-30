"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BellRinging,
  Bookmark,
  Buildings,
  CalendarBlank,
  CaretDown,
  ChartPieSlice,
  ClipboardText,
  ClockClockwise,
  CurrencyInr,
  FileText,
  Lightbulb,
  SealCheck,
  ShieldCheck,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";

export type DataTabKey = "agreement" | "transaction" | "listing" | "index2";

type TabDef = {
  key: DataTabKey;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const TABS: TabDef[] = [
  {
    key: "agreement",
    title: "Agreement / Deed",
    description: "Property registration documents",
    icon: <FileText size={20} weight="bold" />,
  },
  {
    key: "transaction",
    title: "Transaction Data",
    description: "Request recent transaction details",
    icon: <CurrencyInr size={20} weight="bold" />,
  },
  {
    key: "listing",
    title: "Listing Data",
    description: "Project and property listings",
    icon: <Buildings size={20} weight="bold" />,
  },
  {
    key: "index2",
    title: "Index II",
    description: "Project and property data",
    icon: <ChartPieSlice size={20} weight="bold" />,
    // badge handled inline
  },
];

const PANEL_TITLES: Record<DataTabKey, { title: string; helper: string }> = {
  agreement: {
    title: "Agreement / Deed",
    helper: "Enter document or property details to fetch agreement records.",
  },
  transaction: {
    title: "Transaction Data",
    helper: "Enter property details to fetch recent transaction records.",
  },
  listing: {
    title: "Listing Data",
    helper: "Enter location and project details to fetch listings.",
  },
  index2: {
    title: "Index II",
    helper: "Enter document details to fetch Index II records (Maharashtra).",
  },
};

export function RequestDataClient({
  initialTab,
}: {
  initialTab: DataTabKey;
}) {
  const [activeTab, setActiveTab] = useState<DataTabKey>(initialTab);

  return (
    <div className="flex w-full items-stretch gap-6 pr-[77px]">
      <LeftSidebar />

      <main className="flex flex-1 flex-col gap-6 py-6">
        <TitleRow />
        <TabStrip activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex items-stretch gap-6">
          <FormPanel
            title={PANEL_TITLES[activeTab].title}
            helper={PANEL_TITLES[activeTab].helper}
          />
          <RightOverview />
        </div>
      </main>
    </div>
  );
}

/* =========================================================================
   LEFT SIDEBAR
   ========================================================================= */

function LeftSidebar() {
  return (
    <aside
      className="flex w-[467px] flex-shrink-0 flex-col gap-8 px-[77px] py-6"
      style={{ background: "rgba(235, 236, 255, 0.5)" }}
    >
      <Link
        href="/"
        className="inline-flex h-10 items-center gap-2 self-start text-[14px] font-semibold text-[#0e0e58] transition hover:text-[#3334de]"
      >
        <ArrowLeft size={18} weight="bold" />
        Back to Dashboard
      </Link>

      <div className="flex flex-col gap-2">
        <h1 className="text-[36px] font-bold leading-[48px] text-[#0e0e58]">
          Request the Right Data, Fast
        </h1>
        <p className="text-[14px] leading-5 text-[#0f172a]">
          Get documents, listings &amp; insights—all in one place
        </p>
      </div>

      <HeroIllustration />

      <HowItWorks />

      <TrustBadges />
    </aside>
  );
}

function HeroIllustration() {
  return (
    <div className="relative grid h-[287px] w-full place-items-center overflow-hidden">
      <svg
        viewBox="0 0 360 287"
        className="h-full w-full"
        aria-label="Request data illustration"
      >
        {/* Background blobs */}
        <ellipse cx="80" cy="220" rx="70" ry="14" fill="#dde1ff" opacity="0.7" />
        <ellipse cx="270" cy="240" rx="80" ry="12" fill="#dde1ff" opacity="0.6" />

        {/* Plant left */}
        <g>
          <path d="M30 230 Q22 200 12 175 Q22 195 35 200 Q34 215 30 230 Z" fill="#7cc18a" />
          <path d="M30 230 Q40 200 55 180 Q44 200 38 215 Q34 225 30 230 Z" fill="#5fa86f" />
          <rect x="20" y="225" width="22" height="18" rx="3" fill="#a87c4f" />
        </g>

        {/* Desk surface */}
        <rect x="60" y="208" width="240" height="6" rx="3" fill="#c5c7ff" />

        {/* Laptop */}
        <g>
          <rect x="120" y="150" width="120" height="78" rx="5" fill="#3334de" />
          <rect x="126" y="156" width="108" height="62" rx="2" fill="#eef0ff" />
          {/* Screen content */}
          <rect x="132" y="162" width="56" height="6" rx="2" fill="#6a6bff" />
          <rect x="132" y="172" width="44" height="4" rx="1.5" fill="#c5c7ff" />
          <rect x="132" y="180" width="50" height="4" rx="1.5" fill="#c5c7ff" />
          <rect x="132" y="190" width="40" height="20" rx="3" fill="#3334de" />
          <text x="142" y="204" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="#ffffff">
            Data
          </text>
          {/* Right-side mini chart */}
          <rect x="196" y="172" width="32" height="38" rx="3" fill="#ffffff" stroke="#c5c7ff" strokeWidth="1" />
          <polyline points="200,200 206,194 212,196 218,188 224,180" stroke="#16a34a" strokeWidth="1.5" fill="none" />
          {/* Laptop base */}
          <rect x="116" y="226" width="128" height="4" rx="2" fill="#1f24a8" />
        </g>

        {/* Person seated */}
        <g>
          <ellipse cx="180" cy="118" rx="18" ry="20" fill="#f4c89d" />
          <path d="M162 110 Q165 95 180 92 Q195 95 198 110 Q198 102 192 99 Q186 96 180 96 Q174 96 168 99 Q162 102 162 110 Z" fill="#1f2937" />
          <path d="M162 130 Q160 145 152 158 L208 158 Q200 145 198 130 Q190 138 180 138 Q170 138 162 130 Z" fill="#6a6bff" />
          <path d="M152 158 L208 158 L210 200 L150 200 Z" fill="#3334de" />
          {/* Arms */}
          <path d="M155 165 Q140 175 130 175 L138 195 L155 185 Z" fill="#6a6bff" />
          <path d="M205 165 Q220 175 230 175 L222 195 L205 185 Z" fill="#6a6bff" />
        </g>

        {/* Floating documents top-left */}
        <g transform="rotate(-8 80 80)">
          <rect x="60" y="60" width="44" height="56" rx="4" fill="#ffffff" stroke="#c5c7ff" strokeWidth="1.5" />
          <rect x="66" y="68" width="20" height="6" rx="1" fill="#3334de" />
          <rect x="66" y="80" width="32" height="3" rx="1" fill="#cbd5e1" />
          <rect x="66" y="86" width="32" height="3" rx="1" fill="#cbd5e1" />
          <rect x="66" y="92" width="24" height="3" rx="1" fill="#cbd5e1" />
          {/* Verified seal */}
          <circle cx="92" cy="106" r="6" fill="#16a34a" />
          <path d="M89 106 l2 2 l4 -4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Floating document top-right */}
        <g transform="rotate(8 280 90)">
          <rect x="258" y="68" width="44" height="56" rx="4" fill="#ffffff" stroke="#c5c7ff" strokeWidth="1.5" />
          <rect x="264" y="76" width="22" height="6" rx="1" fill="#e67f00" />
          <rect x="264" y="88" width="32" height="3" rx="1" fill="#cbd5e1" />
          <rect x="264" y="94" width="32" height="3" rx="1" fill="#cbd5e1" />
          <rect x="264" y="100" width="20" height="3" rx="1" fill="#cbd5e1" />
        </g>

        {/* Plant right */}
        <g>
          <path d="M325 235 Q335 205 345 175 Q335 200 320 210 Q322 225 325 235 Z" fill="#7cc18a" />
          <path d="M325 235 Q315 210 305 195 Q316 215 322 222 Q324 230 325 235 Z" fill="#5fa86f" />
          <rect x="315" y="230" width="22" height="20" rx="3" fill="#a87c4f" />
        </g>

        {/* Floor accent */}
        <rect x="0" y="265" width="360" height="22" fill="#eef0ff" />
      </svg>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Enter Details",
      desc: "Provide property & registration details",
      active: true,
    },
    {
      title: "We Fetch Records",
      desc: "Our system searches verified sources",
      active: false,
    },
    {
      title: "Get Notified",
      desc: "You'll receive your data in 2-3 days",
      active: false,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[16px] font-semibold leading-6 text-[#0f172a]">
        How it works ( 3 simple steps)
      </h2>

      <div className="flex gap-3">
        {/* Number rail */}
        <div className="relative flex w-[22px] flex-col items-center pt-1">
          {steps.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span
                className={
                  s.active
                    ? "z-10 grid h-5 w-5 place-items-center rounded-full bg-[#3334de] text-[12px] font-medium text-white"
                    : "z-10 grid h-5 w-5 place-items-center rounded-full bg-[#c5c7ff] text-[12px] font-medium text-[#0e0e58]"
                }
                style={{ letterSpacing: 0.24 }}
              >
                {idx + 1}
              </span>
              {idx < steps.length - 1 && (
                <span className="my-1 h-12 w-px border-l border-dashed border-[#c5c7ff]" />
              )}
            </div>
          ))}
        </div>

        {/* Text column */}
        <div className="flex flex-col gap-4">
          {steps.map((s) => (
            <div key={s.title} className="flex flex-col gap-1">
              <div
                className="text-[14px] font-semibold leading-5 text-[#0e0e58]"
                style={{ letterSpacing: 0.28 }}
              >
                {s.title}
              </div>
              <p className="max-w-[220px] text-[12px] leading-4 text-[#475569]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrustBadges() {
  const badges = [
    {
      icon: <SealCheck size={20} weight="bold" />,
      title: "Govt. Verified Data",
      subtitle: "Trusted & authentic records",
    },
    {
      icon: <ShieldCheck size={20} weight="bold" />,
      title: "Secure & Reliable",
      subtitle: "Your data is always protected",
    },
    {
      icon: <ClockClockwise size={20} weight="bold" />,
      title: "Fast & Easy Process",
      subtitle: "Get what you need, faster",
    },
  ];
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white px-6 py-4 shadow-[0_9px_7.35px_rgba(0,0,0,0.04)]">
      {badges.map((b) => (
        <div key={b.title} className="flex items-center gap-4">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#eaf7ef] text-[#16a34a]">
            {b.icon}
          </span>
          <div className="flex flex-col gap-0.5">
            <div
              className="text-[14px] font-semibold leading-5 text-[#0e0e58]"
              style={{ letterSpacing: 0.28 }}
            >
              {b.title}
            </div>
            <p className="max-w-[200px] text-[12px] leading-4 text-[#475569]">
              {b.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================================
   CENTER COLUMN
   ========================================================================= */

function TitleRow() {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-extrabold leading-[26px] text-[#0e0e58]">
          Request Any Data
        </h2>
        <p className="text-[14px] leading-5 text-[#475569]">
          Get documents, listings, transaction data &amp; insights—all in one place
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex h-10 items-center gap-2 rounded-lg border-[1.5px] border-[#c5c7ff] bg-white px-4 text-[14px] font-semibold text-[#3334de] transition hover:bg-[#f3f5ff]">
          <ClipboardText size={18} weight="bold" />
          My Activity
        </button>
        <button className="flex h-10 items-center gap-2 rounded-lg border-[1.5px] border-[#c5c7ff] bg-white px-4 text-[14px] font-semibold text-[#3334de] transition hover:bg-[#f3f5ff]">
          <Bookmark size={18} weight="bold" />
          Saved
        </button>
      </div>
    </div>
  );
}

function TabStrip({
  activeTab,
  setActiveTab,
}: {
  activeTab: DataTabKey;
  setActiveTab: (t: DataTabKey) => void;
}) {
  return (
    <div className="flex items-stretch overflow-clip rounded-xl border border-[#e2e8f0] bg-white">
      {TABS.map((tab, idx) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={
              isActive
                ? "relative flex flex-1 items-start gap-3 bg-[#ebecff] p-3 text-left transition"
                : "relative flex flex-1 items-start gap-3 bg-white p-3 text-left transition hover:bg-[#f8fafc]"
            }
            style={
              isActive
                ? { borderBottom: "3px solid #6a6bff" }
                : { borderBottom: "3px solid transparent" }
            }
          >
            {idx > 0 && (
              <span className="absolute left-0 top-3 bottom-3 w-px bg-[#e2e8f0]" />
            )}
            <span
              className={
                isActive
                  ? "grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-[#6a6bff] text-white"
                  : "grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-[#f1f5f9] text-[#0e0e58]"
              }
            >
              {tab.icon}
            </span>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <span className="text-[16px] font-semibold leading-6 text-[#0e0e58]">
                  {tab.title}
                </span>
                {tab.key === "index2" && (
                  <span className="ml-1 inline-flex items-center gap-1 text-[12px] font-medium leading-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                    <span className="text-[#16a34a]" style={{ letterSpacing: 0.24 }}>
                      Available in:
                    </span>
                    <span className="text-[#0e0e58]" style={{ letterSpacing: 0.24 }}>
                      Maharashtra
                    </span>
                  </span>
                )}
              </div>
              <span className="text-[12px] leading-4 text-[#475569]">
                {tab.description}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function FormPanel({ title, helper }: { title: string; helper: string }) {
  return (
    <section
      className="flex flex-1 flex-col rounded-xl border border-[#ebecff] bg-white"
      style={{
        boxShadow:
          "0 2.883px 6.727px rgba(24,39,75,0.10), 0 4.805px 15.375px rgba(24,39,75,0.10)",
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3.5 p-[22px]">
        <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-[#ebecff] text-[#3334de]">
          <FileText size={20} weight="bold" />
        </span>
        <div className="flex flex-col gap-1">
          <h3 className="text-[20px] font-semibold leading-7 text-[#0e0e58]">
            {title}
          </h3>
          <p className="text-[12px] leading-4 text-[#475569]">{helper}</p>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex max-h-[629px] flex-col gap-6 overflow-y-auto px-4 pb-2">
        <Section heading="Property Details">
          <div className="grid grid-cols-2 gap-4">
            <Field label="City" required placeholder="Enter City" select />
            <Field label="Locality" required placeholder="Enter Locality" select />
            <Field
              label="Property Name"
              required
              placeholder="Enter or select property name"
            />
            <Field label="Unit Number" required placeholder="Enter unit number" />
          </div>
          <Field label="Wing Name" optional placeholder="Enter wing name" />
        </Section>

        <Section heading="Registration Details">
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Document Registration Year"
              required
              placeholder="Select year"
              date
            />
            <Field
              label="Document Number"
              optional
              placeholder="Enter document number"
            />
          </div>
          <Field
            label="SRO Office"
            optional
            placeholder="Select SRO"
            select
          />
        </Section>

        <Section heading="Party Details" optionalHeading>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Buyer Name" placeholder="Enter buyer name" />
            <Field label="Seller Name" placeholder="Enter seller name" />
          </div>
        </Section>

        <div className="h-2" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-4 rounded-b-xl border-t border-[#c5c7ff] px-6 py-4">
        <div
          className="flex items-center gap-4 rounded-xl px-4 py-3"
          style={{ background: "rgba(238,240,255,0.5)" }}
        >
          <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-[#eef0ff] text-[#3334de]">
            <Lightbulb size={20} weight="bold" />
          </span>
          <div className="flex flex-col gap-0.5">
            <div
              className="text-[14px] font-semibold leading-5 text-[#0e0e58]"
              style={{ letterSpacing: 0.28 }}
            >
              Tips for better result
            </div>
            <p className="text-[12px] leading-4 text-[#475569]">
              Please provide accurate details to help us fetch the most relevant
              records
            </p>
          </div>
        </div>

        <button className="flex flex-shrink-0 items-center gap-2 rounded-lg bg-[#3334de] px-6 py-4 text-[18px] font-semibold leading-6 text-white transition hover:bg-[#2729c7]">
          Request Data
          <ArrowRight size={22} weight="bold" />
        </button>
      </div>
    </section>
  );
}

function Section({
  heading,
  children,
  optionalHeading = false,
}: {
  heading: string;
  children: React.ReactNode;
  optionalHeading?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 px-4">
      <h4 className="text-[16px] font-semibold leading-6 text-[#0e0e58]">
        {heading}
        {optionalHeading && (
          <span className="ml-1 text-[12px] font-normal text-[#6a6bff]">
            (Optional)
          </span>
        )}
      </h4>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  required = false,
  optional = false,
  select = false,
  date = false,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
  optional?: boolean;
  select?: boolean;
  date?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center gap-1">
        <span
          className="text-[14px] font-medium leading-5 text-[#0f172a]"
          style={{ letterSpacing: 0.28 }}
        >
          {label}
        </span>
        {required && (
          <span className="text-[12px] leading-4 text-[#dc2626]">*</span>
        )}
        {optional && (
          <span className="text-[12px] leading-4 text-[#6a6bff]">(Optional)</span>
        )}
      </span>
      <span className="relative flex h-12 items-center rounded-lg border border-[#cbd5e1] bg-white px-3 transition focus-within:border-[#6a6bff]">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-transparent text-[14px] leading-5 text-[#0f172a] placeholder:text-[#94a3b8] outline-none"
          readOnly={select || date}
        />
        {select && (
          <CaretDown size={16} weight="bold" className="text-[#475569]" />
        )}
        {date && (
          <CalendarBlank size={16} weight="bold" className="text-[#475569]" />
        )}
      </span>
    </label>
  );
}

/* =========================================================================
   RIGHT COLUMN — Your Requests Overview
   ========================================================================= */

function RightOverview() {
  return (
    <aside className="flex w-[299px] flex-shrink-0 flex-col gap-4 rounded-xl bg-[#f8fafc] px-6 py-4">
      <h3 className="text-[16px] font-semibold leading-6 text-[#0f172a]">
        Your Requests Overview
      </h3>

      <OverviewCard
        icon={<CurrencyInr size={16} weight="bold" />}
        title="Transaction Data"
        rows={[
          { tone: "neutral", label: "Total  Requests", value: "42" },
          { tone: "progress", label: "In Progress Requests", value: "03" },
          { tone: "ready", label: "Ready to View", value: "01" },
        ]}
        viewLink
      />

      <OverviewCard
        icon={<Buildings size={16} weight="bold" />}
        title="Listing data"
        rows={[
          { tone: "neutral", label: "Total  Requests", value: "12" },
          { tone: "progress", label: "In Progress Requests", value: "10" },
        ]}
      />

      <NotifyCard />

      <SecureCard />

      <UpgradeCard />
    </aside>
  );
}

type StatTone = "neutral" | "progress" | "ready";

type StatRow = { tone: StatTone; label: string; value: string };

function OverviewCard({
  icon,
  title,
  rows,
  viewLink = false,
}: {
  icon: React.ReactNode;
  title: string;
  rows: StatRow[];
  viewLink?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-3 shadow-[0_9px_7.35px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#f1f5f9] text-[#0e0e58]">
          {icon}
        </span>
        <span
          className="text-[14px] font-semibold leading-5 text-[#0e0e58]"
          style={{ letterSpacing: 0.28 }}
        >
          {title}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {rows.map((r) => (
          <StatRowItem key={r.label} row={r} />
        ))}
      </div>

      {viewLink && (
        <button className="flex h-6 items-center gap-1 self-end rounded-lg px-2 text-[10px] font-semibold leading-3 text-[#4e61f6] transition hover:underline">
          View Data
          <ArrowRight size={14} weight="bold" />
        </button>
      )}
    </div>
  );
}

function StatRowItem({ row }: { row: StatRow }) {
  if (row.tone === "ready") {
    return (
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="grid h-4 w-4 place-items-center">
            <span className="h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
          </span>
          <span
            className="text-[14px] font-medium leading-5 text-[#16a34a]"
            style={{ letterSpacing: 0.28 }}
          >
            {row.label}
          </span>
        </span>
        <span className="text-[16px] font-semibold leading-6 text-[#16a34a]">
          {row.value}
        </span>
      </div>
    );
  }
  const dotColor = row.tone === "progress" ? "#e67f00" : "#94a3b8";
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: dotColor }}
        />
        <span className="text-[12px] leading-4 text-[#475569]">{row.label}</span>
      </span>
      <span
        className="text-[14px] font-semibold leading-5 text-[#0f172a]"
        style={{ letterSpacing: 0.28 }}
      >
        {row.value}
      </span>
    </div>
  );
}

function NotifyCard() {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-white p-3 shadow-[0_9px_7.35px_rgba(0,0,0,0.04)]">
      <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-[#e2e8f0] text-[#0e0e58]">
        <BellRinging size={20} weight="bold" />
      </span>
      <div className="flex flex-1 flex-col gap-0.5">
        <div
          className="text-[14px] font-semibold leading-5 text-[#0e0e58]"
          style={{ letterSpacing: 0.28 }}
        >
          Get Notified
        </div>
        <p className="text-[12px] leading-4 text-[#475569]">
          We&apos;ll notify you once your data is ready
        </p>
      </div>
      <button
        type="button"
        aria-label="Toggle notifications"
        className="relative h-4 w-7 flex-shrink-0 rounded-full bg-[#e2e8f0] transition"
      >
        <span className="absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-white shadow" />
      </button>
    </div>
  );
}

function SecureCard() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#b6dbff] bg-[#eaf4ff] p-4">
      <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-[#b6dbff] text-[#0e0e58]">
        <ShieldCheck size={20} weight="bold" />
      </span>
      <div className="flex flex-col gap-0.5">
        <div
          className="text-[14px] font-semibold leading-5 text-[#0e0e58]"
          style={{ letterSpacing: 0.28 }}
        >
          100% Secure
        </div>
        <p className="text-[12px] leading-4 text-[#475569]">
          Your information is encrypted and safe with us
        </p>
      </div>
    </div>
  );
}

function UpgradeCard() {
  return (
    <div
      className="relative flex h-[223px] flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl px-4 py-3 text-center"
      style={{
        background:
          "linear-gradient(158.8deg, #FF8F01 11.454%, #B86500 53.734%)",
      }}
    >
      {/* Decorative blobs */}
      <span className="pointer-events-none absolute -left-6 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <span className="pointer-events-none absolute -right-8 bottom-0 h-32 w-32 rounded-full bg-black/10 blur-2xl" />
      <span className="pointer-events-none absolute right-6 top-6 h-12 w-12 rotate-45 rounded-2xl bg-white/10" />

      <span className="grid h-9 w-9 place-items-center rounded-3xl bg-[#fff2e0] text-[#e67f00]">
        <TrendUp size={20} weight="bold" />
      </span>
      <h4
        className="text-[20px] font-bold leading-[30px] text-white"
        style={{ letterSpacing: 0.8 }}
      >
        Upgrade to B2B
      </h4>
      <p className="text-[14px] leading-[18px] text-white">
        Unlock premium insights, advanced analytics, and tools built for real
        estate professionals.
      </p>
      <button className="flex h-10 items-center justify-center gap-2 self-stretch rounded-lg bg-[#fff2e0] px-4 text-[14px] font-semibold leading-4 text-[#e67f00] shadow-[0_2.883px_3.844px_-2.883px_rgba(24,39,75,0.12),0_3.844px_7.688px_-2.883px_rgba(24,39,75,0.08)] transition hover:bg-white">
        Upgrade Now
      </button>
    </div>
  );
}

