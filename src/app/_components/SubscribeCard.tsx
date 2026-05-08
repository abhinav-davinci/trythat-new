"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  BellSimple,
  Buildings,
  CheckCircle,
  Crown,
  MagnifyingGlass,
  MapPin,
  WarningCircle,
  X,
} from "@phosphor-icons/react/dist/ssr";

type ModalKind = "none" | "replace" | "limit";

export function SubscribeCard() {
  const [subscribed, setSubscribed] = useState(false);
  const [modal, setModal] = useState<ModalKind>("none");

  return (
    <>
      {!subscribed ? (
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
      ) : (
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
              <button
                onClick={() => setModal("limit")}
                className="text-[12.5px] font-semibold text-[#e67f00] underline underline-offset-2 transition hover:opacity-80"
              >
                Upgrade to Premium
              </button>
              <button
                onClick={() => setModal("replace")}
                className="flex items-center gap-1.5 rounded-lg bg-[#1f2a8e] px-3.5 py-2 text-[12.5px] font-semibold text-white shadow-sm transition hover:bg-[#1a236f]"
              >
                Replace a Subscription
                <ArrowRight size={12} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === "replace" && (
        <ReplaceSubscriptionModal onClose={() => setModal("none")} />
      )}
      {modal === "limit" && (
        <FreePlanLimitModal
          onClose={() => setModal("none")}
          onReplace={() => setModal("replace")}
        />
      )}
    </>
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

/* =========================================================================
   MODALS
   ========================================================================= */

function ModalShell({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[rgba(15,23,42,0.45)] px-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

function ReplaceSubscriptionModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <div className="flex w-[816px] max-w-full flex-col gap-8 rounded-2xl border border-[#f5b7b1] bg-white p-6">
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex w-full items-start justify-between">
            <span className="size-11" aria-hidden />
            <span className="grid size-[42px] place-items-center text-[#dc2626]">
              <WarningCircle size={42} weight="fill" />
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid size-11 place-items-center rounded-md text-[#64748b] transition hover:bg-[#f3f5ff]"
            >
              <X size={22} weight="bold" />
            </button>
          </div>

          <div className="flex w-full flex-col items-center gap-1">
            <h2 className="text-[24px] font-bold leading-8 text-[#0f172a]">
              Replace subscription?
            </h2>
            <p className="w-full text-center text-[14px] leading-5 text-[#0f172a]">
              If you replace your existing active subscription, it will be
              locked and you will stop receiving updates for it. This cannot be
              undone without upgrading.
            </p>
            <div
              className="mt-2 flex items-start justify-center gap-2 rounded-lg px-4 py-2"
              style={{ background: "rgba(255,255,255,0.4)" }}
            >
              <MagnifyingGlass
                size={14}
                weight="bold"
                className="mt-px flex-shrink-0 text-[#dc2626]"
              />
              <p className="text-[12px] leading-4 text-[#dc2626]">
                Replacing will remove access to your current subscribed data
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full items-start gap-4">
          <button
            onClick={onClose}
            className="flex h-12 flex-1 items-center justify-center rounded-lg border-[1.5px] border-[#f5b7b1] bg-white px-5 text-[16px] font-semibold leading-5 text-[#334155] transition hover:bg-[#fef2f2]"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#b91c1c] px-5 text-[16px] font-semibold leading-5 text-white transition hover:bg-[#991414]"
          >
            Yes, replace it
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function FreePlanLimitModal({
  onClose,
  onReplace,
}: {
  onClose: () => void;
  onReplace: () => void;
}) {
  return (
    <ModalShell onClose={onClose}>
      <div className="flex w-[816px] max-w-full flex-col gap-8 rounded-2xl border border-[#ffd6a5] bg-[#fff7e0] p-6">
        <div className="flex w-full flex-col items-center gap-3">
          <div className="flex w-full items-start justify-between">
            <span className="size-11" aria-hidden />
            <span className="relative grid size-12 place-items-center">
              <span className="absolute inset-1 rounded-full bg-[#ffd8a8]" />
              <Crown
                size={28}
                weight="fill"
                className="relative text-[#e67f00]"
              />
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid size-11 place-items-center rounded-md text-[#8f5100] transition hover:bg-[#fff2d6]"
            >
              <X size={22} weight="bold" />
            </button>
          </div>

          <div className="flex w-full flex-col items-center gap-1">
            <h2 className="text-[24px] font-bold leading-8 text-[#8f5100]">
              Free plan limit reached
            </h2>
            <p className="w-full text-center text-[14px] leading-5 text-[#663a00]">
              You have used your 1 free property slot. Upgrade to unlock this
              subscription or replace your existing one.
            </p>
          </div>
        </div>

        <div className="flex w-full items-start gap-4">
          <button
            onClick={onClose}
            className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#e67f00] px-5 text-[16px] font-semibold leading-5 text-white shadow-[2.267px_5.667px_17px_rgba(255,168,106,0.4)] transition hover:bg-[#cc7100]"
          >
            Upgrade to Premium
          </button>
          <button
            onClick={() => {
              onClose();
              onReplace();
            }}
            className="flex h-12 flex-1 items-center justify-center rounded-lg border border-[#ffd8a8] bg-white px-5 text-[16px] font-semibold leading-5 text-[#e67f00] transition hover:bg-[#fff8e6]"
          >
            Replace Subscription
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
