import { useEffect } from 'react'
import { usePortalStore } from '../store/portal'
import type { CloseTabPayload, OpenTabPayload, PortalMessageType, SetActiveTabPayload } from '../store/portal-message'
import { PORTAL_MESSAGE_SOURCE } from '../store/portal-message'

export const usePortalMessage = () => {
  const { addTab, removeTab, setActiveTab, tabs } = usePortalStore()

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data as PortalMessageType & { source?: string }

      if (data?.source !== PORTAL_MESSAGE_SOURCE) {
        return
      }

      switch (data.type) {
        case 'OPEN_TAB': {
          const payload = data.payload as OpenTabPayload
          addTab({
            id: payload.id,
            name: payload.name,
            url: payload.url,
            closable: payload.closable ?? true,
          })
          break
        }
        case 'CLOSE_TAB': {
          const payload = data.payload as CloseTabPayload
          removeTab(payload.id)
          break
        }
        case 'SET_ACTIVE_TAB': {
          const payload = data.payload as SetActiveTabPayload
          setActiveTab(payload.id)
          break
        }
        case 'GET_TABS': {
          const iframeWindows = document.querySelectorAll('iframe')
          iframeWindows.forEach((iframe) => {
            if (iframe.contentWindow) {
              iframe.contentWindow.postMessage(
                {
                  source: PORTAL_MESSAGE_SOURCE,
                  type: 'TABS_DATA',
                  payload: tabs,
                },
                '*'
              )
            }
          })
          break
        }
        default:
          console.warn('[Portal] Unknown message type:', data.type)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [addTab, removeTab, setActiveTab, tabs])
}