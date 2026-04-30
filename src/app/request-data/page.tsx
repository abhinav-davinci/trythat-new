import Link from "next/link";
import { RequestDataClient, type DataTabKey } from "./RequestDataClient";

const VALID_TABS: DataTabKey[] = ["agreement", "transaction", "listing", "index2"];

export default async function RequestDataPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const initialTab: DataTabKey = VALID_TABS.includes(params.tab as DataTabKey)
    ? (params.tab as DataTabKey)
    : "agreement";

  return (
    <div className="min-h-screen w-full bg-white text-[#0e0e58]">
      <RequestDataHeader />
      <RequestDataClient initialTab={initialTab} />
    </div>
  );
}

function RequestDataHeader() {
  return (
    <header className="flex h-[76px] w-full items-center justify-between border-b border-[#eceff7] bg-white px-20 shadow-[0_3.84px_3.84px_-1.92px_rgba(24,39,75,0.08),0_1.92px_2.88px_-1.92px_rgba(24,39,75,0.12)]">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/trythat-logo-new.png"
            alt="TryThat.ai"
            className="h-8 w-auto"
          />
        </Link>
        <span className="grid h-6 w-6 place-items-center text-[#3334de]">
          <MapPinIcon />
        </span>
        <div className="leading-tight">
          <div className="flex items-center gap-2">
            <span className="text-[16px] font-semibold text-[#334155]">
              Pune City
            </span>
            <button className="text-[16px] font-semibold text-[#6a6bff] underline underline-offset-2">
              Change
            </button>
          </div>
          <div className="text-[14px] text-[#64748b]">
            Hinjewadi, Pune, Maharashtra, India..
          </div>
        </div>
      </div>

      <nav className="flex items-center gap-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-[16px] font-medium text-[#64748b] transition hover:text-[#0e0e58]"
        >
          <SquaresFourIcon />
          Dashboard
        </Link>
        <a
          className="flex items-center gap-2 text-[16px] font-medium text-[#64748b] transition hover:text-[#0e0e58]"
        >
          <BuildingsIcon />
          My Space
        </a>
      </nav>

      <div className="flex items-center gap-6">
        <button className="flex h-10 items-center gap-2 rounded-lg border-[1.5px] border-[#c5c7ff] bg-white px-4 text-[14px] font-semibold text-[#3334de] transition hover:bg-[#f3f5ff]">
          <DownloadIcon />
          Download App
        </button>
        <button className="relative grid h-9 w-9 place-items-center text-[#0e0e58]">
          <BellRingingIcon />
          <span className="absolute -top-0.5 -right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full border-2 border-white bg-[#dc2626] px-1 text-[10px] font-medium text-white">
            14
          </span>
        </button>
        <div className="h-9 w-9 overflow-hidden rounded-full bg-[#1a1a1a] ring-2 ring-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/profile.png"
            alt="Profile"
            className="h-full w-full object-cover opacity-80"
          />
        </div>
      </div>
    </header>
  );
}

/* ---------------- Inline SVG icons (Phosphor-style, bold) ---------------- */

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C7.59 2 4 5.59 4 10c0 5.25 7.05 11.55 7.35 11.81.18.16.43.16.61 0 .3-.26 8.04-6.56 8.04-11.81 0-4.41-3.59-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
  );
}

function SquaresFourIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
    </svg>
  );
}

function BuildingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 21V7l6-4v4h12v14H3zm2-2h4V9H5v10zm6 0h2v-3h-2v3zm0-5h2v-3h-2v3zm0-5h2V6h-2v3zm4 10h2v-3h-2v3zm0-5h2v-3h-2v3zm0-5h2V6h-2v3zm4 10h2V9h-2v10z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
    </svg>
  );
}

function BellRingingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6V11a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  );
}
