"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import cafeStoryData from "@/data/story.json";
import trainStoryData from "@/data/train-story.json";
import { Scene, StoryData } from "@/types/story";
import ChoiceButton from "@/components/ChoiceButton";

function AdventureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const startSceneId = searchParams.get("start");
  const storyId = searchParams.get("story") || "cafe";

  // Load the appropriate story
  const story = useMemo(() => {
    if (storyId === "train") {
      return trainStoryData as StoryData;
    }
    return cafeStoryData as StoryData;
  }, [storyId]);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-105"
            >
              ← Home
            </button>
            {sceneHistory.length > 1 && (
              <button
                onClick={handleBack}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-105"
              >
                ← Back
              </button>
            )}
          </div>
        </div>

        {/* Scene Card */}
        <div className="mb-6 rounded-3xl bg-white shadow-xl p-8 md:p-10">
          {/* Location */}
          <div className="mb-4 text-sm font-medium text-blue-600 uppercase tracking-wide">
            {currentScene.location}
          </div>

          {/* Title */}
          <h1 className="mb-6 text-3xl md:text-4xl font-bold text-gray-900">
            {currentScene.title}
          </h1>

          {/* Content Blocks */}
          <div className="mb-8 space-y-5">
            {currentScene.contentBlocks.map((block, index) => (
              <div key={index}>
                {block.type === "narration" ? (
                  <p className="text-lg text-gray-700 leading-relaxed">{block.text}</p>
                ) : (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 p-6 rounded-2xl shadow-sm">
                    <div className="mb-3 text-xs font-bold text-green-700 uppercase tracking-wider">
                      {block.speaker}
                    </div>
                    <div className="mb-3 text-3xl md:text-4xl font-bold text-gray-900">
                      {block.germanText}
                    </div>
                    <div className="text-base text-gray-600">{block.text}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Feedback Message */}
          {showFeedback && (
            <div className="mb-6 rounded-2xl bg-green-100 border-2 border-green-300 p-4 text-base font-medium text-green-800 text-center">
              {showFeedback}
            </div>
          )}

          {/* Choices */}
          {currentScene.choices.length > 0 && (
            <div className="space-y-3">
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
            <div className="mt-8 space-y-4">
              <div className="rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 p-8 text-center">
                <p className="mb-2 text-2xl font-bold text-gray-900">
                  🎉 Adventure Complete!
                </p>
                <p className="text-lg text-gray-700">
                  You&apos;ve finished your café experience.
                </p>
              </div>
              <button
                onClick={handleContinue}
                className="w-full rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
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
