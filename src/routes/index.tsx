import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { ThumbnailUploader, type UserThumbnail } from "@/components/ThumbnailUploader";
import { PreviewPanel } from "@/components/PreviewPanel";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ThumbLab — Test YouTube Thumbnails In Real Layouts" },
      {
        name: "description",
        content:
          "Upload your YouTube thumbnails and see exactly how they look in the real YouTube feed on desktop and mobile, in dark and light mode.",
      },
      { property: "og:title", content: "ThumbLab — YouTube Thumbnail Preview Tool" },
      {
        property: "og:description",
        content:
          "Pixel-accurate YouTube mockups for thumbnail designers. Upload, title, preview — all in one place.",
      },
    ],
  }),
});

function Index() {
  const [thumbnails, setThumbnails] = useState<UserThumbnail[]>([]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b-4 border-foreground bg-brutal-yellow">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="brutal-border bg-brutal-ink text-brutal-paper p-2">
              <Zap className="w-5 h-5" strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl uppercase leading-none">ThumbLab</h1>
              <p className="text-[11px] font-mono uppercase tracking-wider mt-0.5">
                YouTube thumbnail preview tool
              </p>
            </div>
          </div>
          <div className="brutal-border bg-background px-3 py-1.5 text-xs font-mono">
            <a href="https://suryaprakashux.framer.website/" target="_blank" rel="noopener noreferrer">
              made by Surya
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-6">
        <div className="grid md:grid-cols-3 gap-6 items-end">
          <div className="md:col-span-2">
            <h2 className="text-4xl md:text-6xl uppercase leading-[0.95]">
              Test your thumbnails
              <br />
              <span className="bg-brutal-cyan px-2 brutal-border inline-block mt-1" style={{ transform: 'rotate(-3deg)', display: 'inline-block' }}>
                where it matters.
              </span>
            </h2>
            <p className="mt-5 text-base md:text-lg max-w-2xl font-mono">
              Drop your thumbnail, type a title, and see it live inside a pixel-accurate
              YouTube feed — desktop and mobile, dark and light. No more guessing.
            </p>
          </div>
          <div className="brutal-border-thick brutal-shadow bg-brutal-pink p-4">
            <p className="font-display uppercase text-sm">How it works</p>
            <ol className="mt-2 space-y-1 text-sm font-mono list-decimal list-inside">
              <li>Upload thumbnails</li>
              <li>Add titles + channel</li>
              <li>Switch PC / Mobile</li>
              <li>Toggle dark / light</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Workspace */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-20 space-y-8">
        <ThumbnailUploader thumbnails={thumbnails} onChange={setThumbnails} />
        <PreviewPanel thumbnails={thumbnails} />
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-foreground bg-brutal-ink text-brutal-paper">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex items-center justify-between flex-wrap gap-3">
          <p className="font-mono text-xs uppercase tracking-wider">
            Built brutalism design · for thumbnail designers · by a thumbnail designer
          </p>
          <p className="font-mono text-xs">© suryaprakashux</p>
        </div>
      </footer>
    </div>
  );
}
