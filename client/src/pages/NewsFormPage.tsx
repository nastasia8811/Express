import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'
import { ApiError } from './../error/ApiError.ts'
import { Skeleton } from '../components/Skeleton'
import { useToast } from '../components/toastContext'
import { useCreateNews, useNewsPost, useUpdateNews } from './../hooks.ts'
import { NewsForm } from '../news/NewsForm'
import type { NewsFormValues } from './../newsSchema.ts'
import NotFoundPage from './NotFoundPage'
import styles from './NewsFormPage.module.css'

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section} data-tone='ice'>
      <motion.div
        className={`container ${styles.inner}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className={styles.title}>{title}</h1>
        {children}
      </motion.div>
    </section>
  )
}

export function CreateNewsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const toast = useToast()
  const create = useCreateNews()

  const handleSubmit = async (values: NewsFormValues) => {
    try {
      const post = await create.mutateAsync(values)
      toast.push(t('toast.created'))
      void navigate(`/news/${post.id}`, { viewTransition: true })
    } catch {
      toast.push(t('toast.error'), 'error')
    }
  }

  return (
    <Shell title={t('form.createTitle')}>
      <NewsForm submitLabel={t('form.create')} onSubmit={handleSubmit} />
    </Shell>
  )
}

export function EditNewsPage() {
  const { id = '' } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const toast = useToast()
  const { data: post, isPending, error } = useNewsPost(id)
  const update = useUpdateNews(id)

  if (error instanceof ApiError && error.status === 404) {
    return <NotFoundPage title={t('news.notFoundTitle')} text={t('news.notFoundText')} />
  }

  const handleSubmit = async (
    values: NewsFormValues,
    dirty: Partial<Record<keyof NewsFormValues, boolean | undefined>>
  ) => {
    const changes: Partial<NewsFormValues> = {}
    if (dirty.title) changes.title = values.title
    if (dirty.text) changes.text = values.text

    try {
      if (Object.keys(changes).length > 0) {
        await update.mutateAsync(changes)
        toast.push(t('toast.updated'))
      }
      void navigate(`/news/${id}`, { viewTransition: true })
    } catch {
      toast.push(t('toast.error'), 'error')
    }
  }

  return (
    <Shell title={t('form.editTitle')}>
      {isPending && !error && (
        <div className={styles.skeleton} aria-busy='true' aria-label={t('state.loading')}>
          <Skeleton style={{ height: 56 }} />
          <Skeleton style={{ height: 220 }} />
        </div>
      )}
      {post && (
        <NewsForm
          key={post.id}
          defaultValues={{ title: post.title, text: post.text, genre: 'Other', isPrivate: false }}
          submitLabel={t('form.save')}
          onSubmit={handleSubmit}
        />
      )}
    </Shell>
  )
}
