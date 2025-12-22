import { DetectedObject, SceneAnalysis } from './api';

export interface HistoryEntry {
  id: string;
  timestamp: number;
  imagePreview: string;
  objectsDetected: DetectedObject[];
  annotatedImage: string;
  sceneAnalysis: SceneAnalysis;
  explanation: string;
  sceneText: string;
}

const STORAGE_KEY = 'scene_analysis_history';
const MAX_ENTRIES = 20;

export const storage = {
  getHistory(): HistoryEntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addEntry(entry: Omit<HistoryEntry, 'id' | 'timestamp'>): HistoryEntry {
    const history = this.getHistory();
    const newEntry: HistoryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };

    const updatedHistory = [newEntry, ...history].slice(0, MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));

    return newEntry;
  },

  removeEntry(id: string): void {
    const history = this.getHistory();
    const updatedHistory = history.filter((entry) => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  },

  clearHistory(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  getEntry(id: string): HistoryEntry | undefined {
    const history = this.getHistory();
    return history.find((entry) => entry.id === id);
  },
};
