import { EquipmentTile } from "@/components/myPool/EquipmentTile";
import type { EquipmentTile as TileType } from "@/lib/types";

export function EquipmentRow({
  tiles,
  href = "/equipment",
}: {
  tiles: TileType[];
  href?: string;
}) {
  return (
    <>
      {/* Desktop: 5-up grid */}
      <div className="hidden md:grid grid-cols-5 gap-3">
        {tiles.map((t) => (
          <EquipmentTile key={t.id} tile={t} href={href} variant="desktop" />
        ))}
      </div>
      {/* Mobile: vertical stack */}
      <div className="md:hidden flex flex-col gap-1.5">
        {tiles.map((t) => (
          <EquipmentTile key={t.id} tile={t} href={href} variant="mobile" />
        ))}
      </div>
    </>
  );
}
