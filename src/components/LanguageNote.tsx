"use client";

import { LanguageNote as LanguageNoteType } from "@/types/story";
import { useState } from "react";

interface LanguageNoteProps {
  note: LanguageNoteType;
}

export default function LanguageNote({ note }: LanguageNoteProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 shadow-xl p-6 md:p-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-4 flex w-full items-center justify-between text-left hover:opacity-80 transition-opacity"
      >
        <h3 className="text-base font-bold text-orange-700 uppercase tracking-wider flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Language Note
        </h3>
        <span className="text-2xl font-bold text-orange-600">
          {isExpanded ? "−" : "+"}
        </span>
      </button>

      {isExpanded && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-5 border-2 border-yellow-200">
            <div className="mb-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
              Phrase
            </div>
            <div className="mb-2 text-3xl font-bold text-gray-900">
              {note.phrase}
            </div>
            <div className="text-base text-gray-600 font-medium">
              {note.translation}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border-2 border-yellow-200">
            <div className="mb-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
              Explanation
            </div>
            <div className="text-base text-gray-700 leading-relaxed">
              {note.explanation}
            </div>
          </div>

          {note.pronunciation && (
            <div className="bg-white rounded-2xl p-5 border-2 border-yellow-200">
              <div className="mb-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
                Pronunciation
              </div>
              <div className="text-base font-mono text-gray-800 font-semibold">
                {note.pronunciation}
              </div>
            </div>
          )}

          {note.grammar && (
            <div className="bg-white rounded-2xl p-5 border-2 border-yellow-200">
              <div className="mb-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
                Grammar
              </div>
              <div className="text-base text-gray-700">
                {note.grammar}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

