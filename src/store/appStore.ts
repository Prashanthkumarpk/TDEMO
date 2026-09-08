import { create } from 'zustand';
import type { ConversationMessage, SystemEnv } from '@/types';

interface AppState {
  // Presentation mode
  isPresentationMode: boolean;
  currentScene: number;
  totalScenes: number;
  showSpeakerNotes: boolean;
  enterPresentationMode: () => void;
  exitPresentationMode: () => void;
  goToScene: (index: number) => void;
  nextScene: () => void;
  prevScene: () => void;
  toggleSpeakerNotes: () => void;

  // Demo state
  selectedSystem: SystemEnv | 'ALL';
  setSelectedSystem: (system: SystemEnv | 'ALL') => void;
  messages: ConversationMessage[];
  addMessage: (msg: ConversationMessage) => void;
  updateMessage: (id: string, partial: Partial<ConversationMessage>) => void;
  clearMessages: () => void;
  isRunningDemo: boolean;
  setIsRunningDemo: (v: boolean) => void;
  activeScenarioId: string | null;
  setActiveScenarioId: (id: string | null) => void;

  // Incident approval
  pendingIncidentApproval: boolean;
  setPendingIncidentApproval: (v: boolean) => void;
  incidentApproved: boolean;
  setIncidentApproved: (v: boolean) => void;

  // Architecture layer selection
  selectedArchLayer: string | null;
  setSelectedArchLayer: (id: string | null) => void;

  // Navigation
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Presentation mode
  isPresentationMode: false,
  currentScene: 0,
  totalScenes: 12,
  showSpeakerNotes: false,
  enterPresentationMode: () => set({ isPresentationMode: true, currentScene: 0 }),
  exitPresentationMode: () => set({ isPresentationMode: false }),
  goToScene: (index) => set({ currentScene: Math.max(0, Math.min(index, get().totalScenes - 1)) }),
  nextScene: () => {
    const { currentScene, totalScenes } = get();
    if (currentScene < totalScenes - 1) set({ currentScene: currentScene + 1 });
  },
  prevScene: () => {
    const { currentScene } = get();
    if (currentScene > 0) set({ currentScene: currentScene - 1 });
  },
  toggleSpeakerNotes: () => set(s => ({ showSpeakerNotes: !s.showSpeakerNotes })),

  // Demo state
  selectedSystem: 'PRD',
  setSelectedSystem: (system) => set({ selectedSystem: system }),
  messages: [],
  addMessage: (msg) => set(s => ({ messages: [...s.messages, msg] })),
  updateMessage: (id, partial) =>
    set(s => ({ messages: s.messages.map(m => m.id === id ? { ...m, ...partial } : m) })),
  clearMessages: () => set({ messages: [], pendingIncidentApproval: false, incidentApproved: false }),
  isRunningDemo: false,
  setIsRunningDemo: (v) => set({ isRunningDemo: v }),
  activeScenarioId: null,
  setActiveScenarioId: (id) => set({ activeScenarioId: id }),

  // Incident approval
  pendingIncidentApproval: false,
  setPendingIncidentApproval: (v) => set({ pendingIncidentApproval: v }),
  incidentApproved: false,
  setIncidentApproved: (v) => set({ incidentApproved: v }),

  // Architecture layer selection
  selectedArchLayer: null,
  setSelectedArchLayer: (id) => set({ selectedArchLayer: id }),

  // Navigation
  activeSection: 'hero',
  setActiveSection: (id) => set({ activeSection: id }),
}));
