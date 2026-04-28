"use client";

import Image from "next/image";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Bathtub,
  Bed,
  BellSimple,
  ChatCircleText,
  ChatTeardropDots,
  CheckCircle,
  DownloadSimple,
  Image as ImageIcon,
  MapPin,
  Microphone,
  Paperclip,
  PaperPlaneTilt,
  Phone,
  Resize,
  ShieldCheck,
  Sparkle,
  Star,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { Sidebar } from "../_components/Sidebar";

/* ============================ Types ============================ */

type Owner = {
  name: string;
  avatar: string; // initials
  role: "Owner" | "Lister";
  phone: string;
};

type Listing = {
  id: string;
  title: string;
  price: string;
  pricePerSqft: string;
  location: string;
  bhk: string;
  bath: string;
  area: string;
  furnished: string;
  status: string;
  rating: number;
  amenities: string[];
  image: string;
  owner: Owner;
  posted: string;
  rera: string;
};

type Message =
  | { id: string; kind: "user"; text: string }
  | {
      id: string;
      kind: "ai";
      intro: string;
      listings?: Listing[];
      followUps?: string[];
      outro?: string;
    };

type DM = {
  id: string;
  from: "owner" | "me";
  text: string;
  time: string;
};

/* ============================ Mock data ============================ */

const MOCK_LISTINGS: Listing[] = [
  {
    id: "L-1042",
    title: "Spacious 2 BHK in Mont Vert Seville, Baner",
    price: "₹89 Lakh",
    pricePerSqft: "₹9,200 / sq.ft",
    location: "Baner, Pune",
    bhk: "2 BHK",
    bath: "2 Bath",
    area: "968 sq.ft",
    furnished: "Semi-Furnished",
    status: "Ready to Move",
    rating: 4.6,
    amenities: ["Gym", "Pool", "24×7 Security", "Power Backup"],
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80",
    owner: {
      name: "Rajesh Sharma",
      avatar: "RS",
      role: "Owner",
      phone: "+91 98765 43210",
    },
    posted: "Posted 3 days ago",
    rera: "P52100012345",
  },
  {
    id: "L-2185",
    title: "Premium 2 BHK with Hill View, Baner-Mahalunge",
    price: "₹1.18 Cr",
    pricePerSqft: "₹10,500 / sq.ft",
    location: "Baner-Mahalunge, Pune",
    bhk: "2 BHK",
    bath: "2 Bath",
    area: "1,124 sq.ft",
    furnished: "Fully Furnished",
    status: "Possession Mar 2027",
    rating: 4.8,
    amenities: ["Clubhouse", "Garden", "EV Charging", "Concierge"],
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80",
    owner: {
      name: "Priya Mehta",
      avatar: "PM",
      role: "Lister",
      phone: "+91 90213 88121",
    },
    posted: "Posted 1 week ago",
    rera: "P52100098217",
  },
  {
    id: "L-3091",
    title: "Bright 2 BHK Apartment near Balewadi High Street",
    price: "₹76 Lakh",
    pricePerSqft: "₹8,400 / sq.ft",
    location: "Balewadi, Baner",
    bhk: "2 BHK",
    bath: "2 Bath",
    area: "905 sq.ft",
    furnished: "Unfurnished",
    status: "Ready to Move",
    rating: 4.4,
    amenities: ["Lift", "Parking", "Visitor Parking", "Park"],
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80",
    owner: {
      name: "Karan Desai",
      avatar: "KD",
      role: "Owner",
      phone: "+91 99876 12233",
    },
    posted: "Posted 5 days ago",
    rera: "P52100073921",
  },
];

/* ============================ Helpers ============================ */

