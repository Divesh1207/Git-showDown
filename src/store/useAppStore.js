import { create } from "zustand";

const useAppStore = create((set) => ({
  user: null,
  comparisonUser: null,
  comparisonResult: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  setComparisonUser: (comparisonUser) => set({ comparisonUser }),
  setComparisonResult: (comparisonResult) => set({ comparisonResult }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

export default useAppStore;
