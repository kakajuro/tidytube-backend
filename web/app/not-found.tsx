import Link from "next/link";

export default function Custom404() {

  return (
    <div className="grid h-screen place-content-center px-4">
      <div className="text-center items-center justify-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-red-600 sm:text-4xl">Whoops.</p>

        <p className="mt-4 text-gray-500">We couldn't find that page</p>

        <Link
          href="./"
          className="mt-6 inline-block rounded bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}
