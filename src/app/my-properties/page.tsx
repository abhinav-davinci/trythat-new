"use client";

import Link from "next/link";
import { ArrowLeft, Plus } from "@phosphor-icons/react/dist/ssr";
import { TopNav } from "../_components/TopNav";
import {
  PropertyCard,
  StatusBadge,
  type PropertyCardData,
} from "../_components/PropertyCard";

const MY_LISTINGS: PropertyCardData[] = [
  {
    id: "list-1",
    title: "Spacious 3 BHK apartment in wakad",
    location: "wakad, pune",
    type: "Residential",
    subtype: "Apartment",
    price: "₹ 45,000",
  },
  {
    id: "list-2",
    title: "Office space available in magarpatta",
    location: "magarpatta, pune",
    type: "Commercial",
    subtype: "Office",
    price: "₹ 1,20,000",
  },
];

export default function MyPropertiesPage() {
  return (
    <div className="min-h-screen w-full bg-white text-[#0b1856]">
      <TopNav active="my-properties" hideAddProperty />

      <main className="mx-auto w-full max-w-[1600px] px-10 pb-16 pt-7">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0b1856] transition hover:text-[#2c39d6]"
        >
          <ArrowLeft size={16} weight="bold" />
          Back
        </Link>

        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h1 className="text-[34px] font-bold leading-tight text-[#0b1856]">
              My Properties
            </h1>
            <p className="mt-1.5 text-[15px] text-[#6c7693]">
              Manage and view all your property listings
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-[#1f2a8e] px-5 py-3 text-[14px] font-semibold text-white shadow-sm transition hover:bg-[#1a236f]">
            <Plus size={16} weight="bold" />
            Add Property
          </button>
        </div>

        <p className="mt-7 text-[14px] text-[#6c7693]">
          Showing {MY_LISTINGS.length} of {MY_LISTINGS.length}{" "}
          {MY_LISTINGS.length === 1 ? "property" : "properties"}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MY_LISTINGS.map((p) => (
            <PropertyCard
              key={p.id}
              {...p}
              topRight={<StatusBadge label="Active" tone="active" />}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
