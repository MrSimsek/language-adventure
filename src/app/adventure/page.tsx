"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import storyData from "@/data/story.json";
import { Scene, StoryData } from "@/types/story";
import ChoiceButton from "@/components/ChoiceButton";
import LanguageNote from "@/components/LanguageNote";

function AdventureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const startSceneId = searchParams.get("start");

  const story = storyData as StoryData;

  // Determine starting scene: use URL param if provided, otherwise default
  const initialSceneId = useMemo(() => {
    if (startSceneId) {
      // Validate that the scene exists
      const sceneExists = story.scenes.some((s) => s.id === startSceneId);
      return sceneExists ? startSceneId : story.startSceneId;
    }
    return story.startSceneId;
  }, [startSceneId, story]);

  const [currentSceneId, setCurrentSceneId] = useState<string>(initialSceneId);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [sceneHistory, setSceneHistory] = useState<string[]>([initialSceneId]);

  const currentScene = story.scenes.find((s) => s.id === currentSceneId);

  if (!currentScene) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Scene not found</p>
      </div>
    );
  }

  const handleChoiceClick = (
    choiceId: string,
    nextSceneId: string,
    feedback?: string
  ) => {
    if (feedback) {
      setShowFeedback(feedback);
      setTimeout(() => {
        setShowFeedback(null);
        setCurrentSceneId(nextSceneId);
        setSceneHistory((prev) => [...prev, nextSceneId]);
      }, 2000);
    } else {
      setCurrentSceneId(nextSceneId);
      setSceneHistory((prev) => [...prev, nextSceneId]);
    }
  };

  const handleBack = () => {
    if (sceneHistory.length > 1) {
      const newHistory = [...sceneHistory];
      newHistory.pop(); // Remove current scene
      const previousSceneId = newHistory[newHistory.length - 1];
      setSceneHistory(newHistory);
      setCurrentSceneId(previousSceneId);
    }
  };

  const handleContinue = () => {
    // Adventure complete - go back to home
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Home
            </button>
            {sceneHistory.length > 1 && (
              <button
                onClick={handleBack}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
            )}
          </div>
        </div>

        {/* Scene Card */}
        <div className="mb-6 rounded-lg">
          {/* Location */}
          <div className="mb-3 text-sm text-gray-500">
            {currentScene.location}
          </div>

          {/* Title */}
          <h1 className="mb-4 text-2xl font-semibold text-gray-900">
            {currentScene.title}
          </h1>

          {/* Content Blocks */}
          <div className="mb-6 space-y-4">
            {currentScene.contentBlocks.map((block, index) => (
              <div key={index}>
                {block.type === "narration" ? (
                  <p className="text-gray-700 leading-relaxed">{block.text}</p>
                ) : (
                  <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg">
                    <div className="mb-2 text-xs font-medium text-gray-500 uppercase">
                      {block.speaker}
                    </div>
                    <div className="mb-2 text-2xl font-bold text-gray-900">
                      {block.germanText}
                    </div>
                    <div className="text-sm text-gray-500">{block.text}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Feedback Message */}
          {showFeedback && (
            <div className="mb-6 rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
              {showFeedback}
            </div>
          )}

          {/* Choices */}
          {currentScene.choices.length > 0 && (
            <div className="space-y-2">
              {currentScene.choices.map((choice) => (
                <ChoiceButton
                  key={choice.id}
                  choice={choice}
                  onClick={() =>
                    handleChoiceClick(
                      choice.id,
                      choice.nextSceneId,
                      choice.feedback
                    )
                  }
                />
              ))}
            </div>
          )}

          {/* Continue Button (when no choices - end of adventure) */}
          {currentScene.choices.length === 0 && (
            <div className="mt-6 space-y-4">
              <div className="rounded-lg bg-gray-100 p-6 text-center">
                <p className="mb-4 text-gray-700">
                  Adventure complete! You&apos;ve finished your café experience.
                </p>
              </div>
              <button
                onClick={handleContinue}
                className="w-full rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-gray-800 transition-colors"
              >
                Back to Home →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdventurePageContent() {
  const searchParams = useSearchParams();
  const startSceneId = searchParams.get("start");
  const key = startSceneId || "default";

  return <AdventureContent key={key} />;
}

export default function AdventurePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-500">Loading adventure...</p>
        </div>
      }
    >
      <AdventurePageContent />
    </Suspense>
  );
}
