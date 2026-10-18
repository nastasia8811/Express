import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en } from './en'
import { uk } from './uk'

export const LANGUAGES = ['uk', 'en'] as const
export type Language = (typeof LANGUAGES)[number]

const STORAGE_KEY = 'lang'

function detectLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'uk' || saved === 'en') return saved
  } catch {
    // сховище недоступне
  }
  return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'uk'
}

void i18n.use(initReactI18next).init({
  resources: {
    uk: { translation: uk },
    en: { translation: en },
  },
  lng: detectLanguage(),
  fallbackLng: 'uk',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', lng => {
  document.documentElement.lang = lng
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    // нічого страшного
  }
})
document.documentElement.lang = i18n.language

export default i18n
