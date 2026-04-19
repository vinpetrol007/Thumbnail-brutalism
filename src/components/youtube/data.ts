export type FeedItem = {
  id: string;
  thumbnail: string; // gradient css OR url
  title: string;
  channel: string;
  channelAvatar: string; // gradient css
  views: string;
  age: string;
  duration: string;
  verified?: boolean;
};

// Use deterministic gradient placeholders so feed feels real but no external deps
const grad = (a: string, b: string) =>
  `linear-gradient(135deg, ${a} 0%, ${b} 100%)`;

const avatar = (a: string, b: string) =>
  `linear-gradient(135deg, ${a}, ${b})`;

export const FEED_ITEMS: FeedItem[] = [
  {
    id: "f1",
    thumbnail: grad("#ff5e5e", "#7a1f1f"),
    title: "I Survived 100 Days In A Volcano And This Happened",
    channel: "MrUnreal",
    channelAvatar: avatar("#ff5e5e", "#7a1f1f"),
    views: "12M views",
    age: "3 days ago",
    duration: "21:04",
    verified: true,
  },
  {
    id: "f2",
    thumbnail: grad("#1c1c1c", "#3a3a3a"),
    title: "7 Hours of Quiet Wisdom To Fall Asleep To",
    channel: "Deep Mind Daily",
    channelAvatar: avatar("#444", "#111"),
    views: "1.2M views",
    age: "8 months ago",
    duration: "6:51:17",
  },
  {
    id: "f3",
    thumbnail: grad("#fbbf24", "#b45309"),
    title: "Weirdly Brilliant Businesses You Can Copy in 2026",
    channel: "My First Million",
    channelAvatar: avatar("#fbbf24", "#7c2d12"),
    views: "33K views",
    age: "4 months ago",
    duration: "45:11",
    verified: true,
  },
  {
    id: "f4",
    thumbnail: grad("#facc15", "#1f2937"),
    title: "KALYANI - ARJN x KDS x FIFTY4 x RONN | What We Cookin?",
    channel: "RONN",
    channelAvatar: avatar("#facc15", "#1f2937"),
    views: "890K views",
    age: "2 weeks ago",
    duration: "3:42",
  },
  {
    id: "f5",
    thumbnail: grad("#ef4444", "#831843"),
    title: "HARD COOKING IN VALORANT | DARSHCASTS IS LIVE",
    channel: "DarshCasts",
    channelAvatar: avatar("#ef4444", "#831843"),
    views: "24 watching",
    age: "LIVE",
    duration: "LIVE",
  },
  {
    id: "f6",
    thumbnail: grad("#60a5fa", "#1e3a8a"),
    title: "I Hired an Immortal Coach For A Day",
    channel: "jelly time",
    channelAvatar: avatar("#60a5fa", "#1e3a8a"),
    views: "55K views",
    age: "4 weeks ago",
    duration: "16:39",
  },
  {
    id: "f7",
    thumbnail: grad("#22c55e", "#064e3b"),
    title: "We Built A Cabin From Scratch In The Woods",
    channel: "Build It Wild",
    channelAvatar: avatar("#22c55e", "#064e3b"),
    views: "3.4M views",
    age: "1 month ago",
    duration: "28:50",
    verified: true,
  },
  {
    id: "f8",
    thumbnail: grad("#a855f7", "#312e81"),
    title: "Why This Tiny Country Has The Best Coffee On Earth",
    channel: "Mapped Out",
    channelAvatar: avatar("#a855f7", "#312e81"),
    views: "678K views",
    age: "6 days ago",
    duration: "14:22",
  },
  {
    id: "f9",
    thumbnail: grad("#f97316", "#7c2d12"),
    title: "The Cheapest Sports Car You Can Actually Daily Drive",
    channel: "Throttle House",
    channelAvatar: avatar("#f97316", "#7c2d12"),
    views: "1.9M views",
    age: "5 days ago",
    duration: "18:04",
  },
  {
    id: "f10",
    thumbnail: grad("#06b6d4", "#155e75"),
    title: "Lo-fi Beats To Code & Chill — 24/7 Stream",
    channel: "Sleepy Synth",
    channelAvatar: avatar("#06b6d4", "#155e75"),
    views: "12K watching",
    age: "LIVE",
    duration: "LIVE",
  },
  {
    id: "f11",
    thumbnail: grad("#ec4899", "#701a75"),
    title: "Unboxing Every Phone Released In 2026 (So Far)",
    channel: "Tech Tide",
    channelAvatar: avatar("#ec4899", "#701a75"),
    views: "421K views",
    age: "2 days ago",
    duration: "22:18",
  },
  {
    id: "f12",
    thumbnail: grad("#84cc16", "#365314"),
    title: "Cooking The World's Spiciest Ramen — I Cried",
    channel: "Hot Bowl",
    channelAvatar: avatar("#84cc16", "#365314"),
    views: "2.1M views",
    age: "1 week ago",
    duration: "11:55",
  },
];

export const CATEGORY_CHIPS = [
  "All",
  "Music",
  "Mixes",
  "Podcasts",
  "Gaming",
  "Valorant",
  "Wealth",
  "Intelligence",
  "Algorithms",
  "Industry",
  "Sitcoms",
  "Media theories",
  "Rhythm & Blues",
  "Computer Hardware",
  "Indie Rock",
  "Psychology",
  "Computers",
];

export const SIDEBAR_MAIN = [
  { label: "Home", icon: "home" },
  { label: "Shorts", icon: "shorts" },
  { label: "Subscriptions", icon: "subs" },
];

export const SIDEBAR_YOU = [
  { label: "History", icon: "history" },
  { label: "Playlists", icon: "playlist" },
  { label: "Watch Later", icon: "clock" },
  { label: "Liked videos", icon: "like" },
  { label: "Your videos", icon: "video" },
  { label: "Downloads", icon: "download" },
];

export const SIDEBAR_SUBS = [
  { name: "TED-Ed", color: "#ef4444" },
  { name: "Breakdown", color: "#f59e0b" },
  { name: "Colin and Samir", color: "#3b82f6" },
  { name: "CrashCourse", color: "#22c55e" },
  { name: "Extra History", color: "#a855f7" },
  { name: "Raunaq Rajani", color: "#ec4899" },
  { name: "Dolan Darkest", color: "#0ea5e9" },
];

/**
 * Build the final feed by injecting user thumbnails into the first slots.
 */
export function buildFeed(
  user: { id: string; src: string; title: string; channel: string }[],
): FeedItem[] {
  const base = [...FEED_ITEMS];
  user.forEach((u, i) => {
    const slot = (i * 2) % base.length; // spread them out
    base[slot] = {
      id: `user-${u.id}`,
      thumbnail: u.src,
      title: u.title || "Untitled",
      channel: u.channel || "Your Channel",
      channelAvatar: avatar("#0f0f0f", "#606060"),
      views: `${Math.floor(Math.random() * 900) + 12}K views`,
      age: `${Math.floor(Math.random() * 11) + 1} hours ago`,
      duration: `${Math.floor(Math.random() * 20) + 3}:${String(Math.floor(Math.random() * 59)).padStart(2, "0")}`,
    };
  });
  return base;
}
