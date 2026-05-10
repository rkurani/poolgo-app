/**
 * SectionHeader for the Iteration 4 register (warm-sandy + pixel chrome).
 * Caption is optional; when omitted or empty, only the title and the
 * pixel-bar accent render.
 */
export function SectionHeader({
  title,
  caption,
}: {
  title: string;
  caption?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <h2
        className="text-[26px] sm:text-[32px] leading-tight font-extrabold tracking-[-0.02em]"
        style={{ color: "var(--color-data-ink, #3B342A)" }}
      >
        {title}
      </h2>
      {caption ? (
        <span
          className="text-[12px] font-semibold uppercase tracking-[0.1em]"
          style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
        >
          {caption}
        </span>
      ) : null}
      <div className="pixel-bar-thin mt-2" aria-hidden />
    </div>
  );
}
