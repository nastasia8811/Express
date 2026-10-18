import { motion, useScroll, useSpring } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'
import { ApiError } from '../error/ApiError.ts'
import { Button, ButtonLink } from '../components/Button'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { Skeleton } from '../components/Skeleton'
import { StateMessage } from '../components/StateMessage'
import { useToast } from '../components/toastContext'
import { useDeleteNews, useNewsPost } from '../hooks'
import { useFormatDate } from '../hooks/useFormatDate'
import NotFoundPage from './NotFoundPage'
import styles from './NewsPage.module.css'

export default function NewsPage() {
  const { id = '' } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const toast = useToast()
  const formatDate = useFormatDate()
  const { data: post, isPending, error, refetch } = useNewsPost(id)
  const remove = useDeleteNews()
  const [confirming, setConfirming] = useState(false)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  if (error instanceof ApiError && error.status === 404) {
    return <NotFoundPage title={t('news.notFoundTitle')} text={t('news.notFoundText')} />
  }

  const handleDelete = () => {
    remove.mutate(id, {
      onSuccess: () => {
        toast.push(t('toast.deleted'))
        void navigate('/', { viewTransition: true })
      },
      onError: () => {
        setConfirming(false)
        toast.push(t('toast.error'), 'error')
      },
    })
  }

  return (
    <section className={styles.section} data-tone='wine'>
      <motion.div className={styles.progress} style={{ scaleX: progress }} />

      <div className={`container ${styles.inner}`}>
        <ButtonLink to='/' variant='ghost' viewTransition className={styles.back}>
          ← {t('news.back')}
        </ButtonLink>

        {isPending && (
          <div className={styles.skeleton} aria-busy='true' aria-label={t('state.loading')}>
            <Skeleton style={{ height: 16, width: 140 }} />
            <Skeleton style={{ height: 56 }} />
            <Skeleton style={{ height: 56, width: '70%' }} />
            <Skeleton style={{ height: 16, marginTop: 24 }} />
            <Skeleton style={{ height: 16 }} />
            <Skeleton style={{ height: 16, width: '80%' }} />
          </div>
        )}

        {error && !isPending && (
          <StateMessage title={t('state.errorTitle')} text={t('state.errorText')}>
            <Button onClick={() => void refetch()}>{t('state.retry')}</Button>
          </StateMessage>
        )}

        {post && (
          <motion.article
            className={styles.article}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {post.createDate && (
              <time className={styles.date} dateTime={post.createDate}>
                {formatDate(post.createDate)}
              </time>
            )}
            <h1 className={styles.title} style={{ viewTransitionName: `news-title-${post.id}` }}>
              {post.title}
            </h1>
            <p className={styles.text}>{post.text}</p>

            <div className={styles.actions}>
              <ButtonLink to={`/news/${post.id}/edit`} viewTransition>
                {t('news.edit')}
              </ButtonLink>
              <Button variant='ghost' onClick={() => setConfirming(true)}>
                {t('news.delete')}
              </Button>
            </div>
          </motion.article>
        )}
      </div>

      <ConfirmDialog
        open={confirming}
        title={t('news.deleteTitle')}
        message={t('news.deleteText')}
        confirmLabel={t('news.delete')}
        busy={remove.isPending}
        onConfirm={handleDelete}
        onCancel={() => setConfirming(false)}
      />
    </section>
  )
}
