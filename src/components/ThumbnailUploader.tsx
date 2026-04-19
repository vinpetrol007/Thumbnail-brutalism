import { useRef, type ChangeEvent } from "react";
import { Upload, X, Plus } from "lucide-react";

export type UserThumbnail = {
  id: string;
  src: string;
  title: string;
  channel: string;
};

type Props = {
  thumbnails: UserThumbnail[];
  onChange: (next: UserThumbnail[]) => void;
};

export function ThumbnailUploader({ thumbnails, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const newOnes: Promise<UserThumbnail>[] = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              id: crypto.randomUUID(),
              src: reader.result as string,
              title: "Your awesome video title goes here",
              channel: "Your Channel",
            });
          };
          reader.readAsDataURL(file);
        }),
    );

    Promise.all(newOnes).then((items) => {
      onChange([...thumbnails, ...items]);
    });
    e.target.value = "";
  };

  const updateOne = (id: string, patch: Partial<UserThumbnail>) => {
    onChange(thumbnails.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  const remove = (id: string) => {
    onChange(thumbnails.filter((t) => t.id !== id));
  };

  return (
    <section className="brutal-border-thick brutal-shadow-lg bg-card p-6 md:p-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl md:text-3xl uppercase">01 / Upload</h2>
          <p className="text-sm text-muted-foreground mt-1 font-mono">
            Drop your thumbnails. Add titles. See them in the wild.
          </p>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="brutal-border brutal-shadow brutal-hover bg-brutal-yellow px-5 py-3 font-display uppercase text-sm flex items-center gap-2"
        >
          <Upload className="w-4 h-4" strokeWidth={3} />
          Upload thumbnail{thumbnails.length > 0 ? "s" : ""}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="hidden"
        />
      </div>

      {thumbnails.length === 0 ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-6 w-full brutal-border bg-muted/40 py-16 flex flex-col items-center justify-center gap-3 brutal-hover"
        >
          <div className="brutal-border bg-brutal-cyan p-3">
            <Plus className="w-6 h-6" strokeWidth={3} />
          </div>
          <p className="font-display uppercase text-lg">Click to upload</p>
          <p className="text-xs font-mono text-muted-foreground">
            PNG · JPG · WEBP — multiple files supported
          </p>
        </button>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {thumbnails.map((t, i) => (
            <div
              key={t.id}
              className="brutal-border bg-background p-3 flex gap-3 relative"
            >
              <div className="absolute -top-3 -left-3 brutal-border bg-brutal-pink w-8 h-8 flex items-center justify-center font-display text-sm">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="w-32 shrink-0 aspect-video brutal-border overflow-hidden bg-muted">
                <img
                  src={t.src}
                  alt={t.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-2">
                <input
                  value={t.title}
                  onChange={(e) => updateOne(t.id, { title: e.target.value })}
                  placeholder="Video title"
                  className="brutal-border bg-background px-2 py-1 text-sm font-medium w-full focus:outline-none focus:bg-brutal-yellow/30"
                />
                <input
                  value={t.channel}
                  onChange={(e) => updateOne(t.id, { channel: e.target.value })}
                  placeholder="Channel name"
                  className="brutal-border bg-background px-2 py-1 text-xs font-mono w-full focus:outline-none focus:bg-brutal-cyan/30"
                />
                <button
                  type="button"
                  onClick={() => remove(t.id)}
                  className="self-end brutal-border bg-destructive text-destructive-foreground text-xs px-2 py-1 font-display uppercase brutal-hover flex items-center gap-1"
                >
                  <X className="w-3 h-3" strokeWidth={3} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
