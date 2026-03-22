import { FaCube, FaLayerGroup, FaShareAlt, FaThLarge } from "react-icons/fa";

const heroBlocks = [
  { file: "grass_top.png", label: "Grass" },
  { file: "stone.png", label: "Stone" },
  { file: "planks_oak.png", label: "Oak Planks" },
  { file: "cobblestone.png", label: "Cobblestone" },
  { file: "log_oak.png", label: "Oak Log" },
  { file: "brick.png", label: "Brick" },
  { file: "sandstone_normal.png", label: "Sandstone" },
  { file: "netherrack.png", label: "Netherrack" },
  { file: "diamond_block.png", label: "Diamond Block" },
  { file: "gold_block.png", label: "Gold Block" },
  { file: "emerald_block.png", label: "Emerald Block" },
  { file: "obsidian.png", label: "Obsidian" },
  { file: "iron_block.png", label: "Iron Block" },
  { file: "lapis_block.png", label: "Lapis Block" },
  { file: "prismarine.png", label: "Prismarine" },
  { file: "purpur_block.png", label: "Purpur Block" },
];

const showcaseBlocks = [
  ...heroBlocks,
  { file: "sand.png", label: "Sand" },
  { file: "gravel.png", label: "Gravel" },
  { file: "glass.png", label: "Glass" },
  { file: "glowstone.png", label: "Glowstone" },
  { file: "redstone_block.png", label: "Redstone Block" },
  { file: "coal_block.png", label: "Coal Block" },
  { file: "stonebrick.png", label: "Stone Bricks" },
  { file: "nether_brick.png", label: "Nether Brick" },
];

const features = [
  {
    Icon: FaCube,
    title: "Interactive 3D Editor",
    description:
      "Place and remove blocks in a fully interactive 3D canvas powered by React Three Fiber. Orbit, zoom, and inspect every angle of your structure.",
  },
  {
    Icon: FaThLarge,
    title: "Real Minecraft Textures",
    description:
      "Browse a comprehensive library of authentic block textures including full blocks, slabs, and stairs exactly as they appear in-game.",
  },
  {
    Icon: FaLayerGroup,
    title: "Layer Inspection",
    description:
      "Use X, Y, and Z axis sliders to slice through your build. Verify complex interiors and multi-floor structures with ease.",
  },
  {
    Icon: FaShareAlt,
    title: "Shareable Links",
    description:
      "Export your entire blueprint as a compact encoded URL. Share with anyone they can load it in the sandbox instantly, no login required.",
  },
];

const steps = [
  {
    number: "01",
    title: "Open the Sandbox",
    description:
      "Click 'Launch Sandbox' to enter the editor. A starter grass block is ready and waiting.",
  },
  {
    number: "02",
    title: "Design Your Build",
    description:
      "Select blocks from the toolbar. Left-click a face to place, right-click to open the context menu and delete.",
  },
  {
    number: "03",
    title: "Share Your Blueprint",
    description:
      "Export your build as a shareable link. Anyone with the link can open your blueprint in the sandbox.",
  },
];

const homepageData = { heroBlocks, showcaseBlocks, features, steps };

export default homepageData;
