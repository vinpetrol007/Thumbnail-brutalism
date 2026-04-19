import { Menu, Search, Mic, Video, Bell, Home, Play, Clapperboard, History, ListVideo, Clock, ThumbsUp, Download, ShoppingBag, Music2, Newspaper, Trophy, Lightbulb, Shirt, ChevronRight, MoreVertical, BadgeCheck } from "lucide-react";
import type { FeedItem } from "./data";
import { CATEGORY_CHIPS, SIDEBAR_SUBS } from "./data";

type Props = { feed: FeedItem[]; dark: boolean };

export function YouTubeDesktop({ feed, dark }: Props) {
  return (
    <div className={`yt-scope ${dark ? "yt-dark" : ""} h-full overflow-hidden flex flex-col`} style={{ background: "var(--yt-bg)", color: "var(--yt-text)" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 h-14 shrink-0" style={{ background: "var(--yt-bg)" }}>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-[var(--yt-surface-2)]">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1 cursor-pointer">
            <div className="w-[26px] h-[18px] rounded-[5px] flex items-center justify-center" style={{ background: "var(--yt-red)" }}>
              <Play className="w-2.5 h-2.5 text-white fill-white" />
            </div>
            <span className="font-medium tracking-[-0.5px] text-[18px] leading-none" style={{ color: "var(--yt-text)", fontFamily: "var(--font-yt)" }}>
              YouTube
            </span>
            <sup className="text-[10px] ml-0.5" style={{ color: "var(--yt-text-secondary)" }}>IN</sup>
          </div>
        </div>

        <div className="flex-1 max-w-[600px] mx-8 flex items-center gap-2">
          <div className="flex flex-1 h-10 rounded-full overflow-hidden border" style={{ borderColor: "var(--yt-border)", background: dark ? "#121212" : "#fff" }}>
            <input
              placeholder="Search"
              className="flex-1 bg-transparent px-4 outline-none text-[14px]"
              style={{ color: "var(--yt-text)", fontFamily: "var(--font-yt)" }}
            />
            <button className="px-5 border-l hover:bg-[var(--yt-surface-2)] transition-colors" style={{ borderColor: "var(--yt-border)", background: dark ? "rgba(255,255,255,0.05)" : "var(--yt-surface-2)" }}>
              <Search className="w-4 h-4" />
            </button>
          </div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--yt-surface-2)] transition-colors" style={{ background: dark ? "rgba(255,255,255,0.08)" : "var(--yt-surface-2)" }} title="Search with your voice">
            <Mic className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 h-9 rounded-full flex items-center gap-2 text-[14px] font-medium hover:bg-[var(--yt-surface-2)] transition-colors" style={{ background: dark ? "rgba(255,255,255,0.08)" : "var(--yt-surface-2)", fontFamily: "var(--font-yt)" }}>
            <Video className="w-4 h-4" />
            Create
          </button>
          <button className="p-2 rounded-full hover:bg-[var(--yt-surface-2)] relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0.5 right-0 text-[9px] font-medium text-white rounded-full px-1 leading-tight" style={{ background: "var(--yt-red)" }}>9+</span>
          </button>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium text-white" style={{ background: "linear-gradient(135deg,#a78bfa,#6d28d9)" }}>
            S
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-60 shrink-0 overflow-y-auto py-3 px-3 text-[14px]" style={{ background: "var(--yt-bg)", fontFamily: "var(--font-yt)" }}>
          <SideItem icon={<Home className="w-6 h-6" />} label="Home" active />
          <SideItem icon={<Clapperboard className="w-6 h-6" />} label="Shorts" />
          <SideItem icon={<ListVideo className="w-6 h-6" />} label="Subscriptions" />

          <Divider />

          <div className="px-3 pt-2 pb-1 flex items-center gap-1 text-[16px] font-normal cursor-pointer">
            Subscriptions <ChevronRight className="w-4 h-4" />
          </div>
          {SIDEBAR_SUBS.map((s) => (
            <button key={s.name} className="w-full flex items-center gap-6 px-3 py-2 rounded-lg hover:bg-[var(--yt-surface-2)] transition-colors">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium text-white shrink-0" style={{ background: s.color }}>
                {s.name[0]}
              </div>
              <span className="truncate text-[14px]">{s.name}</span>
            </button>
          ))}

          <Divider />

          <div className="px-3 pt-2 pb-1 flex items-center gap-1 text-[16px] font-normal cursor-pointer">
            You <ChevronRight className="w-4 h-4" />
          </div>
          <SideItem icon={<History className="w-6 h-6" />} label="History" />
          <SideItem icon={<ListVideo className="w-6 h-6" />} label="Playlists" />
          <SideItem icon={<Clock className="w-6 h-6" />} label="Watch Later" />
          <SideItem icon={<ThumbsUp className="w-6 h-6" />} label="Liked videos" />
          <SideItem icon={<Video className="w-6 h-6" />} label="Your videos" />
          <SideItem icon={<Download className="w-6 h-6" />} label="Downloads" />

          <Divider />
          <div className="px-3 pt-2 pb-1 text-[16px] font-normal">Explore</div>
          <SideItem icon={<ShoppingBag className="w-6 h-6" />} label="Shopping" />
          <SideItem icon={<Music2 className="w-6 h-6" />} label="Music" />
          <SideItem icon={<Newspaper className="w-6 h-6" />} label="News" />
          <SideItem icon={<Trophy className="w-6 h-6" />} label="Sports" />
          <SideItem icon={<Lightbulb className="w-6 h-6" />} label="Learning" />
          <SideItem icon={<Shirt className="w-6 h-6" />} label="Fashion & Beauty" />
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 overflow-y-auto" style={{ background: "var(--yt-bg)", fontFamily: "var(--font-yt)" }}>
          {/* Chips */}
          <div className="sticky top-0 z-10 px-6 py-3 flex gap-3 overflow-x-auto" style={{ background: "var(--yt-bg)" }}>
            {CATEGORY_CHIPS.map((chip, i) => (
              <button
                key={chip}
                className="px-3 py-1.5 rounded-lg text-[14px] whitespace-nowrap font-medium hover:opacity-90 transition-opacity"
                style={{
                  background: i === 0 ? "var(--yt-chip-bg-active)" : "var(--yt-chip-bg)",
                  color: i === 0 ? "var(--yt-chip-text-active)" : "var(--yt-text)",
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          <div className="px-6 pb-10 grid gap-x-4 gap-y-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {feed.map((item) => (
              <DesktopCard key={item.id} item={item} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function SideItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className="w-full flex items-center gap-6 px-3 py-2 rounded-lg text-[14px] hover:bg-[var(--yt-surface-2)] transition-colors"
      style={{ background: active ? "var(--yt-surface-2)" : "transparent", fontWeight: active ? 500 : 400 }}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  );
}

function Divider() {
  return <div className="my-2 border-t" style={{ borderColor: "var(--yt-border)" }} />;
}

function DesktopCard({ item }: { item: FeedItem }) {
  const isImage = item.thumbnail.startsWith("data:") || item.thumbnail.startsWith("http") || item.thumbnail.startsWith("/");
  const isLive = item.duration === "LIVE";
  return (
    <article className="group cursor-pointer">
      <div
        className="relative w-full aspect-video rounded-xl overflow-hidden"
        style={isImage ? { backgroundImage: `url(${item.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: item.thumbnail }}
      >
        <span
          className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[12px] font-medium text-white"
          style={{ background: isLive ? "var(--yt-red)" : "rgba(0,0,0,.8)" }}
        >
          {item.duration}
        </span>
      </div>
      <div className="flex gap-3 mt-3">
        <div
          className="w-9 h-9 rounded-full shrink-0"
          style={{ background: item.channelAvatar }}
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-medium leading-[1.35] line-clamp-2" style={{ color: "var(--yt-text)", fontFamily: "var(--font-yt)" }}>
            {item.title}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-[12px]" style={{ color: "var(--yt-text-secondary)" }}>
            <span className="truncate hover:text-[var(--yt-text)] transition-colors">{item.channel}</span>
            {item.verified && <BadgeCheck className="w-3 h-3" />}
          </div>
          <div className="text-[12px]" style={{ color: "var(--yt-text-secondary)" }}>
            {item.views} {item.age && item.age !== "LIVE" && `· ${item.age}`}
          </div>
        </div>
        <MoreVertical className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </article>
  );
}
