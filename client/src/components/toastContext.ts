import { createContext, useContext } from 'react'

export type ToastKind = 'success' | 'error'

export interface ToastApi {
  push: (message: string, kind?: ToastKind) => void
}

export const ToastContext = createContext<ToastApi | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside ToastProvider')
  return context
}
