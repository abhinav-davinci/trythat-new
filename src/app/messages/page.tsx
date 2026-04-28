"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Archive,
  ArrowRight,
  BellSimple,
  CheckCircle,
  Checks,
  DotsThreeVertical,
  DownloadSimple,
  Funnel,
  Image as ImageIcon,
  MagnifyingGlass,
  MapPin,
  Microphone,
  Paperclip,
  PaperPlaneTilt,
  Phone,
  PushPin,
  ShieldCheck,
  Smiley,
  VideoCamera,
} from "@phosphor-icons/react/dist/ssr";
import { Sidebar } from "../_components/Sidebar";

/* ============================ Types ============================ */

type Owner = {
  name: string;
  avatar: string;
  role: "Owner" | "Lister";
  phone: string;
  online: boolean;
};

type ListingRef = {
  id: string;
  title: string;
  image: string;
  bhk: string;
  area: string;
  location: string;
  price: string;
};

type Msg = {
  id: string;
  from: "owner" | "me";
  text: string;
  time: string;
  read?: boolean;
  /** day separator — render before this message */
  daySeparator?: string;
};

type Conversation = {
  id: string;
  owner: Owner;
  listing: ListingRef;
  messages: Msg[];
  pinned?: boolean;
  unread: number;
  lastTime: string;
};

/* ============================ Mock data ============================ */

const CONVERSATIONS: Conversation[] = [
  {
    id: "c-1",
    owner: {
      name: "Rajesh Sharma",
      avatar: "RS",
      role: "Owner",
      phone: "+91 98765 43210",
      online: true,
    },
    listing: {
      id: "L-1042",
      title: "Spacious 2 BHK in Mont Vert Seville",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
      bhk: "2 BHK",
      area: "968 sq.ft",
      location: "Baner, Pune",
      price: "₹89 Lakh",
    },
    pinned: true,
    unread: 2,
    lastTime: "2 min",
    messages: [
      {
        id: "m-1",
        from: "owner",
        text: "Hi! Thanks for the interest in Mont Vert Seville. Happy to share more — when would you like to visit?",
        time: "Mon 10:42 AM",
        daySeparator: "Monday, Apr 27",
      },
      {
        id: "m-2",
        from: "me",
        text: "Hi Rajesh! Could we plan a visit this weekend? I'm flexible on Sat or Sun morning.",
        time: "Mon 11:05 AM",
        read: true,
      },
      {
        id: "m-3",
        from: "owner",
        text: "Perfect. Saturday at 11 AM works for me. I'll share the gate-pass details a day in advance.",
        time: "Today 9:14 AM",
        daySeparator: "Today",
      },
      {
        id: "m-4",
        from: "owner",
        text: "Also — is parking a must-have? The unit comes with one covered slot, second one is on a waitlist.",
        time: "Today 9:15 AM",
      },
    ],
  },
  {
    id: "c-2",
    owner: {
      name: "Priya Mehta",
      avatar: "PM",
      role: "Lister",
      phone: "+91 90213 88121",
      online: false,
    },
    listing: {
      id: "L-2185",
      title: "Premium 2 BHK with Hill View",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
      bhk: "2 BHK",
      area: "1,124 sq.ft",
      location: "Baner-Mahalunge",
      price: "₹1.18 Cr",
    },
    unread: 0,
    lastTime: "1h",
    messages: [
      {
        id: "m-1",
        from: "me",
        text: "Hi Priya, can you share the brochure and floor plan?",
        time: "10:02 AM",
        read: true,
        daySeparator: "Today",
      },
      {
        id: "m-2",
        from: "owner",
        text: "Sure — sending over now. The hill-facing units are on floors 9–14, prices vary by ₹3–5L.",
        time: "10:07 AM",
      },
      {
        id: "m-3",
        from: "owner",
        text: "Brochure attached. Let me know your thoughts.",
        time: "10:08 AM",
      },
    ],
  },
  {
    id: "c-3",
    owner: {
      name: "Karan Desai",
      avatar: "KD",
      role: "Owner",
      phone: "+91 99876 12233",
      online: true,
    },
    listing: {
      id: "L-3091",
      title: "Bright 2 BHK near Balewadi High Street",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
      bhk: "2 BHK",
      area: "905 sq.ft",
      location: "Balewadi, Baner",
      price: "₹76 Lakh",
    },
    unread: 1,
    lastTime: "3h",
    messages: [
      {
        id: "m-1",
        from: "me",
        text: "Hi, is this listing still available?",
        time: "Yesterday",
        read: true,
        daySeparator: "Yesterday",
      },
      {
        id: "m-2",
        from: "owner",
        text: "Yes, the unit is still available. Want to schedule a viewing?",
        time: "Today 7:30 AM",
        daySeparator: "Today",
      },
    ],
  },
  {
    id: "c-4",
    owner: {
      name: "Anjali Iyer",
      avatar: "AI",
      role: "Lister",
      phone: "+91 91234 88102",
      online: false,
    },
    listing: {
      id: "L-4112",
      title: "3 BHK Penthouse in Kharadi",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
      bhk: "3 BHK",
      area: "2,140 sq.ft",
      location: "Kharadi, Pune",
      price: "₹2.6 Cr",
    },
    unread: 0,
    lastTime: "Yesterday",
    messages: [
      {
        id: "m-1",
        from: "me",
        text: "Could you share floor plan + amenity list?",
        time: "Yesterday 4:10 PM",
        read: true,
        daySeparator: "Yesterday",
      },
      {
        id: "m-2",
        from: "owner",
        text: "I've shared the floor plan. Pricing is firm.",
        time: "Yesterday 5:55 PM",
      },
    ],
  },
  {
    id: "c-5",
    owner: {
      name: "Vikram Joshi",
      avatar: "VJ",
      role: "Owner",
      phone: "+91 98112 33445",
      online: false,
    },
    listing: {
      id: "L-5203",
      title: "Studio Apartment in Hinjewadi Phase 2",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
      bhk: "1 RK",
      area: "440 sq.ft",
      location: "Hinjewadi, Pune",
      price: "₹38 Lakh",
    },
    unread: 0,
    lastTime: "2d",
    messages: [
      {
        id: "m-1",
        from: "me",
        text: "Hi Vikram, thanks for connecting!",
        time: "2 days ago",
        read: true,
        daySeparator: "Apr 26",
      },
      {
        id: "m-2",
        from: "owner",
        text: "Likewise — reach out if you have any questions about the unit.",
        time: "2 days ago",
      },
    ],
  },
];

