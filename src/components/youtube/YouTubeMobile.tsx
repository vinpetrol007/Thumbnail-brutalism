import { Search, Plus, User, Play, BadgeCheck, MoreVertical, Home, Clapperboard, ListVideo } from "lucide-react";
import type { FeedItem } from "./data";
import { CATEGORY_CHIPS } from "./data";

type Props = { feed: FeedItem[]; dark: boolean };

export function YouTubeMobile({ feed, dark }: Props) {
  return (
    <div className="flex justify-center w-full h-full overflow-hidden py-6">
      <div
        className="brutal-border-thick brutal-shadow-lg overflow-hidden"
        style={{ width: 360, height: 720, borderRadius: 36, padding: 6, background: "var(--brutal-ink)" }}
      >
        <div
          className={`yt-scope ${dark ? "yt-dark" : ""} w-full h-full overflow-hidden flex flex-col`}
          style={{ borderRadius: 30, background: "var(--yt-bg)", color: "var(--yt-text)", fontFamily: "var(--font-yt)" }}
        >
          {/* Header */}
          <header className="flex items-center justify-between px-4 h-14 shrink-0" style={{ background: "var(--yt-bg)" }}>
            <div className="flex items-center gap-1">
              <div className="flex items-center cursor-pointer">
                <div className="w-[22px] h-[16px] rounded-[4px] flex items-center justify-center" style={{ background: "var(--yt-red)" }}>
                  <Play className="w-[7px] h-[7px] text-white fill-white" />
                </div>
                <span className="font-medium tracking-[-0.5px] text-[18px] leading-none ml-1" style={{ fontFamily: "var(--font-yt)" }}>YouTube</span>
                <sup className="text-[9px] ml-0.5" style={{ color: "var(--yt-text-secondary)" }}>IN</sup>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Search className="w-[22px] h-[22px]" strokeWidth={1.75} />
              <Plus className="w-[22px] h-[22px]" strokeWidth={1.75} />
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-medium text-white" style={{ background: "linear-gradient(135deg,#a78bfa,#6d28d9)" }}>S</div>
            </div>
          </header>

          {/* Chips */}
          <div className="px-3 py-2 flex gap-2 overflow-x-auto shrink-0" style={{ background: "var(--yt-bg)" }}>
            {CATEGORY_CHIPS.slice(0, 6).map((chip, i) => (
              <button
                key={chip}
                className="px-3 py-[6px] rounded-lg text-[13px] whitespace-nowrap"
                style={{
                  background: i === 0 ? "var(--yt-chip-bg-active)" : "var(--yt-chip-bg)",
                  color: i === 0 ? "var(--yt-chip-text-active)" : "var(--yt-text)",
                  fontWeight: i === 0 ? 500 : 400,
                  fontFamily: "var(--font-yt)",
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Feed */}
          <main className="flex-1 overflow-y-auto" style={{ background: "var(--yt-bg)" }}>
            {feed.map((item) => (
              <MobileCard key={item.id} item={item} />
            ))}
          </main>

          {/* Bottom nav */}
          <nav className="flex justify-around items-center h-12 shrink-0 border-t" style={{ background: "var(--yt-bg)", borderColor: "var(--yt-border)" }}>
            <NavItem icon={<Home className="w-5 h-5" />} label="Home" active />
            <NavItem icon={<Clapperboard className="w-5 h-5" />} label="Shorts" />
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full flex items-center justify-center -mt-1" style={{ background: "var(--yt-text)" }}>
                <Plus className="w-5 h-5" style={{ color: "var(--yt-bg)" }} />
              </div>
            </div>
            <NavItem icon={<ListVideo className="w-5 h-5" />} label="Subs" />
            <NavItem icon={<User className="w-5 h-5" />} label="You" />
          </nav>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className="flex flex-col items-center gap-1" style={{ opacity: active ? 1 : 0.9 }}>
      {icon}
      <span className="text-[10px]" style={{ fontFamily: "var(--font-yt)", fontWeight: active ? 500 : 400 }}>{label}</span>
    </button>
  );
}

function MobileCard({ item }: { item: FeedItem }) {
  const isImage = item.thumbnail.startsWith("data:") || item.thumbnail.startsWith("http") || item.thumbnail.startsWith("/");
  const isLive = item.duration === "LIVE";
  return (
    <article className="mb-4">
      <div
        className="relative w-full aspect-video"
        style={isImage ? { backgroundImage: `url(${item.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: item.thumbnail }}
      >
        <span
          className="absolute bottom-1.5 right-1.5 px-1 py-px rounded text-[11px] font-medium text-white"
          style={{ background: isLive ? "var(--yt-red)" : "rgba(0,0,0,.8)", fontFamily: "var(--font-yt)" }}
        >
          {item.duration}
        </span>
      </div>
      <div className="flex gap-3 px-3 mt-3">
        <div className="w-9 h-9 rounded-full shrink-0" style={{ background: item.channelAvatar }} />
        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-medium leading-[1.35] line-clamp-2" style={{ color: "var(--yt-text)", fontFamily: "var(--font-yt)" }}>
            {item.title}
          </h3>
          <div className="text-[12px] mt-1 flex items-center gap-1 flex-wrap" style={{ color: "var(--yt-text-secondary)", fontFamily: "var(--font-yt)" }}>
            <span>{item.channel}</span>
            {item.verified && <BadgeCheck className="w-[13px] h-[13px]" />}
            <span>· {item.views}</span>
            {item.age !== "LIVE" && <span>· {item.age}</span>}
          </div>
        </div>
        <MoreVertical className="w-4 h-4 mt-1 shrink-0" style={{ color: "var(--yt-text-secondary)" }} />
      </div>
    </article>
  );
}
