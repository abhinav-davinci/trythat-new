"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Eye,
  Heart,
  HouseLine,
  MagnifyingGlass,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import { TopNav } from "../_components/TopNav";

type TabKey = "favourite" | "contacted";

type PropertyCardData = {
  id: string;
  title: string;
  location: string;
  type: string;
  subtype: string;
  price: string;
};

const FAVOURITE_PROPERTIES: PropertyCardData[] = [
  {
    id: "fav-1",
    title: "Shop available for rent in hinjewadi",
    location: "hinjewadi, pune",
    type: "Retail Space",
    subtype: "Shops",
    price: "₹ 25,000",
  },
];

const CONTACTED_PROPERTIES: PropertyCardData[] = [
  {
    id: "con-1",
    title: "2 BHK flat for rent in baner",
    location: "baner, pune",
    type: "Residential",
    subtype: "Apartment",
    price: "₹ 32,000",
  },
  {
    id: "con-2",
    title: "Office space for lease in kharadi",
    location: "kharadi, pune",
    type: "Commercial",
    subtype: "Office",
    price: "₹ 85,000",
  },
];

export default function MyInterestsPage() {
  return (
    <div className="min-h-screen w-full bg-white text-[#0b1856]">
      <TopNav active="my-interests" />
      <Suspense fallback={<MyInterestsBody initialTab="favourite" />}>
        <MyInterestsWithParams />
      </Suspense>
    </div>
  );
}

function MyInterestsWithParams() {
  const searchParams = useSearchParams();
  const initialTab: TabKey =
    searchParams?.get("tab") === "contacted" ? "contacted" : "favourite";
  return <MyInterestsBody initialTab={initialTab} />;
}

function MyInterestsBody({ initialTab }: { initialTab: TabKey }) {
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  const properties =
    activeTab === "favourite" ? FAVOURITE_PROPERTIES : CONTACTED_PROPERTIES;

  return (
    <main className="mx-auto w-full max-w-[1600px] px-10 pb-16 pt-8">
      <h1 className="text-[34px] font-bold leading-tight text-[#0b1856]">
        My Interests
      </h1>
      <p className="mt-1.5 text-[15px] text-[#6c7693]">
        View all your favourite and saved property here
      </p>

      <div className="mt-7 flex items-center gap-2 border-b border-[#eceff7]">
        <TabButton
          label="Favourite Properties"
          count={FAVOURITE_PROPERTIES.length}
          active={activeTab === "favourite"}
          onClick={() => setActiveTab("favourite")}
        />
        <TabButton
          label="Contacted Properties"
          count={CONTACTED_PROPERTIES.length}
          active={activeTab === "contacted"}
          onClick={() => setActiveTab("contacted")}
        />
      </div>

      <p className="mt-6 text-[14px] text-[#6c7693]">
        Showing {properties.length} of {properties.length}{" "}
        {properties.length === 1 ? "property" : "properties"}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties.map((p) => (
          <PropertyCard key={p.id} {...p} />
        ))}
      </div>
    </main>
  );
}

function TabButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "relative flex items-center gap-2 rounded-t-lg border-x border-t border-[#2c39d6] bg-white px-5 py-3 text-[15px] font-semibold text-[#0b1856]"
          : "flex items-center gap-2 px-5 py-3 text-[15px] font-medium text-[#6c7693] transition hover:text-[#0b1856]"
      }
    >
      {label}
      <span
        className={
          active
            ? "grid h-5 min-w-[20px] place-items-center rounded-full bg-[#eef1ff] px-1.5 text-[11px] font-semibold text-[#2c39d6]"
            : "grid h-5 min-w-[20px] place-items-center rounded-full bg-[#f3f5fb] px-1.5 text-[11px] font-semibold text-[#6c7693]"
        }
      >
        {count}
      </span>
      {active && (
        <span className="absolute inset-x-0 -bottom-px h-px bg-white" />
      )}
    </button>
  );
}

function PropertyCard({
  title,
  location,
  type,
  subtype,
  price,
}: PropertyCardData) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#eceff7] bg-white shadow-[0_1px_2px_rgba(11,24,86,0.04)]">
      <div className="relative">
        <ImagePlaceholder />
        <button
          aria-label="Remove from favourites"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white shadow-md"
        >
          <Heart size={18} weight="fill" className="text-[#ef4444]" />
        </button>
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

function ImagePlaceholder() {
  return (
    <div className="relative grid aspect-[16/10] w-full place-items-center overflow-hidden bg-gradient-to-b from-[#fff5d8] to-[#fde6a8]">
      <svg
        viewBox="0 0 320 200"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {/* Distant buildings (lighter) */}
        <g fill="#cfd5e8" opacity="0.85">
          <rect x="10" y="100" width="36" height="100" />
          <rect x="50" y="80" width="28" height="120" />
          <rect x="82" y="115" width="22" height="85" />
          <rect x="240" y="90" width="34" height="110" />
          <rect x="278" y="110" width="26" height="90" />
        </g>
        {/* Foreground buildings (darker) */}
        <g fill="#9aa3c0">
          <rect x="20" y="125" width="40" height="75" />
          <rect x="62" y="105" width="32" height="95" />
          <rect x="96" y="130" width="38" height="70" />
          <rect x="138" y="95" width="36" height="105" />
          <rect x="178" y="120" width="40" height="80" />
          <rect x="220" y="105" width="34" height="95" />
          <rect x="258" y="130" width="38" height="70" />
        </g>
        {/* Window dots */}
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
        {/* House silhouettes bottom-left */}
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