function buildAiResponse(query: string): Message[] {
  const trimmed = query.trim();
  const userMsg: Message = {
    id: `u-${Date.now()}`,
    kind: "user",
    text: trimmed,
  };

  const lower = trimmed.toLowerCase();
  const wantsListings =
    /(\bbhk\b|\bflat\b|\bapartment\b|\bproperty\b|\brent\b|\bbuy\b|\bbaner\b|\bpune\b|\bunder\b)/.test(
      lower,
    );

  if (wantsListings) {
    const aiMsg: Message = {
      id: `a-${Date.now()}`,
      kind: "ai",
      intro:
        `I found 3 strong matches for “${trimmed}”. I've ranked them on price-per-sq.ft, RERA verification, and amenities — all owner-listed, no broker fees.`,
      listings: MOCK_LISTINGS,
      followUps: [
        "Show only ready-to-move",
        "Sort by ₹/sq.ft",
        "Compare on rental yield",
        "Filter under ₹1 Cr",
      ],
      outro:
        "Tap Instant Connect on any listing to talk to the owner directly.",
    };
    return [userMsg, aiMsg];
  }

  const aiMsg: Message = {
    id: `a-${Date.now()}`,
    kind: "ai",
    intro: `Got it. To recommend properties or insights, share what you're looking for — for example, BHK, area, or budget. Or pick a quick start below.`,
    followUps: [
      "2 BHK in Baner under ₹1 Cr",
      "Best ROI areas in Pune 2026",
      "Ready-to-move 3 BHK Hinjewadi",
      "Show RERA-verified listings",
    ],
  };
  return [userMsg, aiMsg];
}

/* ============================ Page ============================ */

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-[#f4f6fb] text-[#0b1856]">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#3a4af0] to-[#2c39d6] text-white shadow-lg">
            <Sparkle size={22} weight="fill" />
          </div>
        </div>
      }
    >
      <ChatPageInner />
    </Suspense>
  );
}

function ChatPageInner() {
  const search = useSearchParams();
  const initialQuery = search.get("q") ?? "";

  const initialMessages = useMemo<Message[]>(() => {
    if (initialQuery.trim()) return buildAiResponse(initialQuery);
    return [];
  }, [initialQuery]);

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [dmListing, setDmListing] = useState<Listing | null>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const prevCount = useRef(messages.length);

  useEffect(() => {
    // Only auto-scroll to bottom when a *new* message is appended,
    // not on first paint (so the user sees their query at the top).
    if (messages.length > prevCount.current) {
      threadRef.current?.scrollTo({
        top: threadRef.current.scrollHeight,
        behavior: prevCount.current === 0 ? "auto" : "smooth",
      });
    }
    prevCount.current = messages.length;
  }, [messages.length]);

  const handleSend = (text?: string) => {
    const value = (text ?? input).trim();
    if (!value) return;
    setMessages((prev) => [...prev, ...buildAiResponse(value)]);
    setInput("");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f4f6fb] text-[#0b1856]">
      <Sidebar active="ai-chat" />

      <div className="flex min-w-0 flex-1 flex-col">
        <ChatTopBar />

        <div
          ref={threadRef}
          className="flex-1 overflow-y-auto px-8 pb-32 pt-6"
        >
          <div className="mx-auto w-full max-w-[920px]">
            {messages.length === 0 ? (
              <EmptyState onPick={(q) => handleSend(q)} />
            ) : (
              <div className="flex flex-col gap-6">
                {messages.map((m) =>
                  m.kind === "user" ? (
                    <UserBubble key={m.id} text={m.text} />
                  ) : (
                    <AiBubble
                      key={m.id}
                      msg={m}
                      onMessageOwner={(l) => setDmListing(l)}
                      onSuggestion={(q) => handleSend(q)}
                    />
                  ),
                )}
              </div>
            )}
          </div>
        </div>

        <ChatComposer
          value={input}
          onChange={setInput}
          onSend={() => handleSend()}
        />
      </div>

      {dmListing && (
        <OwnerDMDrawer
          listing={dmListing}
          onClose={() => setDmListing(null)}
        />
      )}
    </div>
  );
}

/* ============================ Top bar ============================ */

