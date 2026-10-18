import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../i18n'
import styles from './LangSwitcher.module.css'

export function LangSwitcher() {
  const { t, i18n } = useTranslation()

  return (
    <div className={styles.switcher} role='group' aria-label={t('lang')}>
      {LANGUAGES.map(lang => {
        const active = i18n.resolvedLanguage === lang
        return (
          <button
            key={lang}
            type='button'
            className={styles.option}
            aria-pressed={active}
            onClick={() => void i18n.changeLanguage(lang)}
          >
            {active && (
              <motion.span
                layoutId='lang-pill'
                className={styles.pill}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className={styles.label}>{lang.toUpperCase()}</span>
          </button>
        )
      })}
    </div>
  )
}
