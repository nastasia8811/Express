import { useTranslation } from 'react-i18next'
import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { Skeleton } from '../components/Skeleton'
import { StateMessage } from '../components/StateMessage'
import { Button } from '../components/Button'
import { useNewsList } from './../hooks'
import { NewsCard } from './NewsCard'
import styles from './NewsList.module.css'
import { useState } from 'react'

const SIZE = 6

export function NewsList() {
  const { t } = useTranslation()
  const [page, setPage] = useState(0)
  const { data, isPending, isError, refetch, isRefetching } = useNewsList(page, SIZE)

  if (isPending) {
    return (
      <div className={styles.grid} aria-busy='true' aria-label={t('state.loading')}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={styles.skeletonCard}>
            <Skeleton style={{ height: 14, width: '35%' }} />
            <Skeleton style={{ height: 28, width: '85%' }} />
            <Skeleton style={{ height: 14 }} />
            <Skeleton style={{ height: 14 }} />
            <Skeleton style={{ height: 14, width: '60%' }} />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <StateMessage title={t('state.errorTitle')} text={t('state.errorText')}>
        <Button onClick={() => void refetch()} disabled={isRefetching}>
          {t('state.retry')}
        </Button>
      </StateMessage>
    )
  }

  if (data.length === 0 && page === 0) {
    return (
      <StateMessage title={t('list.emptyTitle')} text={t('list.emptyText')}>
        <ButtonLink to='/news/new' viewTransition>
          {t('nav.add')}
        </ButtonLink>
      </StateMessage>
    )
  }

  if (data.length === 0 && page > 0) {
    return (
      <StateMessage title={t('list.noMoreTitle')} text={t('list.noMoreText')}>
        <Button onClick={() => setPage(page - 1)}>{t('pagination.back')}</Button>
      </StateMessage>
    )
  }

  return (
    <>
      <div className={styles.grid}>
        {data.map((post, index) => (
          <Reveal key={post.id} delay={(index % 3) * 0.08}>
            <NewsCard post={post} />
          </Reveal>
        ))}
      </div>
      <div className={styles.pagination}>
        <Button onClick={() => setPage(page - 1)} disabled={page === 0}>
          {t('pagination.back')}
        </Button>
        <span className={styles.page}>
          <span className={styles.page}>{t('pagination.pageNum', { page: page + 1 })}</span>
        </span>
        <Button onClick={() => setPage(page + 1)} disabled={data.length < SIZE}>
          {t('pagination.next')}
        </Button>
      </div>
    </>
  )
}
