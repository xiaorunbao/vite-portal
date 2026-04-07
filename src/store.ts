import { create } from 'zustand'

interface AppState {
  count: number
  inputValue: string
  switchValue: boolean
  sliderValue: number
  isDarkMode: boolean
  increment: () => void
  decrement: () => void
  resetCount: () => void
  setInputValue: (value: string) => void
  setSwitchValue: (value: boolean) => void
  setSliderValue: (value: number) => void
  toggleTheme: () => void
}

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  inputValue: '',
  switchValue: true,
  sliderValue: 50,
  isDarkMode: false,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  resetCount: () => set({ count: 0 }),
  setInputValue: (value) => set({ inputValue: value }),
  setSwitchValue: (value) => set({ switchValue: value }),
  setSliderValue: (value) => set({ sliderValue: value }),
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode }))
}))