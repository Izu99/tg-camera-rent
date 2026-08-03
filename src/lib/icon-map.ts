import {
  Camera,
  Aperture,
  Lightbulb,
  Mic,
  Plane,
  MoveVertical,
  Package,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Camera,
  Aperture,
  Lightbulb,
  Mic,
  Plane,
  MoveVertical,
  Package,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Package;
}
