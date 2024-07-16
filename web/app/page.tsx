import Hero from "@/components/Hero";
import MiniAbout from "@/components/MiniAbout";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <main className="min-h-screen w-screen">
      <Hero />
      <MiniAbout />
      <Stats />
    </main>
  );
}
