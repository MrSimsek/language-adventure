"use client";

import { LanguageNote as LanguageNoteType } from "@/types/story";
import { useState } from "react";

interface LanguageNoteProps {
  note: LanguageNoteType;
}

export default function LanguageNote({ note }: LanguageNoteProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="rounded-lg bg-white border border-gray-200 p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-4 flex w-full items-center justify-between text-left"
      >
        <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
          Language Note
        </h3>
        <span className="text-gray-400">
          {isExpanded ? "−" : "+"}
        </span>
      </button>

      {isExpanded && (
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-xs font-medium text-gray-500 uppercase">
              Phrase
            </div>
            <div className="mb-2 text-2xl font-bold text-gray-900">
              {note.phrase}
            </div>
            <div className="text-sm text-gray-500">
              {note.translation}
            </div>
          </div>

          <div>
            <div className="mb-1 text-xs font-medium text-gray-500 uppercase">
              Explanation
            </div>
            <div className="text-sm text-gray-700 leading-relaxed">
              {note.explanation}
            </div>
          </div>

          {note.pronunciation && (
            <div>
              <div className="mb-1 text-xs font-medium text-gray-500 uppercase">
                Pronunciation
              </div>
              <div className="text-sm font-mono text-gray-700">
                {note.pronunciation}
              </div>
            </div>
          )}

          {note.grammar && (
            <div>
              <div className="mb-1 text-xs font-medium text-gray-500 uppercase">
                Grammar
              </div>
              <div className="text-sm text-gray-700">
                {note.grammar}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

