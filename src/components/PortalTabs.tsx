import { Tabs, Dropdown } from '@douyinfe/semi-ui-19'
import { IconClose, IconMore } from '@douyinfe/semi-icons'
import { usePortalStore } from '../store/portal'
import { useEffect, useState } from 'react'

export const PortalTabs = () => {
  const { tabs, activeTabId, setActiveTab, removeTab, closeOtherTabs, closeAllTabs } = usePortalStore()
  const [isMobile, setIsMobile] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [is2KScreen, setIs2KScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsLargeScreen(width >= 1920 && width < 2560)
      setIs2KScreen(width >= 2560)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleTabClose = (e: React.MouseEvent, tabKey: string) => {
    e.stopPropagation()
    removeTab(tabKey)
  }

  const getContextMenu = () => {
    return [
      {
        node: 'item' as const,
        name: '关闭当前',
        onClick: () => {
          if (activeTabId) {
            removeTab(activeTabId)
          }
        },
      },
      {
        node: 'item' as const,
        name: '关闭其他',
        onClick: () => {
          if (activeTabId) {
            closeOtherTabs(activeTabId)
          }
        },
      },
      {
        node: 'item' as const,
        name: '关闭全部',
        onClick: () => {
          closeAllTabs()
        },
      },
    ]
  }

  const getIconSize = () => {
    if (isMobile) return 10
    if (is2KScreen) return 16
    if (isLargeScreen) return 14
    return 12
  }

  const getMoreIconPadding = () => {
    if (isMobile) return '6px'
    if (is2KScreen) return '12px'
    if (isLargeScreen) return '10px'
    return '8px'
  }

  const tabList = tabs.map((tab) => ({
    itemKey: tab.id,
    tab: tab.name,
    closable: tab.closable,
    icon: tab.closable ? (
      <IconClose
        style={{ fontSize: getIconSize() }}
        onClick={(e) => handleTabClose(e, tab.id)}
      />
    ) : undefined,
  }))

  return (
    <div style={{ borderBottom: '1px solid var(--semi-color-border)' }}>
      <Tabs
        activeKey={activeTabId ?? undefined}
        onChange={setActiveTab}
        tabList={tabList}
        tabBarExtraContent={
          <Dropdown
            trigger="click"
            position="bottomRight"
            menu={getContextMenu()}
          >
            <IconMore style={{ cursor: 'pointer', padding: getMoreIconPadding() }} />
          </Dropdown>
        }
      />
    </div>
  )
}