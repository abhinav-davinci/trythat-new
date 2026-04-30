"use client";

import { useState } from "react";
import {
  FavouriteBadge,
  PropertyCard,
  type PropertyCardData,
} from "../_components/PropertyCard";

export type TabKey = "favourite" | "contacted";

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

export function MyInterestsBody({ initialTab }: { initialTab: TabKey }) {
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
          <PropertyCard key={p.id} {...p} topRight={<FavouriteBadge />} />
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