function ChatTopBar() {
  return (
    <header className="flex h-[64px] flex-shrink-0 items-center justify-between border-b border-[#eceff7] bg-white px-6">
      <div className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-[#eef1ff] text-[#2c39d6]">
          <MapPin size={18} weight="fill" />
        </div>
        <div className="leading-tight">
          <div className="flex items-center gap-2 text-[14px] font-semibold">
            Pune City
            <button className="text-[12px] font-medium text-[#2c39d6] underline underline-offset-2">
              Change
            </button>
          </div>
          <div className="text-[11.5px] text-[#6c7693]">
            Hinjewadi, Pune, Maharashtra, India..
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-lg border border-[#dfe3f3] px-3.5 py-1.5 text-[13px] font-semibold text-[#2c39d6] transition hover:bg-[#f3f5ff]">
          <DownloadSimple size={16} weight="bold" /> Download App
        </button>
        <button className="relative grid h-9 w-9 place-items-center rounded-full text-[#0b1856] transition hover:bg-[#f3f5ff]">
          <BellSimple size={20} />
          <span className="absolute -top-0.5 -right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#ef4444] px-1 text-[10px] font-semibold text-white">
            14
          </span>
        </button>
        <Image
          src="/assets/profile.png"
          alt="Profile"
          width={36}
          height={36}
          className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
        />
      </div>
    </header>
  );
}

/* ============================ Empty state ============================ */

function EmptyState({ onPick }: { onPick: (q: string) => void }) {
  const samples = [
    "2 BHK in Baner under ₹1 Cr",
    "Best ROI areas in Pune 2026",
    "Ready-to-move 3 BHK in Hinjewadi",
    "Compare Wakad vs Baner on price growth",
  ];
  return (
    <div className="mt-10 flex flex-col items-center text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#3a4af0] to-[#2c39d6] text-white shadow-lg">
        <Sparkle size={26} weight="fill" />
      </div>
      <h2 className="mt-4 text-[28px] font-bold leading-tight">
        Hey Sayali — what are we exploring today?
      </h2>
      <p className="mt-2 max-w-[520px] text-[14px] text-[#4b5575]">
        Welcome to{" "}
        <span className="font-semibold text-[#0b1856]">TryThat.ai</span>, your
        <span className="font-semibold text-[#e07a1f]"> AI Property Advisor</span>.
        Ask anything from listings to legal — I'll back every answer with RERA
        and IGR data.
      </p>

      <div className="mt-6 grid w-full max-w-[760px] grid-cols-2 gap-3">
        {samples.map((s) => (
          <button
            key={s}
            onClick={() => onPick(s)}
            className="flex items-center justify-between gap-3 rounded-xl border border-[#eceff7] bg-white px-4 py-3 text-left text-[13px] font-medium text-[#0b1856] transition hover:border-[#dde2f7] hover:bg-[#f9faff]"
          >
            <span>{s}</span>
            <ArrowRight size={14} weight="bold" className="text-[#2c39d6]" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================ User bubble ============================ */

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="flex max-w-[78%] items-start gap-2.5">
        <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-[#3a4af0] to-[#2c39d6] px-4 py-2.5 text-[14px] text-white shadow-md">
          {text}
        </div>
        <Image
          src="/assets/profile.png"
          alt="You"
          width={32}
          height={32}
          className="h-8 w-8 flex-shrink-0 rounded-full object-cover ring-2 ring-white"
        />
      </div>
    </div>
  );
}

/* ============================ AI bubble + listings ============================ */

function AiBubble({
  msg,
  onMessageOwner,
  onSuggestion,
}: {
  msg: Extract<Message, { kind: "ai" }>;
  onMessageOwner: (l: Listing) => void;
  onSuggestion: (q: string) => void;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#3a4af0] to-[#2c39d6] text-white shadow-md">
        <Sparkle size={18} weight="fill" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="rounded-2xl rounded-tl-sm border border-[#eceff7] bg-white px-4 py-3 shadow-[0_2px_8px_rgba(11,24,86,0.04)]">
          <p className="text-[14px] leading-relaxed text-[#1f2747]">
            {msg.intro}
          </p>

          {msg.listings && (
            <div className="mt-3 flex flex-col gap-3">
              {msg.listings.map((l) => (
                <ListingCard
                  key={l.id}
                  listing={l}
                  onMessageOwner={onMessageOwner}
                />
              ))}
            </div>
          )}

          {msg.outro && (
            <p className="mt-3 text-[13px] text-[#4b5575]">{msg.outro}</p>
          )}

          {msg.followUps && msg.followUps.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {msg.followUps.map((f) => (
                <button
                  key={f}
                  onClick={() => onSuggestion(f)}
                  className="rounded-full border border-[#dde2f7] bg-[#f6f8ff] px-3 py-1.5 text-[12px] font-medium text-[#2c39d6] transition hover:bg-[#eef1ff]"
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================ Listing card ============================ */

function ListingCard({
  listing,
  onMessageOwner,
}: {
  listing: Listing;
  onMessageOwner: (l: Listing) => void;
}) {
  const [open, setOpen] = useState(false);

  // close on outside click
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!cardRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl border border-[#eceff7] bg-white"
    >
      <div className="flex">
        <div className="relative h-[180px] w-[230px] flex-shrink-0 overflow-hidden rounded-l-2xl">
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            sizes="230px"
            className="object-cover"
          />
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-[10.5px] font-semibold text-[#0b1856] shadow-sm">
            <ShieldCheck size={11} weight="fill" className="text-[#16a34a]" />
            RERA · {listing.rera}
          </span>
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md bg-[#0b1856]/85 px-2 py-1 text-[10.5px] font-semibold text-white">
            <Star size={11} weight="fill" className="text-[#fbbf24]" />
            {listing.rating}
          </span>
        </div>

        <div className="min-w-0 flex-1 p-3.5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[14.5px] font-bold leading-tight text-[#0b1856]">
                {listing.title}
              </div>
              <div className="mt-1 flex items-center gap-1 text-[12px] text-[#6c7693]">
                <MapPin size={12} weight="regular" />
                {listing.location} · {listing.posted}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[16px] font-bold leading-none text-[#0b1856]">
                {listing.price}
              </div>
              <div className="mt-0.5 text-[10.5px] text-[#6c7693]">
                {listing.pricePerSqft}
              </div>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px] text-[#4b5575]">
            <Spec icon={<Bed size={13} />} value={listing.bhk} />
            <Spec icon={<Bathtub size={13} />} value={listing.bath} />
            <Spec icon={<Resize size={13} />} value={listing.area} />
            <span className="rounded-md bg-[#eef1ff] px-2 py-0.5 text-[10.5px] font-semibold text-[#2c39d6]">
              {listing.furnished}
            </span>
            <span className="rounded-md bg-[#eaf8ef] px-2 py-0.5 text-[10.5px] font-semibold text-[#16a34a]">
              {listing.status}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {listing.amenities.map((a) => (
              <span
                key={a}
                className="rounded-full border border-[#eceff7] bg-[#fafbff] px-2 py-0.5 text-[10.5px] text-[#4b5575]"
              >
                {a}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#fff3e9] to-[#ffe0cc] text-[11px] font-bold text-[#e07a1f]">
                {listing.owner.avatar}
              </div>
              <div className="leading-tight">
                <div className="text-[12px] font-semibold text-[#0b1856]">
                  {listing.owner.name}
                </div>
                <div className="text-[10.5px] text-[#6c7693]">
                  {listing.owner.role} · No brokerage
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-[#3a4af0] to-[#2c39d6] px-3 py-1.5 text-[12px] font-semibold text-white shadow-md transition hover:opacity-95"
              >
                <Sparkle size={12} weight="fill" /> Instant Connect
              </button>

              {open && (
                <div className="absolute right-0 top-[calc(100%+6px)] z-20 w-[200px] overflow-hidden rounded-xl border border-[#eceff7] bg-white shadow-[0_16px_40px_rgba(11,24,86,0.12)]">
                  <div className="border-b border-[#eceff7] px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#9aa3c0]">
                    Connect with {listing.owner.name.split(" ")[0]}
                  </div>
                  <a
                    href={`tel:${listing.owner.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-[13px] text-[#0b1856] transition hover:bg-[#f3f5ff]"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-md bg-[#eaf8ef] text-[#16a34a]">
                      <Phone size={14} weight="fill" />
                    </span>
                    <div className="leading-tight">
                      <div className="font-semibold">Call Now</div>
                      <div className="text-[10.5px] text-[#6c7693]">
                        {listing.owner.phone}
                      </div>
                    </div>
                  </a>
                  <button
                    onClick={() => {
                      setOpen(false);
                      onMessageOwner(listing);
                    }}
                    className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[13px] text-[#0b1856] transition hover:bg-[#f3f5ff]"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-md bg-[#eef1ff] text-[#2c39d6]">
                      <ChatCircleText size={14} weight="fill" />
                    </span>
                    <div className="leading-tight">
                      <div className="font-semibold">Message</div>
                      <div className="text-[10.5px] text-[#6c7693]">
                        Private DM with owner
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <span className="flex items-center gap-1 text-[12px] text-[#4b5575]">
      <span className="text-[#9aa3c0]">{icon}</span>
      {value}
    </span>
  );
}

/* ============================ Composer ============================ */

function ChatComposer({
  value,
  onChange,
  onSend,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="border-t border-[#eceff7] bg-white px-8 py-3">
      <div className="mx-auto w-full max-w-[920px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSend();
          }}
          className="flex items-center gap-2 rounded-2xl border border-[#dde2f7] bg-[#f9faff] px-3 py-2 focus-within:border-[#2c39d6] focus-within:bg-white"
        >
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-md text-[#9aa3c0] transition hover:bg-[#eef1ff] hover:text-[#2c39d6]"
            aria-label="Attach"
          >
            <Paperclip size={16} />
          </button>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-md text-[#9aa3c0] transition hover:bg-[#eef1ff] hover:text-[#2c39d6]"
            aria-label="Image"
          >
            <ImageIcon size={16} />
          </button>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ask anything — listings, legal, RERA, price trends…"
            className="h-9 flex-1 bg-transparent text-[14px] text-[#0b1856] outline-none placeholder:text-[#9aa3c0]"
          />
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-md text-[#9aa3c0] transition hover:bg-[#eef1ff] hover:text-[#2c39d6]"
            aria-label="Voice"
          >
            <Microphone size={16} />
          </button>
          <button
            type="submit"
            disabled={!value.trim()}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-[#3a4af0] to-[#2c39d6] px-4 py-2 text-[13px] font-semibold text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <PaperPlaneTilt size={14} weight="fill" /> Send
          </button>
        </form>
        <p className="mt-1.5 text-center text-[10.5px] text-[#9aa3c0]">
          ALON can make mistakes. Cross-check listings on RERA before
          transacting.
        </p>
      </div>
    </div>
  );
}

/* ============================ Owner DM drawer ============================ */

function OwnerDMDrawer({
  listing,
  onClose,
}: {
  listing: Listing;
  onClose: () => void;
}) {
  const [thread, setThread] = useState<DM[]>(() => [
    {
      id: "s-1",
      from: "owner",
      text: `Hi! Thanks for the interest in ${listing.title.replace(
        /^.*?in /,
        "the property in ",
      )}. Happy to share more info — when would you like to visit?`,
      time: "just now",
    },
  ]);
  const [draft, setDraft] = useState("");
  const dmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dmRef.current?.scrollTo({
      top: dmRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [thread.length]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const send = () => {
    const t = draft.trim();
    if (!t) return;
    const myMsg: DM = {
      id: `me-${Date.now()}`,
      from: "me",
      text: t,
      time: "just now",
    };
    setThread((prev) => [...prev, myMsg]);
    setDraft("");
    // mock owner reply after a short delay
    setTimeout(() => {
      setThread((prev) => [
        ...prev,
        {
          id: `ow-${Date.now()}`,
          from: "owner",
          text: "Got it 👍 I'll share a brochure and a couple of slots. Are weekends easier for a visit?",
          time: "just now",
        },
      ]);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-30 flex">
      <button
        aria-label="Close"
        onClick={onClose}
        className="flex-1 bg-[#0b1856]/40 backdrop-blur-[1px]"
      />
      <div className="flex h-full w-[420px] flex-col bg-white shadow-[0_-10px_40px_rgba(11,24,86,0.2)]">
        {/* header */}
        <div className="flex items-center gap-3 border-b border-[#eceff7] px-4 py-3">
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md text-[#9aa3c0] transition hover:bg-[#f3f5ff]"
            aria-label="Back"
          >
            <X size={16} weight="bold" />
          </button>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#fff3e9] to-[#ffe0cc] text-[13px] font-bold text-[#e07a1f]">
            {listing.owner.avatar}
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="flex items-center gap-1.5 text-[14px] font-semibold text-[#0b1856]">
              {listing.owner.name}
              <CheckCircle
                size={13}
                weight="fill"
                className="text-[#2c39d6]"
              />
            </div>
            <div className="truncate text-[11.5px] text-[#6c7693]">
              {listing.owner.role} · usually replies in ~10 min
            </div>
          </div>
          <a
            href={`tel:${listing.owner.phone.replace(/\s+/g, "")}`}
            className="grid h-8 w-8 place-items-center rounded-md bg-[#eaf8ef] text-[#16a34a] transition hover:opacity-90"
          >
            <Phone size={14} weight="fill" />
          </a>
        </div>

        {/* property pin */}
        <div className="mx-4 mt-3 flex gap-3 rounded-xl border border-[#eceff7] bg-[#fafbff] p-2.5">
          <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={listing.image}
              alt={listing.title}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-[12.5px] font-semibold text-[#0b1856]">
              {listing.title}
            </div>
            <div className="mt-0.5 text-[11px] text-[#6c7693]">
              {listing.bhk} · {listing.area} · {listing.location}
            </div>
            <div className="mt-0.5 text-[12px] font-bold text-[#0b1856]">
              {listing.price}
            </div>
          </div>
        </div>

        {/* messages */}
        <div ref={dmRef} className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-2.5">
            <div className="self-center rounded-full bg-[#f3f5ff] px-3 py-1 text-[10.5px] font-medium text-[#6c7693]">
              Conversation started · Today
            </div>
            {thread.map((m) =>
              m.from === "owner" ? (
                <div key={m.id} className="flex max-w-[80%] gap-2">
                  <div className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#fff3e9] to-[#ffe0cc] text-[10.5px] font-bold text-[#e07a1f]">
                    {listing.owner.avatar}
                  </div>
                  <div>
                    <div className="rounded-2xl rounded-tl-sm border border-[#eceff7] bg-[#fafbff] px-3 py-2 text-[13px] text-[#1f2747]">
                      {m.text}
                    </div>
                    <div className="mt-0.5 pl-1 text-[10px] text-[#9aa3c0]">
                      {m.time}
                    </div>
                  </div>
                </div>
              ) : (
                <div key={m.id} className="ml-auto flex max-w-[80%] flex-col items-end">
                  <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-[#3a4af0] to-[#2c39d6] px-3 py-2 text-[13px] text-white">
                    {m.text}
                  </div>
                  <div className="mt-0.5 pr-1 text-[10px] text-[#9aa3c0]">
                    {m.time}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {/* composer */}
        <div className="border-t border-[#eceff7] p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 rounded-xl border border-[#dde2f7] bg-[#f9faff] px-2 py-1.5 focus-within:border-[#2c39d6] focus-within:bg-white"
          >
            <button
              type="button"
              className="grid h-7 w-7 place-items-center rounded-md text-[#9aa3c0] transition hover:bg-[#eef1ff] hover:text-[#2c39d6]"
              aria-label="Attach"
            >
              <Paperclip size={14} />
            </button>
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Message ${listing.owner.name.split(" ")[0]}…`}
              className="h-8 flex-1 bg-transparent text-[13px] text-[#0b1856] outline-none placeholder:text-[#9aa3c0]"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-[#3a4af0] to-[#2c39d6] text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send"
            >
              <PaperPlaneTilt size={14} weight="fill" />
            </button>
          </form>
          <div className="mt-1.5 flex items-center justify-center gap-1 text-[10px] text-[#9aa3c0]">
            <ChatTeardropDots size={11} weight="fill" />
            End-to-end private — only you and {listing.owner.name.split(" ")[0]}
            .
          </div>
        </div>
      </div>
    </div>
  );
}
