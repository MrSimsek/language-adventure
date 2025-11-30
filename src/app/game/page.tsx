"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SentenceBuilder from "@/components/SentenceBuilder";

interface GameSentence {
  english: string;
  germanWords: string[];
  correctOrder: string[];
  distractorWords?: string[];
  hint?: string;
  tips?: string[];
}

const gameSentences: GameSentence[] = [
  {
    english: "I would like a coffee.",
    germanWords: ["gerne", "einen", "Ich", "hätte", "Kaffee"],
    correctOrder: ["Ich", "hätte", "gerne", "einen", "Kaffee"],
    distractorWords: ["Tee", "Wasser", "will", "möchte", "eine", "Brot"],
    hint: "Remember: In German, the verb often comes second.",
    tips: [
      "The sentence starts with 'I' (Ich) in German.",
      "The verb 'hätte' comes right after the subject.",
      "The word 'gerne' means 'gladly' and comes after the verb.",
      "Remember: 'Kaffee' is masculine, so use 'einen' not 'eine'."
    ]
  },
  {
    english: "Good morning!",
    germanWords: ["Morgen", "Guten"],
    correctOrder: ["Guten", "Morgen"],
    distractorWords: ["Tag", "Abend", "Nacht", "Hallo", "Tschüss"],
    tips: [
      "This is a greeting used in the morning.",
      "The adjective 'Guten' comes before the noun 'Morgen'.",
      "Both words start with capital letters in German."
    ]
  },
  {
    english: "What can I get you?",
    germanWords: ["sein", "Was", "darf's"],
    correctOrder: ["Was", "darf's", "sein"],
    distractorWords: ["kann", "möchten", "haben", "ist", "wird"],
    tips: [
      "The question starts with 'Was' (What).",
      "'darf's' is a contraction meaning 'may it' or 'can it'.",
      "The sentence ends with 'sein' (to be)."
    ]
  },
  {
    english: "With milk, please.",
    germanWords: ["bitte", "Milch", "Mit"],
    correctOrder: ["Mit", "Milch", "bitte"],
    distractorWords: ["ohne", "Zucker", "Kaffee", "danke", "schwarz"],
    tips: [
      "The preposition 'Mit' (with) comes first.",
      "'Milch' means milk and comes after 'Mit'.",
      "'bitte' (please) is typically placed at the end of polite requests."
    ]
  },
  {
    english: "Thank you very much!",
    germanWords: ["schön", "Danke"],
    correctOrder: ["Danke", "schön"],
    distractorWords: ["bitte", "gern", "Tschüss", "Auf", "Wiedersehen"],
    tips: [
      "'Danke' means 'thank you' and starts the phrase.",
      "'schön' means 'beautiful' or 'nice' and intensifies the thanks.",
      "Together they mean 'thank you very much'."
    ]
  },
  {
    english: "For here or to go?",
    germanWords: ["oder", "hier", "zum", "Für", "Mitnehmen"],
    correctOrder: ["Für", "hier", "oder", "zum", "Mitnehmen"],
    distractorWords: ["dort", "da", "mit", "ohne", "gehen", "kommen"],
    tips: [
      "The phrase starts with 'Für' (for).",
      "'hier' means 'here' and comes after 'Für'.",
      "'oder' means 'or' and connects the two options.",
      "'zum Mitnehmen' means 'to go' or 'to take away'."
    ]
  },
  {
    english: "That'll be 3 euros 50.",
    germanWords: ["macht", "Das", "50", "3", "Euro"],
    correctOrder: ["Das", "macht", "3", "Euro", "50"],
    distractorWords: ["ist", "sind", "kostet", "2", "4", "5", "Cent"],
    tips: [
      "The sentence starts with 'Das' (That).",
      "'macht' means 'makes' and is used to state prices.",
      "Numbers come after 'macht'.",
      "In German, you say '3 Euro 50' not '3.50 Euro'."
    ]
  },
  {
    english: "I am David.",
    germanWords: ["bin", "Ich", "David"],
    correctOrder: ["Ich", "bin", "David"],
    distractorWords: ["ist", "sind", "heißt", "Maria", "Anna", "Thomas"],
    tips: [
      "The sentence starts with 'Ich' (I).",
      "'bin' is the first person form of 'to be' (am).",
      "The name comes at the end."
    ]
  }
];

export default function GamePage() {
  const router = useRouter();
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const currentSentence = gameSentences[currentSentenceIndex];
  const isLastSentence = currentSentenceIndex === gameSentences.length - 1;

  const handleCorrect = () => {
    const newScore = score + 1;
    setScore(newScore);
    setShowHint(false);
    
    if (currentSentenceIndex === gameSentences.length - 1) {
      // Game complete - score will be updated and completion message will show
    } else {
      // Move to next sentence after a short delay
      setTimeout(() => {
        setCurrentSentenceIndex(currentSentenceIndex + 1);
      }, 1500);
    }
  };

  const handleReset = () => {
    setCurrentSentenceIndex(0);
    setScore(0);
    setShowHint(false);
  };

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
          <div className="text-right">
            <div className="text-sm text-gray-600">Score</div>
            <div className="text-2xl font-bold text-blue-600">{score} / {gameSentences.length}</div>
          </div>
        </div>

        {/* Game Card */}
        <div className="mb-6 rounded-3xl bg-white shadow-xl p-8 md:p-10">
          {/* Progress */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
              <span>Sentence {currentSentenceIndex + 1} of {gameSentences.length}</span>
              <span>{Math.round(((currentSentenceIndex + 1) / gameSentences.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${((currentSentenceIndex + 1) / gameSentences.length) * 100}%` }}
              />
            </div>
          </div>

          {/* English Sentence */}
          <div className="mb-8 text-center">
            <div className="mb-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
              Translate this sentence:
            </div>
            <div className="text-3xl md:text-4xl font-bold text-gray-900">
              {currentSentence.english}
            </div>
          </div>

          {/* Hint Button */}
          {currentSentence.hint && (
            <div className="mb-6 text-center">
              <button
                onClick={() => setShowHint(!showHint)}
                className="rounded-xl bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-300 px-4 py-2 text-sm font-semibold text-yellow-800 transition-colors"
              >
                {showHint ? "Hide Hint" : "Show Hint"}
              </button>
              {showHint && (
                <div className="mt-3 rounded-xl bg-yellow-50 border-2 border-yellow-200 p-4 text-sm text-yellow-800">
                  💡 {currentSentence.hint}
                </div>
              )}
            </div>
          )}

          {/* Sentence Builder */}
          <SentenceBuilder
            key={currentSentenceIndex}
            words={currentSentence.germanWords}
            correctOrder={currentSentence.correctOrder}
            distractorWords={currentSentence.distractorWords}
            tips={currentSentence.tips}
            onCorrect={handleCorrect}
          />

          {/* Game Complete Message */}
          {currentSentenceIndex === gameSentences.length - 1 && score === gameSentences.length && (
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 p-8 text-center">
              <div className="mb-4 text-6xl">🎉</div>
              <div className="mb-2 text-3xl font-bold text-gray-900">
                Perfect Score!
              </div>
              <div className="mb-6 text-lg text-gray-700">
                You completed all {gameSentences.length} sentences correctly!
              </div>
              <button
                onClick={handleReset}
                className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-3 text-lg font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

