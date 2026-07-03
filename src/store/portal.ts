import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useEffect, useState } from 'react'

export interface MenuItem {
  id: string
  name: string
  url: string
  icon?: string
  level: number
  parentId?: string
  children?: MenuItem[]
}

export interface TabItem {
  id: string
  name: string
  url: string
  closable: boolean
}

interface PortalState {
  menuData: MenuItem[]
  tabs: TabItem[]
  activeTabId: string | null
  setMenuData: (data: MenuItem[]) => void
  addTab: (item: TabItem) => void
  removeTab: (id: string) => void
  setActiveTab: (id: string) => void
  closeOtherTabs: (id: string) => void
  closeAllTabs: () => void
}

export const usePortalStore = create<PortalState>()(
  persist(
    (set) => ({
      menuData: [],
      tabs: [],
      activeTabId: null,
      setMenuData: (data) => set({ menuData: data }),
      addTab: (item) =>
        set((state) => {
          const exists = state.tabs.find((tab) => tab.id === item.id)
          if (!exists) {
            return { tabs: [...state.tabs, item], activeTabId: item.id }
          }
          return { activeTabId: item.id }
        }),
      removeTab: (id) =>
        set((state) => {
          const target = state.tabs.find((tab) => tab.id === id)
          if (target && !target.closable) return state
          const newTabs = state.tabs.filter((tab) => tab.id !== id)
          const newActiveTabId = state.activeTabId === id ? (newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null) : state.activeTabId
          return { tabs: newTabs, activeTabId: newActiveTabId }
        }),
      setActiveTab: (id) => set({ activeTabId: id }),
      closeOtherTabs: (id) =>
        set((state) => ({
          tabs: state.tabs.filter((tab) => tab.id === id || !tab.closable),
          activeTabId: id,
        })),
      closeAllTabs: () =>
        set((state) => ({
          tabs: state.tabs.filter((tab) => !tab.closable),
          activeTabId: state.tabs.find((tab) => !tab.closable)?.id ?? null,
        })),
    }),
    {
      name: 'portal-storage',
      partialize: (state) => ({ tabs: state.tabs, activeTabId: state.activeTabId }),
    }
  )
)

export const useHydrated = () => {
  const [hydrated, setHydrated] = useState(() => usePortalStore.persist.hasHydrated())

  useEffect(() => {
    if (usePortalStore.persist.hasHydrated()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHydrated(true)
      return
    }
    const unsub = usePortalStore.persist.onFinishHydration(() => {
      setHydrated(true)
    })
    return unsub
  }, [])

  return hydrated
}