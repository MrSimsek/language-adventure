import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 p-4">
      <main className="w-full max-w-3xl text-center">
        <div className="mb-12">
          <div className="mb-6 text-7xl">🇩🇪</div>
          <h1 className="mb-4 text-5xl md:text-6xl font-bold text-gray-900">
            Daily German Adventure
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            Learn German through everyday stories
          </p>
        </div>
        
        <div className="mb-10">
          <div className="rounded-3xl bg-white shadow-xl p-8 md:p-10 mb-8">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Step into everyday scenes, make choices, and discover 
              the language naturally—one phrase at a time.
            </p>
          </div>
        </div>

        <Link
          href="/adventure"
          className="inline-block rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-10 py-5 text-xl font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
        >
          Begin Adventure →
        </Link>
      </main>
    </div>
  );
}