/* ============================ Page ============================ */

export default function MessagesPage() {
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string>(CONVERSATIONS[0].id);
  const [tab, setTab] = useState<"all" | "unread">("all");
  const [search, setSearch] = useState("");

  const totalUnread = conversations.reduce((n, c) => n + c.unread, 0);

  const filtered = useMemo(() => {
    let list = conversations;
    if (tab === "unread") list = list.filter((c) => c.unread > 0);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.owner.name.toLowerCase().includes(q) ||
          c.listing.title.toLowerCase().includes(q) ||
          c.listing.location.toLowerCase().includes(q),
      );
    }
    // pinned first, then by lastTime ordering already set
    return [...list].sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned));
  }, [conversations, tab, search]);

  const selected =
    conversations.find((c) => c.id === selectedId) ?? conversations[0];

  // open the selected conversation: zero its unread on first view
  useEffect(() => {
    setConversations((prev) =>
      prev.map((c) => (c.id === selectedId ? { ...c, unread: 0 } : c)),
    );
  }, [selectedId]);

  const sendMessage = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id !== selectedId
          ? c
          : {
              ...c,
              lastTime: "now",
              messages: [
                ...c.messages,
                {
                  id: `me-${Date.now()}`,
                  from: "me",
                  text: t,
                  time: "just now",
                  read: false,
                },
              ],
            },
      ),
    );
    // mock owner reply after delay
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id !== selectedId
            ? c
            : {
                ...c,
                messages: [
                  ...c.messages,
                  {
                    id: `ow-${Date.now()}`,
                    from: "owner",
                    text: "Got it 👍 Let me check and revert in a few — thanks for the patience.",
                    time: "just now",
                  },
                ],
              },
        ),
      );
    }, 1100);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f4f6fb] text-[#0b1856]">
      <Sidebar active="message" />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />

        <div className="flex flex-1 overflow-hidden">
          <ConversationsPane
            conversations={filtered}
            selectedId={selectedId}
            onSelect={setSelectedId}
            tab={tab}
            onTab={setTab}
            search={search}
            onSearch={setSearch}
            totalUnread={totalUnread}
          />
          {selected ? (
            <ActiveConversation
              conversation={selected}
              onSend={sendMessage}
            />
          ) : (
            <EmptyPane />
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================ Top bar ============================ */

function TopBar() {
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

/* ============================ Conversations pane ============================ */

function ConversationsPane({
  conversations,
  selectedId,
  onSelect,
  tab,
  onTab,
  search,
  onSearch,
  totalUnread,
}: {
  conversations: Conversation[];
  selectedId: string;
  onSelect: (id: string) => void;
  tab: "all" | "unread";
  onTab: (t: "all" | "unread") => void;
  search: string;
  onSearch: (s: string) => void;
  totalUnread: number;
}) {
  return (
    <aside className="flex w-[380px] flex-shrink-0 flex-col border-r border-[#eceff7] bg-white">
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-bold leading-tight text-[#0b1856]">
              Messages
            </h1>
            <p className="text-[12px] text-[#6c7693]">
              Direct chats with property owners &amp; listers
            </p>
          </div>
          <button
            className="grid h-9 w-9 place-items-center rounded-lg border border-[#eceff7] text-[#4b5575] transition hover:bg-[#f3f5ff] hover:text-[#2c39d6]"
            aria-label="Filter"
          >
            <Funnel size={16} weight="regular" />
          </button>
        </div>

        <label className="mt-3 flex h-9 items-center gap-2 rounded-lg border border-[#eceff7] bg-[#fafbff] px-3 focus-within:border-[#2c39d6] focus-within:bg-white">
          <MagnifyingGlass size={14} className="text-[#9aa3c0]" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by name, property, or area"
            className="h-full flex-1 bg-transparent text-[12.5px] text-[#0b1856] outline-none placeholder:text-[#9aa3c0]"
          />
        </label>

        <div className="mt-3 flex items-center gap-1 rounded-lg bg-[#f3f5fb] p-1 text-[12px] font-semibold">
          <TabBtn active={tab === "all"} onClick={() => onTab("all")}>
            All
            <span className="ml-1.5 rounded-full bg-white px-1.5 text-[10.5px] text-[#6c7693]">
              {conversations.length}
            </span>
          </TabBtn>
          <TabBtn active={tab === "unread"} onClick={() => onTab("unread")}>
            Unread
            {totalUnread > 0 && (
              <span className="ml-1.5 rounded-full bg-[#ef4444] px-1.5 text-[10.5px] text-white">
                {totalUnread}
              </span>
            )}
          </TabBtn>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="px-6 py-10 text-center text-[12.5px] text-[#9aa3c0]">
            No conversations match your search.
          </div>
        ) : (
          <ul className="flex flex-col gap-0.5 px-2 pb-3">
            {conversations.map((c) => (
              <li key={c.id}>
                <ConversationRow
                  conversation={c}
                  active={c.id === selectedId}
                  onClick={() => onSelect(c.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1 rounded-md py-1.5 transition ${
        active
          ? "bg-white text-[#2c39d6] shadow-sm"
          : "text-[#6c7693] hover:text-[#0b1856]"
      }`}
    >
      {children}
    </button>
  );
}

/* ============================ Conversation row ============================ */

function ConversationRow({
  conversation,
  active,
  onClick,
}: {
  conversation: Conversation;
  active: boolean;
  onClick: () => void;
}) {
  const last = conversation.messages[conversation.messages.length - 1];
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition ${
        active
          ? "bg-gradient-to-r from-[#eef1ff] to-[#f5f7ff] ring-1 ring-[#dde2f7]"
          : "hover:bg-[#f6f8ff]"
      }`}
    >
      <div className="relative flex-shrink-0">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#fff3e9] to-[#ffe0cc] text-[12px] font-bold text-[#e07a1f]">
          {conversation.owner.avatar}
        </div>
        {conversation.owner.online && (
          <span className="absolute -bottom-0.5 -right-0.5 grid h-3 w-3 place-items-center rounded-full bg-white">
            <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-[13.5px] font-semibold text-[#0b1856]">
            {conversation.owner.name}
          </span>
          <CheckCircle
            size={12}
            weight="fill"
            className="flex-shrink-0 text-[#2c39d6]"
          />
          <span className="ml-auto flex-shrink-0 text-[10.5px] text-[#9aa3c0]">
            {conversation.lastTime}
          </span>
        </div>

        <div className="mt-0.5 flex items-center gap-1.5 text-[10.5px] text-[#6c7693]">
          <span className="rounded-sm bg-[#eef1ff] px-1.5 py-px text-[10px] font-semibold text-[#2c39d6]">
            {conversation.owner.role}
          </span>
          <span className="truncate">
            {conversation.listing.bhk} · {conversation.listing.location}
          </span>
        </div>

        <div className="mt-1.5 flex items-center gap-2">
          <div className="relative h-9 w-12 flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={conversation.listing.image}
              alt=""
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[11.5px] font-medium text-[#1f2747]">
              {last.from === "me" && (
                <span className="mr-1 inline-flex items-center text-[#9aa3c0]">
                  <Checks size={11} weight="bold" />
                </span>
              )}
              {last.from === "me" ? "You: " : ""}
              {last.text}
            </div>
          </div>
          {conversation.unread > 0 && (
            <span className="grid h-5 min-w-5 flex-shrink-0 place-items-center rounded-full bg-[#2c39d6] px-1.5 text-[10px] font-semibold text-white">
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

/* ============================ Active conversation ============================ */

function ActiveConversation({
  conversation,
  onSend,
}: {
  conversation: Conversation;
  onSend: (text: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({
      top: threadRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [conversation.messages.length, conversation.id]);

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-[#f9faff]">
      {/* Owner header */}
      <div className="flex items-center justify-between border-b border-[#eceff7] bg-white px-5 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#fff3e9] to-[#ffe0cc] text-[13px] font-bold text-[#e07a1f]">
              {conversation.owner.avatar}
            </div>
            {conversation.owner.online && (
              <span className="absolute -bottom-0.5 -right-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-white">
                <span className="h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
              </span>
            )}
          </div>
          <div className="min-w-0 leading-tight">
            <div className="flex items-center gap-1.5 text-[15px] font-semibold text-[#0b1856]">
              {conversation.owner.name}
              <CheckCircle size={13} weight="fill" className="text-[#2c39d6]" />
              <span className="ml-1.5 inline-flex items-center gap-1 rounded-full bg-[#eaf8ef] px-2 py-0.5 text-[10.5px] font-semibold text-[#16a34a]">
                <ShieldCheck size={11} weight="fill" /> Verified {conversation.owner.role}
              </span>
            </div>
            <div className="text-[11.5px] text-[#6c7693]">
              {conversation.owner.online
                ? "Online · usually replies in ~10 min"
                : "Last seen recently · replies in ~1h"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={`tel:${conversation.owner.phone.replace(/\s+/g, "")}`}
            className="grid h-9 w-9 place-items-center rounded-lg bg-[#eaf8ef] text-[#16a34a] transition hover:opacity-90"
            aria-label="Call"
          >
            <Phone size={16} weight="fill" />
          </a>
          <button
            className="grid h-9 w-9 place-items-center rounded-lg bg-[#eef1ff] text-[#2c39d6] transition hover:opacity-90"
            aria-label="Video call"
          >
            <VideoCamera size={16} weight="fill" />
          </button>
          <button
            className="grid h-9 w-9 place-items-center rounded-lg text-[#9aa3c0] transition hover:bg-[#f3f5ff] hover:text-[#0b1856]"
            aria-label="Pin"
          >
            <PushPin size={16} weight={conversation.pinned ? "fill" : "regular"} />
          </button>
          <button
            className="grid h-9 w-9 place-items-center rounded-lg text-[#9aa3c0] transition hover:bg-[#f3f5ff] hover:text-[#0b1856]"
            aria-label="Archive"
          >
            <Archive size={16} />
          </button>
          <button
            className="grid h-9 w-9 place-items-center rounded-lg text-[#9aa3c0] transition hover:bg-[#f3f5ff] hover:text-[#0b1856]"
            aria-label="More"
          >
            <DotsThreeVertical size={16} weight="bold" />
          </button>
        </div>
      </div>

      {/* Property pinned context */}
      <div className="mx-5 mt-4 flex items-center gap-3 rounded-2xl border border-[#eceff7] bg-white p-3">
        <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={conversation.listing.image}
            alt={conversation.listing.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="truncate text-[13px] font-bold text-[#0b1856]">
            {conversation.listing.title}
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-[11.5px] text-[#6c7693]">
            <MapPin size={11} weight="regular" />
            {conversation.listing.location} · {conversation.listing.bhk} ·{" "}
            {conversation.listing.area}
          </div>
        </div>
        <div className="text-right leading-tight">
          <div className="text-[14px] font-bold text-[#0b1856]">
            {conversation.listing.price}
          </div>
          <button className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#2c39d6]">
            View listing <ArrowRight size={11} weight="bold" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={threadRef} className="flex-1 overflow-y-auto px-5 pt-4 pb-4">
        <div className="mx-auto flex max-w-[760px] flex-col gap-2.5">
          {conversation.messages.map((m) => (
            <MessageGroup
              key={m.id}
              msg={m}
              ownerAvatar={conversation.owner.avatar}
            />
          ))}
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-[#eceff7] bg-white px-5 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSend(draft);
            setDraft("");
          }}
          className="flex items-center gap-2 rounded-2xl border border-[#dde2f7] bg-[#f9faff] px-3 py-2 focus-within:border-[#2c39d6] focus-within:bg-white"
        >
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-md text-[#9aa3c0] transition hover:bg-[#eef1ff] hover:text-[#2c39d6]"
            aria-label="Emoji"
          >
            <Smiley size={16} />
          </button>
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
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Message ${conversation.owner.name.split(" ")[0]}…`}
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
            disabled={!draft.trim()}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-[#3a4af0] to-[#2c39d6] px-4 py-2 text-[13px] font-semibold text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <PaperPlaneTilt size={14} weight="fill" /> Send
          </button>
        </form>
        <div className="mt-1.5 flex items-center justify-center gap-1 text-[10px] text-[#9aa3c0]">
          <ShieldCheck size={11} weight="fill" />
          End-to-end private — only you and{" "}
          {conversation.owner.name.split(" ")[0]} can see this conversation.
        </div>
      </div>
    </section>
  );
}

/* ============================ Message group (with day separator) ============================ */

function MessageGroup({
  msg,
  ownerAvatar,
}: {
  msg: Msg;
  ownerAvatar: string;
}) {
  return (
    <>
      {msg.daySeparator && (
        <div className="my-3 flex items-center justify-center">
          <span className="rounded-full bg-[#f3f5ff] px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-[#6c7693]">
            {msg.daySeparator}
          </span>
        </div>
      )}
      {msg.from === "owner" ? (
        <div className="flex max-w-[78%] gap-2">
          <div className="grid h-8 w-8 flex-shrink-0 place-items-center self-end rounded-full bg-gradient-to-br from-[#fff3e9] to-[#ffe0cc] text-[10.5px] font-bold text-[#e07a1f]">
            {ownerAvatar}
          </div>
          <div>
            <div className="rounded-2xl rounded-bl-sm border border-[#eceff7] bg-white px-3.5 py-2.5 text-[13.5px] leading-relaxed text-[#1f2747] shadow-[0_1px_3px_rgba(11,24,86,0.04)]">
              {msg.text}
            </div>
            <div className="mt-1 pl-1 text-[10px] text-[#9aa3c0]">{msg.time}</div>
          </div>
        </div>
      ) : (
        <div className="ml-auto flex max-w-[78%] flex-col items-end">
          <div className="rounded-2xl rounded-br-sm bg-gradient-to-br from-[#3a4af0] to-[#2c39d6] px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white shadow-md">
            {msg.text}
          </div>
          <div className="mt-1 flex items-center gap-1 pr-1 text-[10px] text-[#9aa3c0]">
            {msg.time}
            <Checks
              size={11}
              weight="bold"
              className={msg.read ? "text-[#2c39d6]" : "text-[#9aa3c0]"}
            />
          </div>
        </div>
      )}
    </>
  );
}

/* ============================ Empty pane ============================ */

function EmptyPane() {
  return (
    <section className="flex min-w-0 flex-1 flex-col items-center justify-center bg-[#f9faff] px-8 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#3a4af0] to-[#2c39d6] text-white shadow-lg">
        <ShieldCheck size={28} weight="fill" />
      </div>
      <h2 className="mt-4 text-[22px] font-bold text-[#0b1856]">
        Your private inbox
      </h2>
      <p className="mt-2 max-w-[420px] text-[13px] text-[#4b5575]">
        All conversations with property owners and listers — encrypted and
        broker-free. Pick a chat from the left to continue.
      </p>
    </section>
  );
}
