import type { Category, Subcategory } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Cameras & Bodies",
    description: "Cinema, mirrorless, action and aerial",
    icon: "Camera",
  },
  {
    id: "cat-2",
    name: "Lenses & Optics",
    description: "Cine and photo glass, adapters and filters",
    icon: "Aperture",
  },
  {
    id: "cat-3",
    name: "Support & Stabilization",
    description: "Tripods, gimbals, sliders and rigs",
    icon: "MoveVertical",
  },
  {
    id: "cat-4",
    name: "Lighting & Illumination",
    description: "Continuous, strobe, modifiers and stands",
    icon: "Lightbulb",
  },
  {
    id: "cat-5",
    name: "Audio & Sound Gear",
    description: "Microphones, recorders and monitoring",
    icon: "Mic",
  },
  {
    id: "cat-6",
    name: "Monitoring & Wireless Video",
    description: "Field monitors, transmitters and prompters",
    icon: "Monitor",
  },
  {
    id: "cat-7",
    name: "Power & Battery",
    description: "Cinema batteries, power stations and chargers",
    icon: "BatteryCharging",
  },
  {
    id: "cat-8",
    name: "Storage, Media & Cables",
    description: "Cards, drives, readers and tethering",
    icon: "HardDrive",
  },
  {
    id: "cat-9",
    name: "Grip, Rigging & Utility",
    description: "Clamps, grip gear and transport cases",
    icon: "Wrench",
  },
];

export const subcategories: Subcategory[] = [
  // Cameras & Bodies
  { id: "sub-1-1", categoryId: "cat-1", name: "Cinema Cameras" },
  { id: "sub-1-2", categoryId: "cat-1", name: "Mirrorless & DSLR Bodies" },
  { id: "sub-1-3", categoryId: "cat-1", name: "Action & Specialty Cams" },
  { id: "sub-1-4", categoryId: "cat-1", name: "Drones & Aerial" },
  // Lenses & Optics
  { id: "sub-2-1", categoryId: "cat-2", name: "Cine Lenses" },
  { id: "sub-2-2", categoryId: "cat-2", name: "Photo Lenses" },
  { id: "sub-2-3", categoryId: "cat-2", name: "Adapters & Speedboosters" },
  { id: "sub-2-4", categoryId: "cat-2", name: "Lens Filters" },
  // Support & Stabilization
  { id: "sub-3-1", categoryId: "cat-3", name: "Tripods & Fluid Heads" },
  { id: "sub-3-2", categoryId: "cat-3", name: "Gimbals & Stabilizers" },
  { id: "sub-3-3", categoryId: "cat-3", name: "Sliders, Jibs & Motion Control" },
  { id: "sub-3-4", categoryId: "cat-3", name: "Shoulder Rigs & Cages" },
  // Lighting & Illumination
  { id: "sub-4-1", categoryId: "cat-4", name: "Continuous Lights" },
  { id: "sub-4-2", categoryId: "cat-4", name: "Strobes & Speedlights" },
  { id: "sub-4-3", categoryId: "cat-4", name: "Light Modifiers" },
  { id: "sub-4-4", categoryId: "cat-4", name: "Light Stands & C-Stands" },
  // Audio & Sound Gear
  { id: "sub-5-1", categoryId: "cat-5", name: "Microphones" },
  { id: "sub-5-2", categoryId: "cat-5", name: "Recorders & Mixers" },
  { id: "sub-5-3", categoryId: "cat-5", name: "Boom Poles & Shock Mounts" },
  { id: "sub-5-4", categoryId: "cat-5", name: "Audio Monitoring" },
  // Monitoring & Wireless Video
  { id: "sub-6-1", categoryId: "cat-6", name: "On-Camera Monitors" },
  { id: "sub-6-2", categoryId: "cat-6", name: "Director's Monitors" },
  { id: "sub-6-3", categoryId: "cat-6", name: "Wireless Video" },
  { id: "sub-6-4", categoryId: "cat-6", name: "Teleprompters" },
  // Power & Battery
  { id: "sub-7-1", categoryId: "cat-7", name: "Cinema Batteries" },
  { id: "sub-7-2", categoryId: "cat-7", name: "Camera & Accessory Batteries" },
  { id: "sub-7-3", categoryId: "cat-7", name: "Power Stations & Generators" },
  { id: "sub-7-4", categoryId: "cat-7", name: "Chargers & Distribution" },
  // Storage, Media & Cables
  { id: "sub-8-1", categoryId: "cat-8", name: "Memory Cards" },
  { id: "sub-8-2", categoryId: "cat-8", name: "External Drives & SSDs" },
  { id: "sub-8-3", categoryId: "cat-8", name: "Card Readers & Docks" },
  { id: "sub-8-4", categoryId: "cat-8", name: "Cables & Tethering" },
  // Grip, Rigging & Utility
  { id: "sub-9-1", categoryId: "cat-9", name: "Clamps & Arms" },
  { id: "sub-9-2", categoryId: "cat-9", name: "Grip Utilities" },
  { id: "sub-9-3", categoryId: "cat-9", name: "Bags & Hard Cases" },
];

export function subcategoriesFor(categoryId: string) {
  return subcategories.filter((s) => s.categoryId === categoryId);
}

export function subcategoryName(id: string) {
  return subcategories.find((s) => s.id === id)?.name ?? "Uncategorised";
}

export function categoryName(id: string) {
  return categories.find((c) => c.id === id)?.name ?? "Uncategorised";
}
