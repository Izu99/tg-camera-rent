"use client";

import Image from "next/image";
import { useState } from "react";
import { GearIcon } from "@/components/gear-icon";
import { cn } from "@/lib/utils";

/** Product photo with a graceful icon fallback, so a missing or broken
 *  file never leaves a blank tile in the catalog. */
export function EquipmentImage({
  src,
  alt,
  icon,
  sizes = "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw",
  className,
}: {
  src?: string;
  alt: string;
  icon: string;
  sizes?: string;
  className?: string;
}) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-muted",
          className
        )}
      >
        <GearIcon name={icon} className="size-7 text-muted-foreground/40" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={cn("object-cover", className)}
      onError={() => setBroken(true)}
    />
  );
}
