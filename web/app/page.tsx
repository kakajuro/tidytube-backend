import Hero from "@/components/Hero";
import MiniAbout from "@/components/MiniAbout";
import Stats from "@/components/Stats";
import CallToAction from "@/components/CallToAction";

export default async function Home() {

  return (
    <main className="min-h-screen w-screen">
      <Hero />
      <MiniAbout />
      <Stats />
      <CallToAction />
    </main>
  );
}
