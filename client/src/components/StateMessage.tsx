import type { ReactNode } from 'react'
import styles from './StateMessage.module.css'

interface StateMessageProps {
  title: string
  text: string
  children?: ReactNode
}

export function StateMessage({ title, text, children }: StateMessageProps) {
  return (
    <div className={styles.box}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
      {children}
    </div>
  )
}
