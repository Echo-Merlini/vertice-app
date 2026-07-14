export type Project = {
  id: string; // anchor target, e.g. "work-01"
  n: string;
  category: string;
  name: string;
  outcome: string;
  tags: string[];
  glow: string; // radial tint for the asset-free visual panels
};

export const PROJECTS: Project[] = [
  {
    id: "work-01",
    n: "01",
    category: "Events",
    name: "Turnkey Live Production",
    outcome:
      "Venue secured, crew and gear assembled, sound·AV·staging·lighting delivered end to end — the client walks in to a finished show.",
    tags: ["Venue sourcing", "FOH", "Staging", "Lighting"],
    glow: "#A15E1E",
  },
  {
    id: "work-02",
    n: "02",
    category: "Broadcast",
    name: "Broadcast Audio",
    outcome:
      "15+ years of live and broadcast sound — FOH, mastering and TV audio delivered to air, on schedule, at broadcast standard.",
    tags: ["Live sound", "Mastering", "TV / broadcast"],
    glow: "#5C616D",
  },
  {
    id: "work-03",
    n: "03",
    category: "On-chain AI",
    name: "Attested Agents",
    outcome:
      "Autonomous on-chain AI agents whose every verdict recomputes from public data — verification over trust, on infrastructure we own.",
    tags: ["Recompute Kit", "ERC-8004", "MCPs", "CCIP"],
    glow: "#E0A24C",
  },
];
