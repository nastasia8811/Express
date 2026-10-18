import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <div className='container'>{t('footer', { year: new Date().getFullYear() })}</div>
    </footer>
  )
}
