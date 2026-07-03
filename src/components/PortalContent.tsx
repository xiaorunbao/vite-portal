import { useState } from 'react'
import { Spin } from '@douyinfe/semi-ui-19'
import { usePortalStore, useHydrated } from '../store/portal'

export const PortalContent = () => {
  const { tabs, activeTabId } = usePortalStore()
  const hydrated = useHydrated()
  const [lastActiveTabId, setLastActiveTabId] = useState<string | null>(null)

  if (!hydrated) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  if (tabs.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'var(--semi-color-text-2)',
        }}
      >
        请从导航菜单选择一个页面
      </div>
    )
  }

  const isValid = activeTabId && tabs.some((tab) => tab.id === activeTabId)
  if (isValid && activeTabId !== lastActiveTabId) {
    setLastActiveTabId(activeTabId)
  }
  const visibleTabId = isValid ? activeTabId : (lastActiveTabId ?? tabs[0]?.id)

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            visibility: tab.id === visibleTabId ? 'visible' : 'hidden',
            zIndex: tab.id === visibleTabId ? 1 : 0,
          }}
        >
          <iframe
            src={tab.url}
            title={tab.name}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      ))}
    </div>
  )
}