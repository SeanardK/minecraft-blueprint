import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

function HomepageIndex() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="w-full flex flex-col gap-4 text-center items-center justify-center sm:text-left">
          <Link href="/sandbox">
            <Button size="large">Get Started</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default HomepageIndex;
