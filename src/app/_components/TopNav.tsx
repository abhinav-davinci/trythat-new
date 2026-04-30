"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BellSimple,
  Buildings,
  ClipboardText,
  DownloadSimple,
  Heart,
  Plus,
  Sparkle,
  SquaresFour,
} from "@phosphor-icons/react/dist/ssr";

export type TopNavKey =
  | "ai-chat"
  | "my-properties"
  | "my-requirements"
  | "my-interests"
  | "dashboard";

type NavItem = {
  key: TopNavKey;
  label: string;
  href: string;
  icon: React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  { key: "ai-chat", label: "AI Chat", href: "/chat", icon: <Sparkle size={16} weight="fill" /> },
  { key: "my-properties", label: "My Properties", href: "/my-properties", icon: <Buildings size={16} weight="regular" /> },
  { key: "my-requirements", label: "My Requirements", href: "/my-requirements", icon: <ClipboardText size={16} weight="regular" /> },
  { key: "my-interests", label: "My Interests", href: "/my-interests", icon: <Heart size={16} weight="regular" /> },
  { key: "dashboard", label: "Dashboard", href: "/", icon: <SquaresFour size={16} weight="regular" /> },
];

export function TopNav({
  active,
  hideAddProperty = false,
  hideAddRequirement = false,
}: {
  active: TopNavKey;
  hideAddProperty?: boolean;
  hideAddRequirement?: boolean;
}) {
  return (
    <header className="flex h-[72px] w-full items-center justify-between border-b border-[#eceff7] bg-white px-6">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/assets/trythat-logo-new.png"
            alt="TryThat.ai — Real Estate SuperApp"
            width={2604}
            height={677}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="flex items-center gap-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === active;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={
                  isActive
                    ? "flex items-center gap-2 rounded-lg bg-[#2c39d6] px-3.5 py-2 text-[13.5px] font-semibold text-white shadow-sm"
                    : "flex items-center gap-2 rounded-lg px-3 py-2 text-[13.5px] font-medium text-[#3b4470] transition hover:bg-[#f3f5ff]"
                }
              >
                <span className={isActive ? "text-white" : "text-[#6c7693]"}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {!hideAddProperty && (
          <button className="flex items-center gap-1.5 rounded-lg bg-[#2c39d6] px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:opacity-95">
            <Plus size={14} weight="bold" />
            Add Property
          </button>
        )}
        {!hideAddRequirement && (
          <button className="flex items-center gap-1.5 rounded-lg bg-[#2c39d6] px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:opacity-95">
            <Plus size={14} weight="bold" />
            Add Requirement
          </button>
        )}
        <button className="grid h-9 w-9 place-items-center rounded-full text-[#0b1856] transition hover:bg-[#f3f5ff]">
          <BellSimple size={20} weight="regular" />
        </button>
        <div className="h-9 w-9 overflow-hidden rounded-full bg-[#1a1a1a] ring-2 ring-white">
          <Image
            src="/assets/profile.png"
            alt="Profile"
            width={36}
            height={36}
            className="h-full w-full object-cover opacity-80"
          />
        </div>
        <button className="flex items-center gap-1.5 rounded-lg border border-[#dfe3f3] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#0b1856] transition hover:bg-[#f3f5ff]">
          <DownloadSimple size={14} weight="bold" />
          Download App
        </button>
      </div>
    </header>
  );
}
