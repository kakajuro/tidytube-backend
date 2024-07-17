import Hero from "@/components/Hero";
import MiniAbout from "@/components/MiniAbout";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";

export default function Home() {
  return (
    <main className="min-h-screen w-screen">
      <Hero />
      <MiniAbout />
      <Stats />
    </main>
  );
}
