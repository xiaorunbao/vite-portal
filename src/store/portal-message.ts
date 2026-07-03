export interface PortalMessage {
  type: string
  payload?: unknown
}

export interface OpenTabPayload {
  id: string
  name: string
  url: string
  closable?: boolean
}

export interface CloseTabPayload {
  id: string
}

export interface SetActiveTabPayload {
  id: string
}

export type PortalMessageType =
  | { type: 'OPEN_TAB'; payload: OpenTabPayload }
  | { type: 'CLOSE_TAB'; payload: CloseTabPayload }
  | { type: 'SET_ACTIVE_TAB'; payload: SetActiveTabPayload }
  | { type: 'GET_TABS' }
  | { type: string; payload?: unknown }

export const PORTAL_MESSAGE_SOURCE = '__vite_portal__'