import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'
import { ButtonLink } from './Button'
import { LangSwitcher } from './LangSwitcher'
import styles from './Header.module.css'

export function Header() {
  const { t } = useTranslation()

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to='/' className={styles.brand} aria-label='Main'>
          <span className={styles.dot} aria-hidden='true' />
          {t('brand')}
        </NavLink>

        <div className={styles.actions}>
          <LangSwitcher />
          <ButtonLink to='/news/new' viewTransition className={styles.add}>
            <span aria-hidden='true'>+</span>
            <span className={styles.addLabel}>{t('nav.add')}</span>
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}
