"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const scenarios = [
  {
    id: "cafe",
    title: "Das Café-Abenteuer",
    englishTitle: "The Café Adventure",
    startSceneId: "S1",
    icon: "☕",
    description: "A morning in Berlin turns into a café adventure. Learn essential phrases for ordering coffee, asking questions, and making small talk.",
    scenes: 11,
    color: "from-orange-400 to-pink-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    phrases: ["Guten Morgen", "Ich hätte gerne...", "Was bedeutet...?"]
  },
  {
    id: "train",
    title: "Am Bahnhof",
    englishTitle: "At the Train Station",
    startSceneId: "T1",
    icon: "🚆",
    description: "Navigate Berlin's Hauptbahnhof to buy a train ticket. Learn travel vocabulary, ask for help, and purchase your ticket to Munich.",
    scenes: 9,
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    phrases: ["Entschuldigung", "Fahrkarte", "Bahnsteig", "Hin und zurück"]
  }
];

export default function ScenariosPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <button
            onClick={() => router.push("/")}
            className="mb-6 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-105"
          >
            ← Home
          </button>
          <h1 className="mb-2 text-4xl md:text-5xl font-bold text-gray-900">
            Choose Your Adventure
          </h1>
          <p className="text-lg text-gray-600">
            Select a scenario to practice German in real-life situations
          </p>
        </div>

        {/* Scenario Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {scenarios.map((scenario) => (
            <Link
              key={scenario.id}
              href={`/adventure?story=${scenario.id}&start=${scenario.startSceneId}`}
            >
              <div className={`h-full rounded-3xl ${scenario.bgColor} border-2 ${scenario.borderColor} shadow-lg p-8 hover:shadow-xl hover:scale-105 transition-all cursor-pointer`}>
                <div className="mb-4 text-5xl">{scenario.icon}</div>
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  {scenario.title}
                </h2>
                <p className="mb-4 text-base text-gray-600 italic">
                  {scenario.englishTitle}
                </p>
                <p className="mb-6 text-base text-gray-700 leading-relaxed">
                  {scenario.description}
                </p>
                <div className="mb-4">
                  <div className="text-sm font-semibold text-gray-600 mb-2">
                    Key phrases you'll learn:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {scenario.phrases.map((phrase, index) => (
                      <span
                        key={index}
                        className={`rounded-lg ${scenario.bgColor} border ${scenario.borderColor} px-3 py-1 text-sm font-medium ${scenario.textColor}`}
                      >
                        {phrase}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6 pt-6 border-t-2 border-gray-200">
                  <div className="text-sm text-gray-600">
                    {scenario.scenes} scenes
                  </div>
                  <div className={`text-sm font-bold ${scenario.textColor}`}>
                    Start Adventure →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

