export interface Choice {
  id: string;
  text: string;
  germanText?: string;
  nextSceneId: string;
  feedback?: string;
}

export interface LanguageNote {
  phrase: string;
  translation: string;
  explanation: string;
  pronunciation?: string;
  grammar?: string;
}

export interface NarrationBlock {
  type: "narration";
  text: string;
}

export interface DialogueBlock {
  type: "dialogue";
  speaker: string;
  text: string;
  germanText: string;
}

export type ContentBlock = NarrationBlock | DialogueBlock;

export interface Scene {
  id: string;
  title: string;
  location: string;
  contentBlocks: ContentBlock[];
  choices: Choice[];
  languageNote: LanguageNote;
}

export interface StoryData {
  scenes: Scene[];
  startSceneId: string;
}

