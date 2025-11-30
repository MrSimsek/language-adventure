"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InteractiveStory from "@/components/InteractiveStory";

interface Story {
  id: string;
  title: string;
  titleTranslation: string;
  text: string;
  level: "beginner" | "intermediate" | "advanced";
}

const stories: Story[] = [
  {
    id: "cafe",
    title: "Im Café",
    titleTranslation: "At the Café",
    level: "beginner",
    text: "Anna geht ins Café. Sie bestellt einen Kaffee. Der Kaffee ist heiß. Anna trinkt den Kaffee langsam. Sie liest ein Buch. Es ist ein schöner Tag."
  },
  {
    id: "park",
    title: "Im Park",
    titleTranslation: "In the Park",
    level: "beginner",
    text: "Max geht in den Park. Er sieht viele Bäume. Die Sonne scheint. Kinder spielen Fußball. Max setzt sich auf eine Bank. Er genießt die Ruhe."
  },
  {
    id: "supermarket",
    title: "Im Supermarkt",
    titleTranslation: "At the Supermarket",
    level: "beginner",
    text: "Lisa kauft Lebensmittel. Sie braucht Brot, Milch und Äpfel. Der Supermarkt ist groß. Viele Menschen sind dort. Lisa findet alles. Sie bezahlt an der Kasse."
  },
  {
    id: "morning",
    title: "Ein typischer Morgen",
    titleTranslation: "A Typical Morning",
    level: "intermediate",
    text: "Jeden Morgen wacht Maria um sieben Uhr auf. Sie macht sich einen Kaffee und frühstückt. Dann fährt sie mit dem Bus zur Arbeit. Im Büro beginnt sie um neun Uhr. Sie arbeitet als Lehrerin und liebt ihren Beruf."
  },
  {
    id: "weekend",
    title: "Das Wochenende",
    titleTranslation: "The Weekend",
    level: "intermediate",
    text: "Am Samstag besucht Tom seine Großeltern. Sie wohnen in einem kleinen Dorf. Tom hilft im Garten. Sie essen zusammen zu Mittag. Am Sonntag fährt Tom zurück nach Hause. Er fühlt sich entspannt."
  },
  {
    id: "library",
    title: "In der Bibliothek",
    titleTranslation: "In the Library",
    level: "intermediate",
    text: "Sophie geht regelmäßig in die Bibliothek. Sie sucht nach neuen Büchern. Die Bibliothek ist sehr ruhig. Menschen lesen und lernen dort. Sophie findet ein interessantes Buch über Geschichte. Sie leiht es für zwei Wochen aus."
  }
];

export default function StoriesPage() {
  const router = useRouter();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  if (selectedStory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => setSelectedStory(null)}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-105"
            >
              ← Back to Stories
            </button>
            <button
              onClick={() => router.push("/")}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-105"
            >
              Home
            </button>
          </div>

          {/* Story Card */}
          <div className="rounded-3xl bg-white shadow-xl p-8 md:p-10">
            <div className="mb-4">
              <div className="mb-2 text-sm font-medium text-blue-600 uppercase tracking-wide">
                {selectedStory.level}
              </div>
              <h1 className="mb-2 text-3xl md:text-4xl font-bold text-gray-900">
                {selectedStory.title}
              </h1>
              <div className="text-lg text-gray-600 italic">
                {selectedStory.titleTranslation}
              </div>
            </div>

            <div className="mt-8 p-2">
              <InteractiveStory text={selectedStory.text} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-105"
          >
            ← Home
          </button>
        </div>

        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-gray-900">
            German Stories
          </h1>
          <p className="text-lg text-gray-700">
            Hover over or tap words to see translations
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="rounded-2xl bg-white shadow-lg p-6 text-left hover:shadow-xl hover:scale-105 transition-all border-2 border-transparent hover:border-blue-300"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  story.level === "beginner" 
                    ? "bg-green-100 text-green-700"
                    : story.level === "intermediate"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {story.level}
                </span>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                {story.title}
              </h2>
              <p className="text-gray-600 italic">
                {story.titleTranslation}
              </p>
              <div className="mt-4 text-sm text-blue-600 font-medium">
                Read story →
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

