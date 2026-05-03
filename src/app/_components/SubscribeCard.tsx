"use client";

import { useState } from "react";
import {
  ArrowRight,
  BellSimple,
  Buildings,
  CheckCircle,
  MapPin,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";

export function SubscribeCard() {
  const [subscribed, setSubscribed] = useState(false);

  if (!subscribed) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#eceff7] bg-white px-4 py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#eef1ff] to-[#dde2f7] text-[#2c39d6]">
            <BellSimple size={20} weight="fill" />
          </span>
          <div className="min-w-0">
            <div className="text-[14.5px] font-bold leading-tight text-[#0b1856]">
              Subscribe and get updates
            </div>
            <p className="mt-0.5 text-[11px] leading-snug text-[#6c7693]">
              Latest property insights and market updates
            </p>
          </div>
        </div>
        <button
          onClick={() => setSubscribed(true)}
          className="flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-br from-[#3a4af0] to-[#2c39d6] px-3 py-2 text-[12.5px] font-semibold text-white shadow-md transition hover:opacity-95"
        >
          Start Free Subscription
          <ArrowRight size={12} weight="bold" />
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#eceff7] bg-white p-4">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#eef1ff] to-[#dde2f7] text-[#2c39d6]">
          <BellSimple size={20} weight="fill" />
        </span>
        <div className="min-w-0">
          <div className="text-[16px] font-bold leading-tight text-[#0b1856]">
            Subscribe and get updates
          </div>
          <p className="mt-1 text-[12px] leading-snug text-[#6c7693]">
            Subscribe a locality or property to get updates on prices,
            transactions
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <SubscriptionTile
          icon={<MapPin size={18} weight="regular" />}
          title="Baner, Pune"
          stat="12 recent transactions"
          newCount={3}
        />
        <SubscriptionTile
          icon={<Buildings size={18} weight="regular" />}
          title="Metro Business Park"
          stat="24 recent transactions"
          newCount={12}
        />
      </div>

      <div className="mt-4 rounded-xl border border-[#fde4b6] bg-[#fff8e6] p-3.5">
        <div className="flex items-center gap-2">
          <WarningCircle
            size={20}
            weight="fill"
            className="flex-shrink-0 text-[#e67f00]"
          />
          <span className="text-[14px] font-semibold text-[#0b1856]">
            Limit Reached
          </span>
        </div>
        <p className="mt-1 pl-7 text-[12px] leading-snug text-[#6c7693]">
          You&apos;ve already used your free limit of 1 locality, 1 property
          Upgrade or replace to continue.
        </p>
        <div className="mt-3 flex items-center justify-end gap-3">
          <button className="text-[12.5px] font-semibold text-[#e67f00] underline underline-offset-2 transition hover:opacity-80">
            Upgrade to Premium
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-[#1f2a8e] px-3.5 py-2 text-[12.5px] font-semibold text-white shadow-sm transition hover:bg-[#1a236f]">
            Replace a Subscription
            <ArrowRight size={12} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SubscriptionTile({
  icon,
  title,
  stat,
  newCount,
}: {
  icon: React.ReactNode;
  title: string;
  stat: string;
  newCount: number;
}) {
  return (
    <div className="rounded-xl bg-[#f3f5fb] px-3 py-3">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-md bg-white text-[#2c39d6]">
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-[13.5px] font-bold leading-tight text-[#0b1856]">
            {title}
          </div>
          <p className="mt-0.5 text-[11px] leading-snug text-[#6c7693]">
            {stat}{" "}
            <span className="font-semibold text-[#16a34a]">
              • {newCount} New
            </span>
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[#e2e8f0] pt-2.5">
        <span className="flex items-center gap-1 text-[11.5px] font-semibold text-[#6a6bff]">
          <CheckCircle size={13} weight="fill" />
          Subscribed
        </span>
        <button className="flex items-center gap-1 text-[11.5px] font-semibold text-[#0b1856] transition hover:text-[#2c39d6]">
          View Transactions
          <ArrowRight size={11} weight="bold" />
        </button>
      </div>
    </div>
  );
}
