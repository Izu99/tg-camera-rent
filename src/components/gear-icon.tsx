import {
  Camera,
  Aperture,
  Lightbulb,
  Mic,
  Plane,
  MoveVertical,
  Monitor,
  BatteryCharging,
  HardDrive,
  Wrench,
  Cable,
  Briefcase,
  Package,
} from "lucide-react";

/** Resolves a product's icon name to a real icon.
 *  A switch keeps every component reference static, so nothing is
 *  constructed during render. */
export function GearIcon({
  name,
  className,
  strokeWidth = 1.5,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const props = { className, strokeWidth };
  switch (name) {
    case "Camera":
      return <Camera {...props} />;
    case "Aperture":
      return <Aperture {...props} />;
    case "Lightbulb":
      return <Lightbulb {...props} />;
    case "Mic":
      return <Mic {...props} />;
    case "Plane":
      return <Plane {...props} />;
    case "MoveVertical":
      return <MoveVertical {...props} />;
    case "Monitor":
      return <Monitor {...props} />;
    case "BatteryCharging":
      return <BatteryCharging {...props} />;
    case "HardDrive":
      return <HardDrive {...props} />;
    case "Wrench":
      return <Wrench {...props} />;
    case "Cable":
      return <Cable {...props} />;
    case "Briefcase":
      return <Briefcase {...props} />;
    default:
      return <Package {...props} />;
  }
}
