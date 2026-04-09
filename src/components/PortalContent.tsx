import { usePortalStore } from '../store/portal'

export const PortalContent = () => {
  const { tabs, activeTabId } = usePortalStore()

  const activeTab = tabs.find((tab) => tab.id === activeTabId)

  if (!activeTab) {
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

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <iframe
        key={activeTab.id}
        src={activeTab.url}
        title={activeTab.name}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  )
}