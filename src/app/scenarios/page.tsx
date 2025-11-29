"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const scenarios = [
  {
    id: "cafe",
    title: "Das Café-Abenteuer",
    englishTitle: "The Café Adventure",
    startSceneId: "scene-1",
    icon: "☕",
    description: "A morning in Berlin turns into a quirky café adventure. Learn essential phrases for ordering coffee, asking questions, and making small talk.",
    scenes: 10,
    color: "from-orange-400 to-pink-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    phrases: ["Guten Morgen", "Ich hätte gerne...", "Was bedeutet...?"]
  },
  {
    id: "bahnhof",
    title: "Am Bahnhof",
    englishTitle: "At the Train Station",
    startSceneId: "scene-11",
    icon: "🚆",
    description: "You're late. The train does not care. Navigate Berlin's Hauptbahnhof, ask for directions, and learn travel vocabulary.",
    scenes: 10,
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    phrases: ["Entschuldigung", "Welcher Bahnsteig?", "Ich muss nach..."]
  },
  {
    id: "wohnung",
    title: "Die neue Wohnung",
    englishTitle: "The New Apartment",
    startSceneId: "scene-21",
    icon: "🏠",
    description: "A classic Berlin renter's experience. Meet your neighbor, unpack boxes, and learn phrases for everyday life and hospitality.",
    scenes: 10,
    color: "from-purple-400 to-indigo-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    phrases: ["Willkommen im Haus", "Brauchen Sie Hilfe?", "Es fühlt sich wie Zuhause an"]
  }
];

export default function ScenariosPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/")}
            className="mb-6 text-sm text-gray-600 hover:text-gray-900"
          >
            ← Home
          </button>
          <h1 className="mb-2 text-3xl font-semibold text-gray-900">
            Choose Your Adventure
          </h1>
        </div>

        {/* Scenario Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {scenarios.map((scenario) => (
            <Link
              key={scenario.id}
              href={`/adventure?start=${scenario.startSceneId}`}
            >
              <div className="h-full rounded-lg bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors">
                <div className="mb-3 text-3xl">{scenario.icon}</div>
                <h2 className="mb-1 text-xl font-semibold text-gray-900">
                  {scenario.title}
                </h2>
                <p className="mb-3 text-sm text-gray-500">
                  {scenario.englishTitle}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {scenario.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

