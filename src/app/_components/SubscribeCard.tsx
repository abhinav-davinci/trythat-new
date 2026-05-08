"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BellRinging,
  BellSimple,
  Buildings,
  CheckCircle,
  Crown,
  MagnifyingGlass,
  MapPin,
  WarningCircle,
  X,
} from "@phosphor-icons/react/dist/ssr";

type ModalKind = "none" | "select" | "replace" | "limit";

type LocalityOption = { id: string; name: string; transactions: number };
type PropertyOption = {
  id: string;
  name: string;
  area: string;
  transactions: number;
};

const LOCALITIES: LocalityOption[] = [
  { id: "baner", name: "Baner", transactions: 12 },
  { id: "wakad", name: "Wakad", transactions: 8 },
  { id: "hinjewadi", name: "Hinjewadi", transactions: 8 },
  { id: "shivajinagar", name: "Shivajinagar", transactions: 12 },
  { id: "kharadi", name: "Kharadi", transactions: 8 },
  { id: "viman-nagar", name: "Viman Nagar", transactions: 8 },
];

const PROPERTIES: PropertyOption[] = [
  { id: "metro-business-park", name: "Metro Business Park", area: "Hinjewadi", transactions: 24 },
  { id: "tech-park-one", name: "Tech Park One", area: "Magarpatta", transactions: 16 },
  { id: "vista-tower", name: "Vista Tower", area: "Baner", transactions: 9 },
  { id: "crown-plaza", name: "The Crown Plaza", area: "Wakad", transactions: 11 },
  { id: "lakeview-heights", name: "Lakeview Heights", area: "Kharadi", transactions: 7 },
  { id: "skyline-residences", name: "Skyline Residences", area: "Viman Nagar", transactions: 14 },
];

