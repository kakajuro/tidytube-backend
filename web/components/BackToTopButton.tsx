"use client";

export default function BackToTopButton() {

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex justify-center items-center hover:underline text-gray-500 transition hover:text-gray-500/75 pt-4 pb-12">
      <a className="cursor-pointer" onClick={handleClick}>
        Back To Top
      </a>
    </div>
  )
}
