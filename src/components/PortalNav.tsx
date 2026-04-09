import { Nav } from '@douyinfe/semi-ui-19'
import { IconHome, IconSetting, IconUser, IconFile, IconBranch, IconHelpCircle } from '@douyinfe/semi-icons'
import type { MenuItem } from '../store/portal'

const iconMap: Record<string, React.ReactNode> = {
  IconHome: <IconHome />,
  IconSetting: <IconSetting />,
  IconUser: <IconUser />,
  IconFile: <IconFile />,
  IconChart: <IconBranch />,
  IconHelp: <IconHelpCircle />,
}

interface PortalNavProps {
  menuData: MenuItem[]
  onMenuClick: (item: MenuItem) => void
}

export const PortalNav = ({ menuData, onMenuClick }: PortalNavProps) => {
  const renderNavItems = (items: MenuItem[]) => {
    return items.map((item) => {
      const navItem: {
        itemKey: string
        text: string
        icon?: React.ReactNode
        items?: ReturnType<typeof renderNavItems>
      } = {
        itemKey: item.id,
        text: item.name,
        icon: item.icon ? iconMap[item.icon] : undefined,
      }

      if (item.children && item.children.length > 0) {
        navItem.items = renderNavItems(item.children)
      }

      return navItem
    })
  }

  const handleSelect = (data: { itemKey: string | number }) => {
    const findMenuItem = (items: MenuItem[], id: string | number): MenuItem | undefined => {
      for (const item of items) {
        if (item.id === String(id)) {
          return item
        }
        if (item.children) {
          const found = findMenuItem(item.children, id)
          if (found) return found
        }
      }
      return undefined
    }

    const menuItem = findMenuItem(menuData, data.itemKey)
    if (menuItem && menuItem.url) {
      onMenuClick(menuItem)
    }
  }

  return (
    <Nav
      mode="horizontal"
      defaultSelectedKeys={[]}
      items={renderNavItems(menuData)}
      onSelect={handleSelect}
      style={{ backgroundColor: 'var(--semi-color-bg-1)' }}
    />
  )
}