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
      className="w-full rounded-2xl border-2 border-gray-200 bg-white p-5 text-left hover:border-blue-400 hover:bg-blue-50 hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
      type="button"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {choice.germanText ? (
            <>
              <div className="mb-2 text-xl md:text-2xl font-bold text-gray-900">
                {choice.germanText}
              </div>
              <div className="text-base text-gray-600">
                {choice.text}
              </div>
            </>
          ) : (
            <div className="text-lg font-semibold text-gray-900">
              {choice.text}
            </div>
          )}
        </div>
        <div className="ml-4 text-2xl text-blue-500 font-bold">
          →
        </div>
      </div>
    </button>
  );
}

