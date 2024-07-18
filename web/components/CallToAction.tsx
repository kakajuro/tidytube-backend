"use client";

export default function CallToAction() {

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="flex flex-col w-screen items-center justify-center overflow-hidden select-none text-center pb-36">
      <button 
        className="text-3xl sm:text-4xl font-semibold hover:cursor-pointer hover:text-red-600 transition hover:underline"
        onClick={handleClick}
      >so what are you waiting for?</button>
    </section>
  )
}
