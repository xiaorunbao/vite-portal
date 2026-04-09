import { useEffect, useState } from 'react'
import { Layout, Spin, Avatar, Button, Nav, Dropdown, SideSheet } from '@douyinfe/semi-ui-19'
import { IconSemiLogo, IconBell, IconHelpCircle, IconBytedanceLogo, IconMenu, IconMoon, IconSun } from '@douyinfe/semi-icons'
import { PortalTabs } from './components/PortalTabs'
import { PortalContent } from './components/PortalContent'
import { usePortalStore } from './store/portal'
import { useMockMenuData } from './hooks/use-menu'
import type { MenuItem } from './store/portal'
import './App.css'

const { Header, Content, Footer } = Layout

function App() {
  const { setMenuData, addTab, tabs } = usePortalStore()
  const { data: menuData, isLoading } = useMockMenuData()
  const [isMobile, setIsMobile] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [is2KScreen, setIs2KScreen] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

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

  useEffect(() => {
    if (menuData) {
      setMenuData(menuData)
    }
  }, [menuData, setMenuData])

  useEffect(() => {
    if (menuData && menuData.length > 0 && tabs.length === 0) {
      const homePage = menuData.find((item) => item.id === '1')
      if (homePage && homePage.url) {
        addTab({
          id: homePage.id,
          name: homePage.name,
          url: homePage.url,
          closable: false,
        })
      }
    }
  }, [menuData, tabs, addTab])

  const handleMenuClick = (item: MenuItem) => {
    addTab({
      id: item.id,
      name: item.name,
      url: item.url,
      closable: item.id !== '1',
    })
    if (isMobile) {
      setDrawerVisible(false)
    }
  }

  const renderNavItems = (items: MenuItem[]) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <Nav.Sub key={item.id} itemKey={item.id} text={item.name}>
            {item.children.map((child) => (
              <Nav.Item
                key={child.id}
                itemKey={child.id}
                text={child.name}
                onClick={() => child.url && handleMenuClick(child)}
              />
            ))}
          </Nav.Sub>
        )
      }
      return (
        <Nav.Item
          key={item.id}
          itemKey={item.id}
          text={item.name}
          onClick={() => item.url && handleMenuClick(item)}
        />
      )
    })
  }

  const renderMobileMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return {
          node: 'item' as const,
          name: item.name,
          children: item.children.map((child) => ({
            node: 'item' as const,
            name: child.name,
            onClick: () => child.url && handleMenuClick(child),
          })),
        }
      }
      return {
        node: 'item' as const,
        name: item.name,
        onClick: () => item.url && handleMenuClick(item),
      }
    })
  }

  const userMenu = [
    { node: 'item' as const, name: '个人中心' },
    { node: 'item' as const, name: '退出登录' },
  ]

  const getHeaderHeight = () => {
    if (isMobile) return '56px'
    if (is2KScreen) return '80px'
    if (isLargeScreen) return '72px'
    return '64px'
  }

  const getLogoSize = () => {
    if (isMobile) return 28
    if (is2KScreen) return 48
    if (isLargeScreen) return 42
    return 36
  }

  const getContentPadding = () => {
    if (isMobile) return '12px'
    if (is2KScreen) return '40px'
    if (isLargeScreen) return '32px'
    return '24px'
  }

  const getFooterPadding = () => {
    if (isMobile) return '12px 16px'
    if (is2KScreen) return '28px'
    if (isLargeScreen) return '24px'
    return '20px'
  }

  const getFooterFontSize = () => {
    if (isMobile) return '12px'
    if (is2KScreen) return '16px'
    if (isLargeScreen) return '15px'
    return '14px'
  }

  const getAvatarSize = () => {
    if (isMobile) return 'extra-small'
    if (is2KScreen) return 'medium'
    if (isLargeScreen) return 'default'
    return 'small'
  }

  const getButtonMargin = () => {
    if (isMobile) return '8px'
    if (is2KScreen) return '16px'
    if (isLargeScreen) return '14px'
    return '12px'
  }

  const getIconSize = () => {
    if (isMobile) return 'large'
    if (is2KScreen) return 'extra-large'
    if (isLargeScreen) return 'large'
    return 'large'
  }

  const toggleTheme = () => {
    const body = document.body
    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode')
      setIsDarkMode(false)
    } else {
      body.setAttribute('theme-mode', 'dark')
      setIsDarkMode(true)
    }
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  return (
    <Layout style={{ border: '1px solid var(--semi-color-border)', height: '100vh', overflow: 'hidden' }}>
      <Header
        style={{
          backgroundColor: 'var(--semi-color-bg-1)',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: getHeaderHeight(),
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          {isMobile ? (
            <Button
              theme="borderless"
              icon={<IconMenu size={getIconSize()} />}
              onClick={() => setDrawerVisible(true)}
              style={{ marginRight: getButtonMargin() }}
            />
          ) : (
            <Nav
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ flex: 1, backgroundColor: 'transparent' }}
            >
              <Nav.Header>
                <IconSemiLogo style={{ fontSize: getLogoSize() }} />
              </Nav.Header>
              {renderNavItems(menuData || [])}
            </Nav>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            theme="borderless"
            type="primary"
            icon={isDarkMode ? <IconSun /> : <IconMoon />}
            onClick={toggleTheme}
            style={{
              marginRight: getButtonMargin(),
            }}
          />
          <Button
            theme="borderless"
            type="primary"
            icon={<IconBell />}
            style={{
              marginRight: getButtonMargin(),
            }}
          />
          <Button
            theme="borderless"
            type="primary"
            icon={<IconHelpCircle />}
            style={{
              marginRight: getButtonMargin(),
            }}
          />
          <Dropdown
            trigger="click"
            position="bottomRight"
            menu={userMenu}
          >
            <Avatar color="orange" size={getAvatarSize()}>
              YJ
            </Avatar>
          </Dropdown>
        </div>
      </Header>
      <Content
        style={{
          padding: getContentPadding(),
          backgroundColor: 'var(--semi-color-bg-0)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          flex: 1,
        }}
      >
        <PortalTabs />
        <div style={{ flex: 1, overflow: 'hidden', marginTop: isMobile ? '12px' : is2KScreen ? '24px' : isLargeScreen ? '20px' : '16px' }}>
          <PortalContent />
        </div>
      </Content>
      <Footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: getFooterPadding(),
          color: 'var(--semi-color-text-2)',
          backgroundColor: 'var(--semi-color-bg-1)',
          flexShrink: 0,
          fontSize: getFooterFontSize(),
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <IconBytedanceLogo style={{ marginRight: '8px' }} />
          <span style={{ display: isMobile ? 'none' : 'inline' }}>
            Copyright © 2023 ByteDance. All Rights Reserved.
          </span>
        </span>
        <span>
          <span style={{ marginRight: isMobile ? '12px' : is2KScreen ? '32px' : isLargeScreen ? '28px' : '24px' }}>平台客服</span>
          <span>反馈建议</span>
        </span>
      </Footer>
      <SideSheet
        title="菜单"
        placement="left"
        visible={drawerVisible}
        onCancel={() => setDrawerVisible(false)}
        width={280}
      >
        <Nav
          mode="vertical"
          items={renderMobileMenuItems(menuData || [])}
          style={{ width: '100%' }}
        />
      </SideSheet>
    </Layout>
  )
}

export default App