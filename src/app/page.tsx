import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BellSimple,
  BookmarkSimple,
  Buildings,
  Calculator,
  CaretRight,
  ChatCircleDots,
  CheckCircle,
  Clock,
  CurrencyInr,
  Database,
  DownloadSimple,
  Eye,
  FileText,
  HouseLine,
  LockSimpleOpen,
  MagnifyingGlass,
  MapPin,
  Microphone,
  PencilSimpleLine,
  PhoneCall,
  Sparkle,
  SquaresFour,
  Crown,
} from "@phosphor-icons/react/dist/ssr";
import { SubscribeCard } from "./_components/SubscribeCard";

const DATA_TERMINAL_SSO_URL = `https://data-terminal.trythat.ai/sso-login?token=${process.env.NEXT_PUBLIC_DT_DEMO_TOKEN ?? ""}`;

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#f4f6fb] text-[#0b1856]">
      <Header />
      <Hero />
      <main className="mx-auto grid w-full max-w-[1600px] grid-cols-12 gap-4 px-6 pb-10 pt-5">
        <section className="col-span-4 flex flex-col gap-4">
          <AlonCard />
          <DataTerminalCard />
        </section>
        <section className="col-span-4 flex flex-col gap-4">
          <MyActivityCard />
          <ListPropertyCard />
          <RequestDataCard />
        </section>
        <section className="col-span-4 flex flex-col gap-4">
          <UpgradeCard />
          <SubscribeCard />
          <QuickActionsCard />
          <RealtyBriefCard />
        </section>
      </main>
    </div>
  );
}

/* ---------------------------- HEADER ---------------------------- */

