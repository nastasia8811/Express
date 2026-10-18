import { useTranslation } from 'react-i18next'
import { ButtonLink } from '../components/Button'
import styles from './NotFoundPage.module.css'

interface NotFoundPageProps {
  title?: string
  text?: string
}

export default function NotFoundPage({ title, text }: NotFoundPageProps) {
  const { t } = useTranslation()

  return (
    <section className={styles.section} data-tone='cocoa'>
      <div className={`container ${styles.inner}`}>
        <span className={styles.code} aria-hidden='true'>
          404
        </span>
        <h1 className={styles.title}>{title ?? t('notFound.title')}</h1>
        <p className={styles.text}>{text ?? t('notFound.text')}</p>
        <ButtonLink to='/' viewTransition>
          {t('notFound.home')}
        </ButtonLink>
      </div>
    </section>
  )
}
