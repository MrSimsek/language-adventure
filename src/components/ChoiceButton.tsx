"use client";

import { Choice } from "@/types/story";

interface ChoiceButtonProps {
  choice: Choice;
  onClick: () => void;
}

export default function ChoiceButton({ choice, onClick }: ChoiceButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg border border-gray-200 bg-white p-4 text-left hover:border-gray-300 hover:bg-gray-50 transition-colors"
      type="button"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {choice.germanText ? (
            <>
              <div className="mb-1 text-lg font-bold text-gray-900">
                {choice.germanText}
              </div>
              <div className="text-sm text-gray-500">
                {choice.text}
              </div>
            </>
          ) : (
            <div className="text-base text-gray-900">
              {choice.text}
            </div>
          )}
        </div>
        <div className="ml-4 text-gray-400">
          →
        </div>
      </div>
    </button>
  );
}

