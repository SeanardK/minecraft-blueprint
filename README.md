# Minecraft Blueprint Creator

A modern web application for creating and sharing Minecraft building blueprints. Built with Next.js, React Three Fiber, and Ant Design to provide an intuitive 3D building experience.

## 🎯 Purpose

Creating decent buildings in Minecraft can be challenging, and finding accessible blueprint platforms is often difficult. This application aims to solve that problem by providing:

- **Easy-to-use 3D blueprint creation tools**
- **Accessible blueprint sharing platform**
- **Intuitive visual building guides**
- **Community-driven blueprint library**

## ✨ Features

- 🏗️ **3D Blueprint Editor** - Create blueprints using an interactive 3D interface
- 📐 **Visual Building Guides** - Step-by-step visual instructions for construction
- 🎨 **Material Library** - Complete Minecraft block palette with accurate textures
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔄 **Export/Import** - Save and share blueprints in multiple formats
- 👥 **Community Platform** - Browse and share blueprints with other builders

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.5.4](https://nextjs.org/) with Turbopack
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Three.js](https://threejs.org/)
- **3D Utilities**: [React Three Drei](https://github.com/pmndrs/drei)
- **UI Components**: [Ant Design 5.27.4](https://ant.design/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Code Quality**: [Biome 2.2.0](https://biomejs.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SeanardK/minecraft-blueprint.git
   cd minecraft-blueprint
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

   Or with Turbopack for faster builds:
   ```bash
   pnpm dev-turbo
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm dev-turbo` | Start development server with Turbopack |
| `pnpm build` | Build for production with Turbopack |
| `pnpm start` | Start production server |
| `pnpm lint` | Run code quality checks with Biome |
| `pnpm format` | Format code with Biome |

## 🏗️ Project Structure

```
minecraft-blueprint/
├── src/
│   ├── app/          # Next.js app directory
│   └── feature/      # Feature-based modules
├── public/           # Static assets
├── .next/           # Next.js build output
├── package.json     # Dependencies and scripts
├── next.config.ts   # Next.js configuration
└── biome.json       # Code quality configuration
```

## 🎮 How to Use

1. **Create a New Blueprint**
   - Click "New Blueprint" to start designing
   - Use the 3D editor to place blocks
   - Save your progress locally

2. **Browse Community Blueprints**
   - Explore the blueprint library
   - Filter by category, difficulty, or size
   - Download blueprints for your builds
---