export function SubscribeCard() {
  const [subscribed, setSubscribed] = useState(false);
  const [modal, setModal] = useState<ModalKind>("none");
  const [selectedLocalityId, setSelectedLocalityId] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const selectedLocality =
    LOCALITIES.find((l) => l.id === selectedLocalityId) ?? null;
  const selectedProperty =
    PROPERTIES.find((p) => p.id === selectedPropertyId) ?? null;

  const handleActivate = () => {
    setSubscribed(true);
    setModal("none");
  };

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
            onClick={() => setModal("select")}
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
              title={selectedLocality?.name ?? "Baner, Pune"}
              stat={`${selectedLocality?.transactions ?? 12} recent transactions`}
              newCount={3}
            />
            <SubscriptionTile
              icon={<Buildings size={18} weight="regular" />}
              title={selectedProperty?.name ?? "Metro Business Park"}
              stat={`${selectedProperty?.transactions ?? 24} recent transactions`}
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

      {modal === "select" && (
        <SubscriptionSelectionModal
          selectedLocalityId={selectedLocalityId}
          selectedPropertyId={selectedPropertyId}
          onSelectLocality={setSelectedLocalityId}
          onSelectProperty={setSelectedPropertyId}
          onActivate={handleActivate}
          onClose={() => setModal("none")}
        />
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
  align = "center",
}: {
  children: React.ReactNode;
  onClose: () => void;
  align?: "center" | "top";
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
      className={
        align === "top"
          ? "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[rgba(15,23,42,0.45)] p-4 pt-12 backdrop-blur-[2px]"
          : "fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[rgba(15,23,42,0.45)] p-4 backdrop-blur-[2px]"
      }
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

/* ----------------- Selection modal (Locality + Property) ----------------- */

type SelectionTab = "locality" | "property";

function SubscriptionSelectionModal({
  selectedLocalityId,
  selectedPropertyId,
  onSelectLocality,
  onSelectProperty,
  onActivate,
  onClose,
}: {
  selectedLocalityId: string | null;
  selectedPropertyId: string | null;
  onSelectLocality: (id: string | null) => void;
  onSelectProperty: (id: string | null) => void;
  onActivate: () => void;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<SelectionTab>("locality");
  const [query, setQuery] = useState("");

  const filteredLocalities = useMemo(
    () =>
      query.trim()
        ? LOCALITIES.filter((l) =>
            l.name.toLowerCase().includes(query.toLowerCase()),
          )
        : LOCALITIES,
    [query],
  );
  const filteredProperties = useMemo(
    () =>
      query.trim()
        ? PROPERTIES.filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.area.toLowerCase().includes(query.toLowerCase()),
          )
        : PROPERTIES,
    [query],
  );

  const canActivate = !!selectedLocalityId && !!selectedPropertyId;

  return (
    <ModalShell onClose={onClose}>
      <div className="flex max-h-[92vh] w-[720px] max-w-full flex-col rounded-2xl bg-white shadow-[0_3.844px_8.648px_-2.883px_rgba(24,39,75,0.12),0_5.766px_20.18px_-1.922px_rgba(24,39,75,0.12)]">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-[#e2e8f0] px-5 pb-4 pt-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid size-11 flex-shrink-0 place-items-center rounded-[22px] bg-[#ebecff] text-[#3334de]">
                <BellRinging size={20} weight="bold" />
              </span>
              <div className="flex flex-col">
                <h2 className="text-[18px] font-extrabold leading-6 text-[#0e0e58]">
                  Subscribe and Get Updates
                </h2>
                <p className="mt-0.5 text-[13px] leading-[18px] text-[#475569]">
                  Subscribe to 1 locality and 1 property on the free plan and get transaction updates
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid size-9 flex-shrink-0 place-items-center rounded-md text-[#64748b] transition hover:bg-[#f3f5ff]"
            >
              <X size={20} weight="bold" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex w-full items-center rounded-lg bg-[#f8fafc] p-1">
            <TabButton
              label="Locality"
              icon={<MapPin size={16} weight="bold" />}
              active={tab === "locality"}
              hasSelection={!!selectedLocalityId}
              onClick={() => {
                setTab("locality");
                setQuery("");
              }}
            />
            <TabButton
              label="Property"
              icon={<Buildings size={16} weight="bold" />}
              active={tab === "property"}
              hasSelection={!!selectedPropertyId}
              onClick={() => {
                setTab("property");
                setQuery("");
              }}
            />
          </div>

          {/* Search */}
          <label className="flex h-10 items-center gap-2 rounded-lg border border-[#c5c7ff] bg-white px-3 shadow-[0_0.961px_1.922px_-0.961px_rgba(24,39,75,0.12),0_1.922px_1.922px_-0.961px_rgba(24,39,75,0.08)] focus-within:border-[#6a6bff]">
            <MagnifyingGlass size={16} weight="bold" className="text-[#94a3b8]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                tab === "locality" ? "Search locality..." : "Search property..."
              }
              className="flex-1 bg-transparent text-[14px] leading-5 text-[#0f172a] placeholder:text-[#94a3b8] outline-none"
            />
          </label>
        </div>

        {/* Body (scrollable if it ever overflows) */}
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
          <p className="text-[12px] leading-4 text-[#64748b]">
            Personalise your feed by subscribing to a locality and building for transaction updates
          </p>

          <h3 className="text-[14px] font-semibold leading-5 text-[#0e0e58]">
            Popular in Pune
          </h3>

          <div className="grid grid-cols-3 gap-2.5">
            {tab === "locality"
              ? filteredLocalities.length === 0
                ? <EmptyResults label="No localities match your search" />
                : filteredLocalities.map((l) => (
                    <SuggestionCard
                      key={l.id}
                      icon={<MapPin size={12} weight="bold" />}
                      title={l.name}
                      transactions={l.transactions}
                      selected={l.id === selectedLocalityId}
                      onClick={() =>
                        onSelectLocality(l.id === selectedLocalityId ? null : l.id)
                      }
                    />
                  ))
              : filteredProperties.length === 0
                ? <EmptyResults label="No properties match your search" />
                : filteredProperties.map((p) => (
                    <SuggestionCard
                      key={p.id}
                      icon={<Buildings size={12} weight="bold" />}
                      title={p.name}
                      subtitle={p.area}
                      transactions={p.transactions}
                      selected={p.id === selectedPropertyId}
                      onClick={() =>
                        onSelectProperty(p.id === selectedPropertyId ? null : p.id)
                      }
                    />
                  ))}
          </div>

          {/* What You'll Unlock */}
          <div
            className="mt-1 flex flex-col gap-1.5 rounded-xl border border-[#ffd8a8] p-3"
            style={{ background: "rgba(255,242,224,0.5)" }}
          >
            <h4 className="text-[12px] font-semibold leading-4 text-[#0f172a]">
              What You&apos;ll Unlock
            </h4>
            <ul className="flex flex-col">
              <UnlockItem text="Get recent transaction updates" />
              <UnlockItem text="Receive rent & sale alerts" />
              <UnlockItem
                text="Free users can subscribe to 1 locality & 1 building"
                tone="warning"
              />
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex w-full items-center justify-end gap-3 border-t border-[#f1f5f9] px-5 py-3">
          <button
            onClick={onClose}
            className="flex h-10 flex-1 items-center justify-center rounded-lg border-[1.5px] border-[#e2e8f0] bg-white px-5 text-[14px] font-semibold leading-5 text-[#334155] transition hover:bg-[#f8fafc]"
          >
            Cancel
          </button>
          <button
            onClick={onActivate}
            disabled={!canActivate}
            className={
              canActivate
                ? "flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-[#3334de] px-5 text-[14px] font-semibold leading-5 text-white transition hover:bg-[#2729c7]"
                : "flex h-10 flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-[#e2e8f0] px-5 text-[14px] font-semibold leading-5 text-[#94a3b8]"
            }
          >
            <ArrowRight size={16} weight="bold" />
            Activate
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function TabButton({
  label,
  icon,
  active,
  hasSelection,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  hasSelection: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#c5c7ff] bg-[#ebecff] px-3 py-2.5 text-[13px] font-semibold leading-5 text-[#0e0e58] transition"
          : "flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2.5 text-[13px] font-medium leading-5 text-[#94a3b8] transition hover:text-[#0e0e58]"
      }
      style={{ letterSpacing: 0.28 }}
    >
      <span className={active ? "text-[#0e0e58]" : "text-[#94a3b8]"}>
        {icon}
      </span>
      {label}
      {hasSelection && (
        <CheckCircle
          size={14}
          weight="fill"
          className="text-[#16a34a]"
        />
      )}
    </button>
  );
}

function SuggestionCard({
  icon,
  title,
  subtitle,
  transactions,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  transactions: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        selected
          ? "relative flex items-start gap-2 overflow-clip rounded-xl border border-[#6a6bff] bg-[#ebecff] p-2.5 text-left shadow-[0_0_0_3px_rgba(106,107,255,0.15)] transition"
          : "relative flex items-start gap-2 overflow-clip rounded-xl border border-transparent bg-[#f8fafc] p-2.5 text-left transition hover:bg-[#eef0ff]"
      }
    >
      <span
        className={
          selected
            ? "mt-0.5 grid size-5 flex-shrink-0 place-items-center rounded-md bg-[#6a6bff] text-white"
            : "mt-0.5 grid size-5 flex-shrink-0 place-items-center rounded-md bg-[#f1f5f9] text-[#0e0e58]"
        }
      >
        {icon}
      </span>
      <div className="flex min-w-0 flex-col">
        <p
          className="truncate text-[13px] font-medium leading-[18px] text-[#0f172a]"
          style={{ letterSpacing: 0.26 }}
        >
          {title}
        </p>
        <p className="truncate text-[11px] leading-4 text-[#64748b]">
          {subtitle && (
            <span className="text-[#475569]">{subtitle} · </span>
          )}
          <span className="font-bold text-[#0f172a]">{transactions}</span>
          {" recent"}
        </p>
      </div>
      {selected && (
        <CheckCircle
          size={14}
          weight="fill"
          className="absolute right-1.5 top-1.5 text-[#6a6bff]"
        />
      )}
    </button>
  );
}

function UnlockItem({
  text,
  tone = "default",
}: {
  text: string;
  tone?: "default" | "warning";
}) {
  return (
    <li className="flex items-center gap-2 py-0.5">
      <CheckCircle
        size={13}
        weight="fill"
        className={tone === "warning" ? "text-[#e67f00]" : "text-[#16a34a]"}
      />
      <span
        className={
          tone === "warning"
            ? "text-[11.5px] leading-4 text-[#e67f00]"
            : "text-[11.5px] leading-4 text-[#334155]"
        }
      >
        {text}
      </span>
    </li>
  );
}

function EmptyResults({ label }: { label: string }) {
  return (
    <div className="col-span-3 grid place-items-center rounded-xl bg-[#f8fafc] py-8 text-[13px] text-[#64748b]">
      {label}
    </div>
  );
}

/* ---------------- Replace subscription confirmation modal ---------------- */

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

/* ---------------------- Free plan limit reached modal ---------------------- */

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