function Header() {
  return (
    <header className="flex h-[72px] w-full items-center justify-between border-b border-[#eceff7] bg-white px-6">
      <div className="flex items-center gap-6">
        <Image
          src="/assets/trythat-logo-new.png"
          alt="TryThat.ai — Real Estate SuperApp"
          width={2604}
          height={677}
          priority
          className="h-9 w-auto"
        />

        <div className="flex items-start gap-2">
          <div className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-[#eef1ff] text-[#2c39d6]">
            <MapPin size={16} weight="fill" />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-semibold text-[#0b1856]">
                Pune City
              </span>
              <button className="text-[12px] font-medium text-[#2c39d6] underline underline-offset-2">
                Change
              </button>
            </div>
            <span className="text-[11px] text-[#6c7693]">
              Hinjewadi, Pune, Maharashtra, India..
            </span>
          </div>
        </div>
      </div>

      <nav className="flex items-center gap-7">
        <a className="relative flex items-center gap-2 px-1 py-2 text-[14px] font-semibold text-[#0b1856]">
          <SquaresFour size={18} weight="fill" className="text-[#2c39d6]" />
          Dashboard
          <span className="absolute -bottom-[22px] left-0 h-[3px] w-full rounded-full bg-[#2c39d6]" />
        </a>
        <a className="flex items-center gap-2 px-1 py-2 text-[14px] font-medium text-[#6c7693]">
          <Buildings size={18} />
          My Space
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 rounded-lg border border-[#dfe3f3] px-3.5 py-1.5 text-[13px] font-semibold text-[#2c39d6] transition hover:bg-[#f3f5ff]">
          <DownloadSimple size={16} weight="bold" />
          Download App
        </button>
        <button className="relative grid h-9 w-9 place-items-center rounded-full text-[#0b1856] transition hover:bg-[#f3f5ff]">
          <BellSimple size={20} weight="regular" />
          <span className="absolute -top-0.5 -right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#ef4444] px-1 text-[10px] font-semibold text-white">
            14
          </span>
        </button>
        <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-white">
          <Image
            src="/assets/profile.png"
            alt="Profile"
            width={36}
            height={36}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}

/* ---------------------------- HERO ---------------------------- */

function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-[#0b1856]">
      <CitySkyline />

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-6 pb-7 pt-7">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-[34px] font-bold leading-[1.15] text-white">
              Hi Sayali, Welcome to TryThat!
            </h1>
            <p className="mt-2 text-[14px] text-white/85">
              <span className="font-semibold text-[#fbbf24]">
                Your AI Property Advisor
              </span>
              <span className="ml-2">is ready to help you decide smarter.</span>
            </p>
          </div>

          <PuneInsightsCard />
        </div>

        <SearchBar />
      </div>
    </div>
  );
}

function CitySkyline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full opacity-[0.07]"
    >
      <defs>
        <pattern
          id="dots"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#ffffff" />
        </pattern>
      </defs>
      <rect width="1440" height="320" fill="url(#dots)" />
      <g fill="#ffffff" opacity="0.6">
        <rect x="60" y="180" width="60" height="140" />
        <rect x="125" y="150" width="40" height="170" />
        <rect x="170" y="200" width="30" height="120" />
        <rect x="210" y="170" width="50" height="150" />
        <rect x="270" y="120" width="35" height="200" />
        <rect x="310" y="190" width="60" height="130" />
        <rect x="380" y="150" width="45" height="170" />
        <rect x="435" y="200" width="35" height="120" />
        <rect x="480" y="170" width="55" height="150" />
        <rect x="540" y="130" width="40" height="190" />
        <rect x="585" y="190" width="50" height="130" />
        <rect x="640" y="160" width="35" height="160" />
        <rect x="680" y="200" width="55" height="120" />
        <rect x="745" y="140" width="40" height="180" />
        <rect x="790" y="180" width="55" height="140" />
        <rect x="850" y="160" width="35" height="160" />
        <rect x="890" y="200" width="50" height="120" />
        <rect x="945" y="170" width="40" height="150" />
        <rect x="990" y="140" width="55" height="180" />
        <rect x="1050" y="190" width="35" height="130" />
        <rect x="1090" y="160" width="50" height="160" />
        <rect x="1145" y="200" width="40" height="120" />
        <rect x="1190" y="170" width="55" height="150" />
        <rect x="1250" y="140" width="35" height="180" />
        <rect x="1290" y="190" width="50" height="130" />
        <rect x="1345" y="160" width="60" height="160" />
      </g>
      {/* Big map pin watermark */}
      <g
        transform="translate(560 60)"
        fill="#ffffff"
        opacity="0.35"
      >
        <path d="M120 0C68 0 26 42 26 94c0 70 94 156 94 156s94-86 94-156C214 42 172 0 120 0zm0 130a36 36 0 1 1 0-72 36 36 0 0 1 0 72z" />
      </g>
    </svg>
  );
}

function PuneInsightsCard() {
  return (
    <div className="relative w-[760px] flex-shrink-0 rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-4 backdrop-blur">
      <div className="mb-3 flex items-center gap-2 text-white">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#fbbf24]/15 text-[#fbbf24]">
          <MapPin size={14} weight="fill" />
        </span>
        <span className="text-[14px] font-semibold">Pune Property Insights</span>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <Insight
          value={<>₹7,200 <span className="text-[12px] font-medium text-white/70">/sq.ft</span></>}
          label="Avg Price in Pune"
        />
        <Insight
          value={
            <span className="flex items-center gap-1.5">
              Wakad
              <span className="text-[#22c55e] text-[13px] font-semibold flex items-center gap-0.5">
                <ArrowUpRight size={14} weight="bold" /> 12%
              </span>
            </span>
          }
          label="Top Growing Area"
        />
        <Insight value="High for 2BHK" label="Demand in Pune" />
        <Insight
          value={<>6.5% <span className="text-[12px] font-medium text-white/70">Avg</span></>}
          label="Rental Yield"
        />
      </div>
    </div>
  );
}

function Insight({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      <div className="text-[18px] font-bold leading-tight text-white">
        {value}
      </div>
      <div className="mt-1 text-[12px] text-white/70">{label}</div>
    </div>
  );
}

function SearchBar() {
  return (
    <form
      action="/chat"
      method="GET"
      className="flex h-[54px] w-full items-center gap-3 rounded-2xl bg-white pl-4 pr-2 shadow-[0_8px_30px_rgba(11,24,86,0.25)]"
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f1f3ff] text-[#2c39d6]">
        <MagnifyingGlass size={16} weight="bold" />
      </span>
      <input
        type="text"
        name="q"
        autoComplete="off"
        className="h-full flex-1 bg-transparent text-[14px] text-[#0b1856] outline-none placeholder:text-[#6c7693]"
        placeholder="Try: 2BHK in Baner, ready-to-move flats under ₹1Cr..."
      />
      <button
        type="submit"
        className="flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-[#3a4af0] to-[#2c39d6] px-4 py-2 text-[13.5px] font-semibold text-white shadow-md transition hover:opacity-95"
      >
        <Sparkle size={14} weight="fill" />
        Ask AI
      </button>
    </form>
  );
}

/* ---------------------------- ALON CARD ---------------------------- */

function AlonCard() {
  const tags = [
    { label: "West Pune", tone: "rose" },
    { label: "Apartment", tone: "amber" },
    { label: "2 BHK, 3 BHK", tone: "lavender" },
    { label: "₹80 Lakh – ₹1.2 Cr", tone: "amber" },
    { label: "Self use", tone: "pink" },
  ] as const;

  return (
    <a
      href="https://alon-dev.altrrtech.com/"
      className="block overflow-hidden rounded-2xl border border-[#eceff7] bg-white transition hover:border-[#dfe3f3] hover:shadow-[0_8px_24px_rgba(11,24,86,0.08)]"
    >
      <div className="flex items-start justify-between px-4 pt-4">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#fff3e9] to-[#ffe0cc]">
          <ChatCircleDots size={22} weight="fill" className="text-[#e07a1f]" />
        </div>
        <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#16a34a]">
          <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
          ALON is active
        </span>
      </div>
      <div className="px-4 pb-3 pt-2">
        <h3 className="text-[17px] font-bold text-[#0b1856]">
          ALON: Let&apos;s Find What Fits You
        </h3>
        <ul className="mt-2 space-y-1 text-[12.5px] text-[#4b5575]">
          <li className="flex items-center gap-2">
            <HouseLine size={15} weight="regular" className="text-[#2c39d6]" />
            Find the right property and make better decisions with ALON
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={15} weight="fill" className="text-[#22c55e]" />
            Supports you at every stage—from exploring to decision-making
          </li>
        </ul>
      </div>

      {/* Peach scanning panel */}
      <div className="mx-3 mb-3 rounded-2xl bg-gradient-to-br from-[#ffeadd] to-[#ffe0cd] p-3">
        <p className="text-[13px] font-medium text-[#7a3a14]">
          Scanning 12L+ listings and verifying RERA data - just for you
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Chip key={t.label} tone={t.tone} label={t.label} />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <StatTile
            icon={<Buildings size={18} weight="duotone" />}
            value="12,847"
            label="Listings scanned"
          />
          <StatTile
            icon={<CheckCircle size={18} weight="duotone" />}
            value="342"
            label="Matches Found"
          />
          <StatTile
            icon={<BookmarkSimple size={18} weight="duotone" />}
            value="5"
            label="Shortlisted"
          />
        </div>
      </div>
    </a>
  );
}

function Chip({
  tone,
  label,
}: {
  tone: "rose" | "amber" | "lavender" | "pink";
  label: string;
}) {
  const map = {
    rose: "bg-white text-[#0b1856] border-[#f6cdb6]",
    amber: "bg-white text-[#0b1856] border-[#f6cdb6]",
    lavender: "bg-white text-[#0b1856] border-[#dad6f5]",
    pink: "bg-white text-[#0b1856] border-[#f6cdb6]",
  } as const;
  return (
    <span
      className={`rounded-full border px-3 py-1 text-[12px] font-medium ${map[tone]}`}
    >
      {label}
    </span>
  );
}

function StatTile({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl bg-white px-3 py-2.5">
      <div className="text-[#e07a1f]">{icon}</div>
      <div className="mt-1 text-[18px] font-bold leading-tight text-[#0b1856]">
        {value}
      </div>
      <div className="text-[11px] text-[#6c7693]">{label}</div>
    </div>
  );
}

/* ---------------------------- DATA TERMINAL ---------------------------- */

function DataTerminalCard() {
  return (
    <div className="rounded-2xl border border-[#eceff7] bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#eef1ff] text-[#2c39d6]">
            <Database size={20} weight="duotone" />
          </span>
          <div>
            <div className="text-[18px] font-bold text-[#0b1856]">
              Data Terminal
            </div>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#16a34a]">
          <span className="h-2 w-2 rounded-full bg-[#16a34a]" /> Live Now
        </span>
      </div>
      <p className="mt-2 text-[13px] text-[#6c7693]">
        All-in-one real estate dashboard with RERA &amp; IGR insights.
      </p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <DataMetric
          icon={<Buildings size={18} weight="duotone" />}
          value="450K"
          label="Projects"
        />
        <DataMetric
          icon={<FileText size={18} weight="duotone" />}
          value="1.6M+"
          label="Listings"
        />
        <DataMetric
          icon={<CurrencyInr size={18} weight="duotone" />}
          value="1.6M+"
          label="Transactions"
        />
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <div className="text-[28px] font-bold leading-none text-[#0b1856]">
            65%
          </div>
          <div className="mt-1 text-[13px] font-medium text-[#0b1856]">
            Transaction Growth
          </div>
          <div className="text-[11px] text-[#6c7693]">(Last 3 Months)</div>
        </div>
        <MiniBars />
      </div>

      <a
        href={DATA_TERMINAL_SSO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#2c39d6] bg-white py-3 text-[14px] font-semibold text-[#2c39d6] transition hover:bg-[#f1f3ff]"
      >
        It&apos;s Live - Visit Data Terminal
        <ArrowRight size={16} weight="bold" />
      </a>
    </div>
  );
}

function DataMetric({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl bg-[#f3f5fb] px-3 py-3">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-white text-[#2c39d6]">
          {icon}
        </span>
        <div>
          <div className="text-[16px] font-bold leading-tight text-[#0b1856]">
            {value}
          </div>
          <div className="text-[11px] text-[#6c7693]">{label}</div>
        </div>
      </div>
    </div>
  );
}

function MiniBars() {
  const bars = [22, 30, 28, 38, 34, 50, 80, 62, 30];
  return (
    <div className="flex h-[64px] items-end gap-1.5">
      {bars.map((h, i) => (
        <span
          key={i}
          style={{ height: `${h}%` }}
          className={`w-2.5 rounded-sm ${
            i === 6 ? "bg-[#2c39d6]" : "bg-[#dde2f5]"
          }`}
        />
      ))}
    </div>
  );
}

/* ---------------------------- MY ACTIVITY ---------------------------- */

function MyActivityCard() {
  return (
    <div className="rounded-2xl border border-[#eceff7] bg-white p-4">
      <h3 className="text-[17px] font-bold text-[#0b1856]">My Activity</h3>
      <div className="mt-3 grid grid-cols-4 gap-2.5">
        <ActivityTile
          icon={<HouseLine size={20} weight="duotone" />}
          value="25"
          label="My Listings"
          href="/my-properties"
        />
        <ActivityTile
          icon={<BookmarkSimple size={20} weight="duotone" />}
          value="30"
          label="Saved Properties"
          href="/my-interests"
        />
        <ActivityTile
          icon={<LockSimpleOpen size={20} weight="duotone" />}
          value="42"
          label="Unlocked"
          href="/my-interests?tab=contacted"
        />
        <ActivityTile
          icon={<Database size={20} weight="duotone" />}
          value="245"
          label="My Data"
        />
      </div>
    </div>
  );
}

function ActivityTile({
  icon,
  value,
  label,
  href,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="mx-auto grid h-8 w-8 place-items-center rounded-lg bg-white text-[#2c39d6]">
        {icon}
      </div>
      <div className="mt-1.5 text-[18px] font-bold leading-none text-[#0b1856]">
        {value}
      </div>
      <div className="mt-1 text-[10.5px] text-[#6c7693]">{label}</div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block rounded-xl bg-[#f6f7fb] px-2 py-2.5 text-center transition hover:bg-[#eef1ff]"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="rounded-xl bg-[#f6f7fb] px-2 py-2.5 text-center">
      {content}
    </div>
  );
}

/* ---------------------------- LIST YOUR PROPERTY ---------------------------- */

function ListPropertyCard() {
  return (
    <div className="rounded-2xl border border-[#eceff7] bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#fff3e9] to-[#ffe0cc] text-[#e07a1f]">
            <Microphone size={20} weight="fill" />
          </span>
          <div>
            <h3 className="text-[17px] font-bold text-[#0b1856]">
              List Your Property
            </h3>
            <p className="mt-0.5 text-[12.5px] text-[#6c7693]">
              List your property in{" "}
              <span className="font-semibold text-[#e07a1f]">60 sec.</span>
            </p>
          </div>
        </div>
        <span className="rounded-md border border-[#f6cdb6] bg-[#fff5ec] px-2 py-0.5 text-[11px] font-semibold text-[#e07a1f]">
          Just Speak &amp; List
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2.5">
        <ListOption
          icon={<Microphone size={18} weight="regular" />}
          title="Voice Note"
          subtitle="Describe property with voice"
        />
        <ListOption
          icon={<PencilSimpleLine size={18} weight="regular" />}
          title="Create Listing Manually"
          subtitle="Fill details manually through form"
          href="https://trythat.ai/listings/add-property"
        />
        <ListOption
          icon={<PhoneCall size={18} weight="regular" />}
          title="Call & List"
          subtitle="Quickly list with expert help"
        />
      </div>
    </div>
  );
}

function ListOption({
  icon,
  title,
  subtitle,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href?: string;
}) {
  const cls =
    "group relative flex w-full items-start gap-2 rounded-xl border border-[#eceff7] bg-[#fafbff] px-2.5 py-2.5 pr-5 text-left transition hover:border-[#dfe3f3] hover:bg-white";

  if (href) {
    return (
      <a href={href} className={cls}>
        <span className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-md bg-white text-[#2c39d6] ring-1 ring-[#eceff7]">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[12.5px] font-semibold leading-tight text-[#0b1856]">
            {title}
          </div>
          <div className="mt-1 text-[10.5px] leading-tight text-[#6c7693]">
            {subtitle}
          </div>
        </div>
        <CaretRight
          size={12}
          weight="bold"
          className="absolute right-2 top-3 text-[#9aa3c0]"
        />
      </a>
    );
  }

  return (
    <button type="button" className={cls}>
      <span className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-md bg-white text-[#2c39d6] ring-1 ring-[#eceff7]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[12.5px] font-semibold leading-tight text-[#0b1856]">
          {title}
        </div>
        <div className="mt-1 text-[10.5px] leading-tight text-[#6c7693]">
          {subtitle}
        </div>
      </div>
      <CaretRight
        size={12}
        weight="bold"
        className="absolute right-2 top-3 text-[#9aa3c0]"
      />
    </button>
  );
}

/* ---------------------------- REQUEST DATA ---------------------------- */

function RequestDataCard() {
  return (
    <div className="rounded-2xl border border-[#eceff7] bg-white p-4">
      <h3 className="text-[17px] font-bold text-[#0b1856]">
        Request <span>&nbsp;</span>Any Data
      </h3>
      <p className="mt-1 text-[12.5px] text-[#6c7693]">
        Get documents, listings, transaction data &amp; insights—all in one place
      </p>

      <div className="mt-3 flex flex-col gap-2.5">
        <RequestItem
          href="/request-data?tab=agreement"
          icon={<FileText size={18} weight="regular" />}
          title="Agreement / Deed"
          subtitle="Get property registration documents"
          stats={[
            { dot: "#9aa3c0", label: "Total Requests:", value: "24" },
            { dot: "#f4a23c", label: "In Progress:", value: "3" },
            { dot: "#22c55e", label: "Ready to View:", value: "1" },
          ]}
          showView
        />
        <RequestItem
          href="/request-data?tab=transaction"
          icon={<CurrencyInr size={18} weight="regular" />}
          title="Transaction Data"
          subtitle="Request recent property transaction details"
          stats={[
            { dot: "#9aa3c0", label: "Total Requests:", value: "24" },
            { dot: "#f4a23c", label: "In Progress:", value: "3" },
          ]}
        />
        <RequestItem
          href="/request-data?tab=listing"
          icon={<Buildings size={18} weight="regular" />}
          title="Listing Data"
          subtitle=""
        />
      </div>
    </div>
  );
}

type StatPill = { dot: string; label: string; value: string };

function RequestItem({
  href,
  icon,
  title,
  subtitle,
  stats,
  showView,
}: {
  href?: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  stats?: StatPill[];
  showView?: boolean;
}) {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      {...(href ? { href } : {})}
      className={
        href
          ? "block rounded-xl border border-[#eceff7] bg-[#fafbff] px-4 py-3 transition hover:border-[#c5c7ff] hover:bg-[#f3f5ff]"
          : "rounded-xl border border-[#eceff7] bg-[#fafbff] px-4 py-3"
      }
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-[#2c39d6] ring-1 ring-[#eceff7]">
            {icon}
          </span>
          <div>
            <div className="text-[14px] font-semibold leading-tight text-[#0b1856]">
              {title}
            </div>
            {subtitle && (
              <div className="mt-0.5 text-[12px] text-[#6c7693]">{subtitle}</div>
            )}
          </div>
        </div>
        <CaretRight size={16} weight="bold" className="text-[#9aa3c0]" />
      </div>
      {stats && (
        <div className="mt-3 flex items-center justify-between border-t border-[#eceff7] pt-2.5">
          <div className="flex items-center gap-4">
            {stats.map((s) => (
              <span
                key={s.label}
                className="flex items-center gap-1 text-[11px] text-[#4b5575]"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: s.dot }}
                />
                {s.label}{" "}
                <span className="font-semibold text-[#0b1856]">{s.value}</span>
              </span>
            ))}
          </div>
          {showView && (
            <span className="flex items-center gap-1 text-[12px] font-semibold text-[#2c39d6]">
              <Eye size={14} weight="regular" /> View
            </span>
          )}
        </div>
      )}
    </Wrapper>
  );
}

/* ---------------------------- UPGRADE TO B2B ---------------------------- */

function UpgradeCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#f4a23c] to-[#e07a1f] px-4 py-3.5 text-white shadow-[0_10px_30px_rgba(224,122,31,0.25)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-white/20 ring-1 ring-white/40">
            <Crown size={20} weight="fill" className="text-white" />
          </span>
          <div className="min-w-0">
            <div className="text-[18px] font-bold leading-tight">
              Upgrade to B2B
            </div>
            <p className="mt-1 text-[11.5px] leading-snug text-white/95">
              Unlock premium insights, advanced analytics, and tools built for
              real estate professionals.
            </p>
          </div>
        </div>

        <button className="flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[12.5px] font-semibold text-[#e07a1f] shadow-sm">
          Upgrade Now <ArrowRight size={12} weight="bold" />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------- QUICK ACTIONS ---------------------------- */

function QuickActionsCard() {
  return (
    <div className="rounded-2xl border border-[#dde2f5] bg-white p-4">
      <h3 className="text-[17px] font-bold text-[#0b1856]">Quick Actions</h3>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <QuickAction
          icon={<MagnifyingGlass size={18} weight="regular" />}
          label="Explore Properties"
          href="https://trythat.ai/listings"
        />
        <QuickAction
          icon={<Calculator size={18} weight="regular" />}
          label="Calculator"
          href="https://trythat.ai/info/tools/calculators/emi"
        />
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const cls =
    "flex items-center justify-between rounded-xl border border-[#eceff7] bg-[#fafbff] px-3 py-3";

  if (href) {
    return (
      <a href={href} className={cls}>
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-[#2c39d6] ring-1 ring-[#eceff7]">
            {icon}
          </span>
          <span className="text-[13.5px] font-semibold text-[#0b1856]">
            {label}
          </span>
        </div>
        <CaretRight size={14} weight="bold" className="text-[#9aa3c0]" />
      </a>
    );
  }

  return (
    <button type="button" className={cls}>
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-[#2c39d6] ring-1 ring-[#eceff7]">
          {icon}
        </span>
        <span className="text-[13.5px] font-semibold text-[#0b1856]">
          {label}
        </span>
      </div>
      <CaretRight size={14} weight="bold" className="text-[#9aa3c0]" />
    </button>
  );
}

/* ---------------------------- REALTY BRIEF ---------------------------- */

function RealtyBriefCard() {
  return (
    <div className="rounded-2xl border border-[#eceff7] bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[#eef1ff] text-[12px] font-bold text-[#2c39d6]">
            R
          </span>
          <span className="text-[15px] font-bold text-[#0b1856]">
            RealtyBrief
          </span>
        </div>
        <a
          href="https://trythat.ai/realtybrief"
          className="text-[12px] font-semibold text-[#2c39d6] hover:underline hover:underline-offset-4"
        >
          View All
        </a>
      </div>

      <a
        href="https://trythat.ai/realtybrief"
        className="mt-3 flex items-start gap-3 rounded-xl p-1 transition hover:bg-[#f3f5ff]"
      >
        <CoinPileArt />
        <div className="min-w-0 flex-1">
          <div className="text-[13.5px] font-bold leading-snug text-[#0b1856]">
            Property Registration Data Shows Upward Trend
          </div>
          <p className="mt-1 text-[11.5px] leading-snug text-[#6c7693]">
            Increased transactions recorded in March as buyers rush before new
            rates.
          </p>
          <div className="mt-1.5 flex items-center gap-1 text-[10.5px] text-[#9aa3c0]">
            <Clock size={11} /> 28 Mar 2026
          </div>
          <span className="mt-1.5 flex items-center gap-1 text-[11.5px] font-semibold text-[#2c39d6]">
            Read More <ArrowRight size={11} weight="bold" />
          </span>
        </div>
      </a>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        <span className="h-1.5 w-5 rounded-full bg-[#2c39d6]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#dde2f5]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#dde2f5]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#dde2f5]" />
      </div>
    </div>
  );
}

function CoinPileArt() {
  return (
    <div className="relative grid h-[78px] w-[110px] flex-shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-[#fff3d6] via-[#ffe6b3] to-[#ffd58a]">
      {/* leaf */}
      <svg
        viewBox="0 0 110 78"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <path
          d="M70 18 C 78 6, 92 4, 100 14 C 96 28, 84 32, 74 26 Z"
          fill="#22c55e"
          opacity="0.9"
        />
        <path
          d="M76 22 L 92 12"
          stroke="#15803d"
          strokeWidth="1.2"
          fill="none"
        />
        {/* coin stack */}
        <ellipse cx="42" cy="62" rx="22" ry="6" fill="#d97706" />
        <rect x="20" y="50" width="44" height="12" fill="#f59e0b" />
        <ellipse cx="42" cy="50" rx="22" ry="6" fill="#fbbf24" />
        <ellipse cx="42" cy="50" rx="14" ry="3.5" fill="#fde68a" />
        <ellipse cx="42" cy="50" rx="6" ry="1.5" fill="#fff7d6" />
        {/* small stack */}
        <ellipse cx="78" cy="58" rx="14" ry="4" fill="#d97706" />
        <rect x="64" y="50" width="28" height="8" fill="#f59e0b" />
        <ellipse cx="78" cy="50" rx="14" ry="4" fill="#fbbf24" />
        {/* single coin */}
        <circle cx="86" cy="42" r="8" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
        <text x="86" y="45" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">
          ₹
        </text>
      </svg>
    </div>
  );
}

