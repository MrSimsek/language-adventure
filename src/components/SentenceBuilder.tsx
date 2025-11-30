"use client";

import { useState } from "react";

interface SentenceBuilderProps {
  words: string[];
  correctOrder: string[];
  distractorWords?: string[];
  tips?: string[];
  onCorrect: () => void;
}

export default function SentenceBuilder({
  words,
  correctOrder,
  distractorWords = [],
  tips = [],
  onCorrect,
}: SentenceBuilderProps) {
  // Combine correct words with distractor words and shuffle them
  const allWords = [...words, ...distractorWords].sort(() => Math.random() - 0.5);
  
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([...allWords]);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleWordClick = (word: string, fromSelected: boolean) => {
    if (isComplete) return;
    
    if (fromSelected) {
      // Move word back to available
      setSelectedWords(selectedWords.filter((w) => w !== word));
      setAvailableWords([...availableWords, word]);
    } else {
      // Move word to selected
      setAvailableWords(availableWords.filter((w) => w !== word));
      setSelectedWords([...selectedWords, word]);
    }
    setFeedback(null);
  };

  const handleReset = () => {
    setSelectedWords([]);
    // Reshuffle words on reset
    const reshuffled = [...words, ...distractorWords].sort(() => Math.random() - 0.5);
    setAvailableWords(reshuffled);
    setFeedback(null);
    setIsComplete(false);
  };

  const normalizeWord = (word: string): string => {
    return word.trim().toLowerCase();
  };

  const validateOrder = (): boolean => {
    if (selectedWords.length !== correctOrder.length) {
      return false;
    }
    
    return selectedWords.every((word, index) => 
      normalizeWord(word) === normalizeWord(correctOrder[index])
    );
  };

  const handleSubmit = () => {
    if (selectedWords.length === 0) return;

    const isCorrect = validateOrder();
    setFeedback(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setIsComplete(true);
      setTimeout(() => {
        onCorrect();
      }, 1500);
    }
  };

  const handleCheck = () => {
    if (selectedWords.length === 0) return;
    handleSubmit();
  };

  return (
    <div className="space-y-6">
      {/* Sentence Boxes */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 p-6">
        <div className="mb-4 text-sm font-bold text-blue-700 uppercase tracking-wider">
          Build Your Sentence
        </div>
        
        <div className="min-h-[80px] rounded-xl bg-white border-2 border-dashed border-gray-300 p-4 mb-4">
          {selectedWords.length === 0 ? (
            <div className="text-center text-gray-400 py-4">
              Click words below to build your sentence
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 items-center">
              {selectedWords.map((word, index) => (
                <button
                  key={`${word}-${index}`}
                  onClick={() => handleWordClick(word, true)}
                  disabled={isComplete}
                  className={`rounded-lg px-4 py-3 text-lg font-semibold transition-all ${
                    isComplete
                      ? "bg-green-200 text-gray-700 cursor-default"
                      : "bg-blue-200 hover:bg-blue-300 text-gray-900 hover:scale-105 active:scale-95"
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Available Words */}
        <div>
          <div className="mb-3 text-sm font-medium text-gray-600">
            Available words:
          </div>
          <div className="flex flex-wrap gap-2">
            {availableWords.length === 0 ? (
              <div className="text-gray-400 text-sm">All words used</div>
            ) : (
              availableWords.map((word, index) => (
                <button
                  key={`${word}-${index}`}
                  onClick={() => handleWordClick(word, false)}
                  disabled={isComplete}
                  className={`rounded-lg px-4 py-2 text-base font-semibold transition-all ${
                    isComplete
                      ? "bg-gray-100 text-gray-400 cursor-default"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-900 hover:scale-105 active:scale-95 shadow-sm"
                  }`}
                >
                  {word}
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleReset}
          disabled={isComplete}
          className="flex-1 rounded-xl bg-gray-300 hover:bg-gray-400 px-4 py-3 text-base font-semibold text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset
        </button>
        <button
          onClick={handleCheck}
          disabled={selectedWords.length === 0 || isComplete}
          className="flex-1 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 text-lg font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Check Answer
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          className={`rounded-2xl border-2 p-4 text-center font-semibold text-lg ${
            feedback === "correct"
              ? "bg-green-100 border-green-300 text-green-800"
              : "bg-red-100 border-red-300 text-red-800"
          }`}
        >
          {feedback === "correct" ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Correct! Well done!</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">✗</span>
              <span>Not quite right. Try again!</span>
            </div>
          )}
        </div>
      )}

      {/* Helpful Tips (shown when incorrect) */}
      {feedback === "incorrect" && tips.length > 0 && (
        <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <div className="text-sm font-bold text-blue-700 uppercase tracking-wider">
              Helpful Tips
            </div>
          </div>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="text-base text-gray-800 flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-blue-200 text-sm text-blue-700 font-medium">
            Try again using these hints!
          </div>
        </div>
      )}
      
      {/* Fallback message if no tips available */}
      {feedback === "incorrect" && tips.length === 0 && (
        <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-4">
          <div className="text-base text-gray-800">
            💡 Think about the word order. In German, the verb often comes second in a sentence.
          </div>
        </div>
      )}
    </div>
  );
}

