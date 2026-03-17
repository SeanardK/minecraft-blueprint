import { redirect } from "next/navigation";
import HomepageIndex from "@/feature/homepage";

export default function Home() {
  redirect("/sandbox");

  return <HomepageIndex />;
}
