const PORTAL_MESSAGE_SOURCE = '__vite_portal__'

export interface OpenTabOptions {
  id: string
  name: string
  url: string
  closable?: boolean
}

export function openTab(options: OpenTabOptions) {
  window.parent.postMessage(
    {
      source: PORTAL_MESSAGE_SOURCE,
      type: 'OPEN_TAB',
      payload: {
        id: options.id,
        name: options.name,
        url: options.url,
        closable: options.closable ?? true,
      },
    },
    '*'
  )
}

export function closeTab(tabId: string) {
  window.parent.postMessage(
    {
      source: PORTAL_MESSAGE_SOURCE,
      type: 'CLOSE_TAB',
      payload: { id: tabId },
    },
    '*'
  )
}

export function setActiveTab(tabId: string) {
  window.parent.postMessage(
    {
      source: PORTAL_MESSAGE_SOURCE,
      type: 'SET_ACTIVE_TAB',
      payload: { id: tabId },
    },
    '*'
  )
}

export function getTabs(): Promise<unknown[]> {
  return new Promise((resolve) => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data
      if (data?.source === PORTAL_MESSAGE_SOURCE && data?.type === 'TABS_DATA') {
        window.removeEventListener('message', handleMessage)
        resolve(data.payload)
      }
    }

    window.addEventListener('message', handleMessage)

    window.parent.postMessage(
      {
        source: PORTAL_MESSAGE_SOURCE,
        type: 'GET_TABS',
      },
      '*'
    )

    setTimeout(() => {
      window.removeEventListener('message', handleMessage)
      resolve([])
    }, 5000)
  })
}

export function onPortalMessage(callback: (data: { type: string; payload?: unknown }) => void) {
  const handler = (event: MessageEvent) => {
    const data = event.data
    if (data?.source === PORTAL_MESSAGE_SOURCE) {
      callback({ type: data.type, payload: data.payload })
    }
  }

  window.addEventListener('message', handler)

  return () => {
    window.removeEventListener('message', handler)
  }
}