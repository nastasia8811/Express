import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { ToastContext, type ToastKind } from './toastContext'
import styles from './Toast.module.css'

interface ToastItem {
  id: number
  message: string
  kind: ToastKind
}

let nextId = 1

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const push = useCallback((message: string, kind: ToastKind = 'success') => {
    const id = nextId++
    setToasts(items => [...items, { id, message, kind }])
    setTimeout(() => setToasts(items => items.filter(item => item.id !== id)), 3500)
  }, [])

  const api = useMemo(() => ({ push }), [push])

  return (
    <ToastContext value={api}>
      {children}
      <div className={styles.stack} role='status' aria-live='polite'>
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              layout
              className={`${styles.toast} ${styles[toast.kind]}`}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext>
  )
}
