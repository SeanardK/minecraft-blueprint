import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import homepageData from "./data/content";

function HomepageIndex() {
  const { heroBlocks, showcaseBlocks, features, steps } = homepageData;

  return (
    <div className="min-h-dvh font-sans bg-[#0d1117] text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d1117]/80 backdrop-blur-md">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        >
          <div className="flex items-center gap-2 text-lg font-bold">
            <span>MC Blueprint</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sandbox">
              <Button type="primary" size="middle" style={{ background: "#05df72" }}>
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section aria-label="Hero" className="relative overflow-hidden px-6 py-28 text-center">
          {/* Subtle grid backdrop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(74,222,128,0.06) 1px, transparent 1px)," +
                "linear-gradient(90deg, rgba(74,222,128,0.06) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* Radial vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, transparent 30%, #0d1117 85%)",
            }}
          />

          <div className="relative mx-auto max-w-3xl">
            <p className="mb-5 inline-block rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1 text-sm font-medium text-green-400">
              Browser-Based 3D Blueprint Editor
            </p>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              Plan Your Minecraft
              <br />
              <span className="text-green-400">Builds in 3D</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              A free blueprint tool with real Minecraft block textures. Visualize, iterate, and
              share your builds right in the browser.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/sandbox">
                <Button type="primary" size="large" style={{ background: "#05df72" }}>
                  Launch Sandbox
                </Button>
              </Link>
              <Link
                href="/sandbox"
                className="rounded-lg border border-white/20 bg-white/5 px-5 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Block texture preview */}
          <div aria-hidden="true" className="relative mx-auto mt-20 max-w-lg">
            <div className="grid grid-cols-8 gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-4">
              {heroBlocks.map((block) => (
                <div key={block.file} className="aspect-square overflow-hidden rounded-sm">
                  <Image
                    src={`/images/textures/blocks/${block.file}`}
                    alt={`${block.label} texture`}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section aria-label="Features" className="bg-[#161b22] px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <header className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything You Need to Plan a Build
              </h2>
              <p className="mt-4 text-gray-400">
                Powerful tools wrapped in a clean, focused interface.
              </p>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-green-500/30"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                    <Icon className="text-2xl text-green-400" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Block Library Showcase */}
        <section aria-label="Block Library" className="px-6 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Hundreds of Authentic Blocks
            </h2>
            <p className="mt-4 text-gray-400">
              Full blocks, slabs, and stairs rendered with real Minecraft textures.
            </p>
            <div className="mt-12 grid grid-cols-8 gap-2">
              {showcaseBlocks.map((block) => (
                <div
                  key={block.file}
                  title={block.label}
                  className="aspect-square overflow-hidden rounded-md border border-white/10 transition-transform hover:scale-110 hover:border-green-400/50"
                >
                  <Image
                    src={`/images/textures/blocks/${block.file}`}
                    alt={`${block.label} texture`}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section aria-label="How It Works" className="bg-[#161b22] px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <header className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
              <p className="mt-4 text-gray-400">
                From idea to shareable blueprint in three simple steps.
              </p>
            </header>

            <ol className="grid gap-10 sm:grid-cols-3">
              {steps.map((step) => (
                <li key={step.number} className="text-center">
                  <span
                    className="block select-none font-mono text-5xl font-extrabold text-green-400/25"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <h3 className="mt-2 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Final CTA */}
        <section aria-label="Call to Action" className="px-6 py-28 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Start Building Today</h2>
            <p className="mt-4 text-gray-400">
              No account, no installation. Open the sandbox and start placing blocks right now.
            </p>
            <div className="mt-8">
              <Link href="/sandbox">
                <Button type="primary" size="large" style={{ background: "#05df72" }}>
                  Open the Sandbox
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0d1117]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>MC Blueprint</span>
          </div>
          <p className="text-xs text-gray-600">
            Not affiliated with Mojang Studios or Microsoft. Minecraft® is a registered trademark of
            Mojang Studios.
          </p>
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} SeanardK</p>
        </div>
      </footer>
    </div>
  );
}

export default HomepageIndex;
