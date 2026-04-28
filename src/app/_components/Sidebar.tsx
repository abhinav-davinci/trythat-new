"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CaretLeft,
  DotsThree,
  EnvelopeSimple,
  Plus,
  Sparkle,
  SquaresFour,
} from "@phosphor-icons/react/dist/ssr";

export type SidebarTab = "ai-chat" | "dashboard" | "message";

const RECENT_CHATS = [
  "2BHK in Baner",
  "Ready-to-move flats Kharadi",
  "5-year price trend Hinjewadi",
  "Compare Wakad vs Baner",
  "Investment under ₹1 Cr",
];

export function Sidebar({ active = "ai-chat" }: { active?: SidebarTab }) {
  return (
    <aside className="flex h-full w-[260px] flex-shrink-0 flex-col border-r border-[#eceff7] bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <Link href="/">
          <Image
            src="/assets/trythat-logo-new.png"
            alt="TryThat.ai"
            width={2604}
            height={677}
            priority
            className="h-8 w-auto"
          />
        </Link>
        <button className="grid h-7 w-7 place-items-center rounded-md text-[#9aa3c0] transition hover:bg-[#f3f5ff]">
          <CaretLeft size={14} weight="bold" />
        </button>
      </div>

      <div className="px-4 pb-3">
        <Link
          href="/chat"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#3a4af0] to-[#2c39d6] py-2.5 text-[13.5px] font-semibold text-white shadow-md transition hover:opacity-95"
        >
          <Plus size={16} weight="bold" /> New Chat
        </Link>
      </div>

      <nav className="flex flex-col gap-1 px-3 pb-3">
        <NavItem
          icon={<Sparkle size={16} weight="fill" />}
          label="AI Chat"
          href="/chat"
          active={active === "ai-chat"}
        />
        <NavItem
          icon={<SquaresFour size={16} weight="regular" />}
          label="Dashboard"
          href="/"
          active={active === "dashboard"}
        />
        <NavItem
          icon={<EnvelopeSimple size={16} weight="regular" />}
          label="Message"
          href="/messages"
          active={active === "message"}
          badge="2"
        />
      </nav>

      <div className="px-5 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-[#9aa3c0]">
        Recent Chats
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        {RECENT_CHATS.map((c, i) => (
          <Link
            key={i}
            href={`/chat?q=${encodeURIComponent(c)}`}
            className="block w-full truncate rounded-md px-2 py-1.5 text-left text-[12.5px] text-[#4b5575] transition hover:bg-[#f3f5ff]"
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-[#eceff7] px-4 py-3">
        <Image
          src="/assets/profile.png"
          alt="Sayali"
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
        />
        <div className="min-w-0 flex-1 leading-tight">
          <div className="truncate text-[13px] font-semibold">Sayali R.</div>
          <div className="truncate text-[11px] text-[#6c7693]">
            Personal · Pune
          </div>
        </div>
        <button className="grid h-7 w-7 place-items-center rounded-md text-[#9aa3c0] transition hover:bg-[#f3f5ff]">
          <DotsThree size={16} weight="bold" />
        </button>
      </div>
    </aside>
  );
}

function NavItem({
  icon,
  label,
  active,
  href,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href: string;
  badge?: string;
}) {
  const cls = `group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px] font-medium transition ${
    active
      ? "bg-gradient-to-r from-[#eef1ff] to-[#f5f7ff] text-[#2c39d6] ring-1 ring-[#dde2f7]"
      : "text-[#4b5575] hover:bg-[#f3f5ff] hover:text-[#0b1856]"
  }`;
  return (
    <Link href={href} className={cls}>
      <span
        className={
          active ? "text-[#2c39d6]" : "text-[#9aa3c0] group-hover:text-[#2c39d6]"
        }
      >
        {icon}
      </span>
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#ef4444] px-1.5 text-[10px] font-semibold text-white">
          {badge}
        </span>
      )}
    </Link>
  );
}
