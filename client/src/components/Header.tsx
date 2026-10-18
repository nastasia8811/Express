import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router'
import { ButtonLink } from './Button'
import { LangSwitcher } from './LangSwitcher'
import styles from './Header.module.css'

export function Header() {
  const { t } = useTranslation()

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to='/' className={styles.brand}>
          <span className={styles.dot} aria-hidden='true' />
          {t('brand')}
        </Link>

        <nav className={styles.nav} aria-label='Main'>
          <NavLink to='/' end className={styles.link}>
            {t('nav.home')}
          </NavLink>
        </nav>

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
