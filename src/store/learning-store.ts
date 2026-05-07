"use client";

import { create } from "zustand";

type LearningState = {
  recording: boolean;
  submittedToday: boolean;
  streak: number;
  xp: number;
  startRecording: () => void;
  stopRecording: () => void;
  submitVoiceTask: () => void;
  applySkipPenalty: () => void;
};

export const useLearningStore = create<LearningState>((set) => ({
  recording: false,
  submittedToday: false,
  streak: 14,
  xp: 8420,
  startRecording: () => set({ recording: true }),
  stopRecording: () => set({ recording: false }),
  submitVoiceTask: () =>
    set((state) => ({
      recording: false,
      submittedToday: true,
      streak: state.streak + 1,
      xp: state.xp + 80,
    })),
  applySkipPenalty: () =>
    set((state) => ({
      streak: Math.max(0, state.streak - 1),
      xp: Math.max(0, state.xp - 35),
    })),
}));
