import type { CSSProperties } from 'react'
import styles from './Skeleton.module.css'

export function Skeleton({ style }: { style?: CSSProperties }) {
  return <div className={styles.skeleton} style={style} aria-hidden='true' />
}
