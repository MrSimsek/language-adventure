import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <main className="w-full max-w-2xl text-center">
        <div className="mb-12">
          <h1 className="mb-3 text-4xl font-semibold text-gray-900">
            Daily German Adventure
          </h1>
          <p className="text-gray-600">
            Learn German through everyday stories
          </p>
        </div>
        
        <div className="mb-8">
          <p className="mb-8 text-gray-700 leading-relaxed">
            Step into everyday scenes, make choices, and discover 
            the language naturally—one phrase at a time.
          </p>
        </div>

        <Link
          href="/adventure"
          className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-gray-800 transition-colors"
        >
          Begin →
        </Link>
      </main>
    </div>
  );
}
