import { SourceAvatar } from "@/components/SourceAvatar";
import type { ActivityEntry } from "@/lib/types";

export function ActivityFeed({ entries }: { entries: ActivityEntry[] }) {
  return (
    <div className="flex flex-col">
      {entries.map((e, i) => (
        <div
          key={e.id}
          className="flex items-center gap-3 sm:gap-4 py-4"
          style={{
            borderTop: i === 0 ? undefined : "1px solid var(--color-line)",
          }}
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-ink-mute w-[64px] sm:w-[96px] shrink-0">
            {e.date}
          </span>
          <SourceAvatar
            kind={e.avatarKind}
            text={e.avatarText}
            brand={e.avatarBrand}
            logoSrc={e.avatarLogoSrc}
            shape={e.shape}
            size={36}
          />
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <span className="text-[13px] sm:text-[15px] font-medium text-ink leading-snug">
              {e.title}
            </span>
            <span className="text-[11px] sm:text-[13px] font-medium text-ink-mute">
              {e.sub}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
