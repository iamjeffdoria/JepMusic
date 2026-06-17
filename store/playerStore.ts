import { create } from "zustand";

export type Track = {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
};

type PlayerStore = {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  setTrack: (track: Track) => void;
  setIsPlaying: (playing: boolean) => void;
  setQueue: (queue: Track[]) => void;
  addToQueue: (track: Track) => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentTrack: null,
  isPlaying: false,
  queue: [],
  setTrack: (track) => set({ currentTrack: track }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setQueue: (queue) => set({ queue }),
  addToQueue: (track) => set((state) => ({ queue: [...state.queue, track] })),
}));