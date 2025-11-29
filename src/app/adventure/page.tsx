"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
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

  const currentScene = story.scenes.find((s) => s.id === currentSceneId);

  // Reset when starting scene changes (user selects different scenario)
  useEffect(() => {
    setCurrentSceneId(initialSceneId);
  }, [initialSceneId]);

  if (!currentScene) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Scene not found</p>
      </div>
    );
  }

  const handleChoiceClick = (choiceId: string, nextSceneId: string, feedback?: string) => {
    if (feedback) {
      setShowFeedback(feedback);
      setTimeout(() => {
        setShowFeedback(null);
        setCurrentSceneId(nextSceneId);
      }, 2000);
    } else {
      setCurrentSceneId(nextSceneId);
    }
  };

  const handleContinue = () => {
    // Check if we're at the last scene of the current scenario
    const currentIndex = story.scenes.findIndex((s) => s.id === currentSceneId);
    const isLastScene = currentIndex === story.scenes.length - 1;
    
    // Check if we're at the end of a scenario
    const isEndOfScenario = 
      (initialSceneId === "scene-1" && currentSceneId === "scene-10") ||
      (initialSceneId === "scene-11" && currentSceneId === "scene-20") ||
      (initialSceneId === "scene-21" && currentSceneId === "scene-30") ||
      isLastScene;
    
    if (isEndOfScenario) {
      // Scenario complete - go back to scenario selection
      router.push("/scenarios");
    } else {
      // Shouldn't happen, but go to scenarios as fallback
      router.push("/scenarios");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push("/scenarios")}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Scenarios
          </button>
        </div>

        {/* Scene Card */}
        <div className="mb-6 rounded-lg bg-white border border-gray-200 p-6">
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
              <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
                {block.type === "narration" ? (
                  <p className="text-gray-700 leading-relaxed">
                    {block.text}
                  </p>
                ) : (
                  <>
                    <div className="mb-2 text-xs font-medium text-gray-500 uppercase">
                      {block.speaker}
                    </div>
                    <div className="mb-2 text-2xl font-bold text-gray-900">
                      {block.germanText}
                    </div>
                    <div className="text-sm text-gray-500">
                      {block.text}
                    </div>
                  </>
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
                    handleChoiceClick(choice.id, choice.nextSceneId, choice.feedback)
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
                  Scenario complete. Ready to try another?
                </p>
              </div>
              <button
                onClick={handleContinue}
                className="w-full rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-gray-800 transition-colors"
              >
                Choose Another Scenario →
              </button>
            </div>
          )}
        </div>

        {/* Language Note */}
        <LanguageNote note={currentScene.languageNote} />
      </div>
    </div>
  );
}

export default function AdventurePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading adventure...</p>
      </div>
    }>
      <AdventureContent />
    </Suspense>
  );
}

