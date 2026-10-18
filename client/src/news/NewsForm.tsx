import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch, type FieldNamesMarkedBoolean } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, ButtonLink } from '../components/Button'
import { newsSchema, TEXT_MAX, TITLE_MAX, type NewsFormValues } from './../newsSchema.ts'
import styles from './NewsForm.module.css'

interface NewsFormProps {
  defaultValues?: NewsFormValues
  submitLabel: string
  onSubmit: (
    values: NewsFormValues,
    dirtyFields: FieldNamesMarkedBoolean<NewsFormValues>
  ) => Promise<void> | void
}

export function NewsForm({
  defaultValues = { title: '', text: '' },
  submitLabel,
  onSubmit,
}: NewsFormProps) {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues,
  })

  const titleLength = useWatch({ control, name: 'title' }).length
  const textLength = useWatch({ control, name: 'text' }).length

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={handleSubmit(values => onSubmit(values, dirtyFields))}
    >
      <div className={styles.field}>
        <label htmlFor='title' className={styles.label}>
          {t('form.title')}
        </label>
        <input
          id='title'
          className={styles.input}
          placeholder={t('form.titlePlaceholder')}
          aria-invalid={!!errors.title}
          aria-describedby='title-error'
          {...register('title')}
        />
        <div className={styles.meta}>
          <span id='title-error' className={styles.error} role='alert'>
            {errors.title?.message && t(errors.title.message as never)}
          </span>
          <span className={styles.counter}>
            {titleLength}/{TITLE_MAX}
          </span>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor='text' className={styles.label}>
          {t('form.text')}
        </label>
        <textarea
          id='text'
          rows={9}
          className={`${styles.input} ${styles.textarea}`}
          placeholder={t('form.textPlaceholder')}
          aria-invalid={!!errors.text}
          aria-describedby='text-error'
          {...register('text')}
        />
        <div className={styles.meta}>
          <span id='text-error' className={styles.error} role='alert'>
            {errors.text?.message && t(errors.text.message as never)}
          </span>
          <span className={styles.counter}>
            {textLength}/{TEXT_MAX}
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? t('form.saving') : submitLabel}
        </Button>
        <ButtonLink to='/' variant='ghost' viewTransition>
          {t('form.cancel')}
        </ButtonLink>
      </div>
    </form>
  )
}
