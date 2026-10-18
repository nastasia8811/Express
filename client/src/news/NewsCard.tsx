import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import type { NewsPost } from '../api/types'
import { useFormatDate } from '../hooks/useFormatDate'
import styles from './NewsCard.module.css'

export function NewsCard({ post }: { post: NewsPost }) {
  const { t } = useTranslation()
  const formatDate = useFormatDate()
  const date = formatDate(post.createDate)

  return (
    <motion.article
      className={styles.card}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {date && (
        <time className={styles.date} dateTime={post.createDate}>
          {date}
        </time>
      )}

      <h3 className={styles.title}>
        <Link
          to={`/news/${post.id}`}
          viewTransition
          className={styles.link}
          style={{ viewTransitionName: `news-title-${post.id}` }}
        >
          {post.title}
        </Link>
      </h3>

      <p className={styles.text}>{post.text}</p>

      <span className={styles.more} aria-hidden='true'>
        {t('news.readMore')}
        <span className={styles.arrow}>→</span>
      </span>
    </motion.article>
  )
}
