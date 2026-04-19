import { useState } from "react";
import { Monitor, Smartphone, Sun, Moon } from "lucide-react";
import { YouTubeDesktop } from "./youtube/YouTubeDesktop";
import { YouTubeMobile } from "./youtube/YouTubeMobile";
import { buildFeed } from "./youtube/data";
import type { UserThumbnail } from "./ThumbnailUploader";

type Device = "desktop" | "mobile";

export function PreviewPanel({ thumbnails }: { thumbnails: UserThumbnail[] }) {
  const [device, setDevice] = useState<Device>("desktop");
  const [dark, setDark] = useState(true);

  const feed = buildFeed(thumbnails);

  return (
    <section className="brutal-border-thick brutal-shadow-lg bg-card">
      <div className="flex items-center justify-between gap-4 p-4 md:p-6 border-b-4 border-foreground flex-wrap">
        <div>
          <h2 className="text-2xl md:text-3xl uppercase">02 / Preview</h2>
          <p className="text-sm text-muted-foreground mt-1 font-mono">
            See your thumbnails live in YouTube&apos;s feed.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Device tabs */}
          <div className="flex brutal-border brutal-shadow-sm">
            <TabButton active={device === "desktop"} onClick={() => setDevice("desktop")}>
              <Monitor className="w-4 h-4" strokeWidth={2.5} /> PC
            </TabButton>
            <div className="w-[3px] bg-foreground" />
            <TabButton active={device === "mobile"} onClick={() => setDevice("mobile")}>
              <Smartphone className="w-4 h-4" strokeWidth={2.5} /> Mobile
            </TabButton>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setDark((d) => !d)}
            className="brutal-border brutal-shadow-sm brutal-hover px-3 py-2 font-display uppercase text-xs flex items-center gap-2"
            style={{ background: dark ? "var(--brutal-ink)" : "var(--brutal-yellow)", color: dark ? "var(--brutal-paper)" : "var(--brutal-ink)" }}
            title="Toggle YouTube theme"
          >
            {dark ? <Moon className="w-4 h-4" strokeWidth={2.5} /> : <Sun className="w-4 h-4" strokeWidth={2.5} />}
            {dark ? "Dark" : "Light"}
          </button>
        </div>
      </div>

      {/* Browser-frame for desktop */}
      <div className="p-4 md:p-6 bg-muted/40">
        {device === "desktop" ? (
          <div className="brutal-border-thick brutal-shadow overflow-hidden bg-background">
            {/* Fake browser chrome */}
            <div className="flex items-center gap-2 px-3 py-2 border-b-[3px] border-foreground bg-brutal-paper">
              <span className="w-3 h-3 rounded-full bg-brutal-pink brutal-border" />
              <span className="w-3 h-3 rounded-full bg-brutal-yellow brutal-border" />
              <span className="w-3 h-3 rounded-full bg-brutal-lime brutal-border" />
              <div className="ml-3 flex-1 brutal-border bg-card px-3 py-1 text-xs font-mono truncate">
                https://www.youtube.com
              </div>
            </div>
            <div className="h-[680px]">
              <YouTubeDesktop feed={feed} dark={dark} />
            </div>
          </div>
        ) : (
          <YouTubeMobile feed={feed} dark={dark} />
        )}
      </div>
    </section>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 font-display uppercase text-xs flex items-center gap-2"
      style={{
        background: active ? "var(--brutal-cyan)" : "var(--brutal-paper)",
        color: "var(--brutal-ink)",
      }}
    >
      {children}
    </button>
  );
}
