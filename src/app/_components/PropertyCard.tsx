"use client";

import {
  Eye,
  Heart,
  HouseLine,
  MagnifyingGlass,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";

export type PropertyCardData = {
  id: string;
  title: string;
  location: string;
  type: string;
  subtype: string;
  price: string;
};

export function PropertyCard({
  title,
  location,
  type,
  subtype,
  price,
  topRight,
}: PropertyCardData & { topRight?: React.ReactNode }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#eceff7] bg-white shadow-[0_1px_2px_rgba(11,24,86,0.04)]">
      <div className="relative">
        <ImagePlaceholder />
        {topRight && <div className="absolute right-3 top-3">{topRight}</div>}
      </div>

      <div className="p-4">
        <h3 className="text-[16px] font-bold leading-snug text-[#0b1856]">
          {title}
        </h3>

        <div className="mt-2.5 flex items-center gap-1.5 text-[13px] text-[#6c7693]">
          <MapPin size={14} weight="regular" />
          {location}
        </div>

        <div className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#6c7693]">
          <HouseLine size={14} weight="regular" />
          {type}
        </div>

        <div className="mt-1.5 text-[13px] text-[#6c7693]">{subtype}</div>

        <div className="mt-3 text-[18px] font-bold text-[#2c39d6]">{price}</div>

        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f2a8e] py-3 text-[14px] font-semibold text-white transition hover:bg-[#1a236f]">
          <Eye size={16} weight="regular" />
          View Details
        </button>
      </div>
    </article>
  );
}

export function FavouriteBadge() {
  return (
    <button
      aria-label="Remove from favourites"
      className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-md"
    >
      <Heart size={18} weight="fill" className="text-[#ef4444]" />
    </button>
  );
}

export function StatusBadge({
  label,
  tone = "active",
}: {
  label: string;
  tone?: "active" | "inactive";
}) {
  const isActive = tone === "active";
  return (
    <span
      className={
        isActive
          ? "flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-2.5 py-1 text-[11px] font-semibold text-[#166534] shadow-sm"
          : "flex items-center gap-1.5 rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[11px] font-semibold text-[#475569] shadow-sm"
      }
    >
      <span
        className={
          isActive
            ? "h-1.5 w-1.5 rounded-full bg-[#16a34a]"
            : "h-1.5 w-1.5 rounded-full bg-[#94a3b8]"
        }
      />
      {label}
    </span>
  );
}

function ImagePlaceholder() {
  return (
    <div className="relative grid aspect-[16/10] w-full place-items-center overflow-hidden bg-gradient-to-b from-[#fff5d8] to-[#fde6a8]">
      <svg
        viewBox="0 0 320 200"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <g fill="#cfd5e8" opacity="0.85">
          <rect x="10" y="100" width="36" height="100" />
          <rect x="50" y="80" width="28" height="120" />
          <rect x="82" y="115" width="22" height="85" />
          <rect x="240" y="90" width="34" height="110" />
          <rect x="278" y="110" width="26" height="90" />
        </g>
        <g fill="#9aa3c0">
          <rect x="20" y="125" width="40" height="75" />
          <rect x="62" y="105" width="32" height="95" />
          <rect x="96" y="130" width="38" height="70" />
          <rect x="138" y="95" width="36" height="105" />
          <rect x="178" y="120" width="40" height="80" />
          <rect x="220" y="105" width="34" height="95" />
          <rect x="258" y="130" width="38" height="70" />
        </g>
        <g fill="#ffffff" opacity="0.6">
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 18 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={26 + col * 16}
                y={130 + row * 10}
                width="3"
                height="3"
              />
            )),
          )}
        </g>
        <g fill="#b8c0d8">
          <polygon points="0,180 22,160 44,180 44,200 0,200" />
          <polygon points="44,180 66,160 88,180 88,200 44,200" />
        </g>
      </svg>

      <div className="relative z-10 flex flex-col items-center gap-2 text-[#7a8299]">
        <div className="relative grid h-12 w-12 place-items-center rounded-full">
          <MagnifyingGlass size={36} weight="thin" />
          <span className="absolute h-[2px] w-12 rotate-45 bg-[#7a8299]" />
        </div>
        <span className="text-[13px] font-semibold tracking-wide text-[#5c6480]">
          IMAGE NOT
        </span>
        <span className="-mt-1 text-[13px] font-semibold tracking-wide text-[#5c6480]">
          AVAILABLE
        </span>
      </div>
    </div>
  );
}
