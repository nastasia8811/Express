import { useTranslation } from 'react-i18next'

export function useFormatDate() {
  const { i18n } = useTranslation()
  const formatter = new Intl.DateTimeFormat(i18n.language, { dateStyle: 'long' })

  return (value?: string) => {
    if (!value) return ''
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? '' : formatter.format(date)
  }
}
