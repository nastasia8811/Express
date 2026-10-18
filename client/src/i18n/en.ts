import type { Translation } from './uk'

export const en: Translation = {
  brand: 'Herald',
  nav: {
    home: 'Home',
    add: 'Add news',
  },
  hero: {
    eyebrow: 'News service',
    title: 'News that moves with you',
    subtitle:
      'Share events, edit them and read what matters in one place — fast, convenient and noise-free.',
    read: 'Read the news',
  },
  list: {
    title: 'Latest news',
    count_one: '{{count}} story',
    count_few: '{{count}} stories',
    count_many: '{{count}} stories',
    count_other: '{{count}} stories',
    emptyTitle: 'Nothing here yet',
    emptyText: 'Be the first to publish a story.',
  },
  about: {
    title: 'Why Herald',
    items: {
      fast: { title: 'Fast', text: 'Pages open instantly and data refreshes without reloading.' },
      simple: {
        title: 'Simple',
        text: 'Creating or editing a story takes a minute — just a title and text.',
      },
      yours: {
        title: 'Yours',
        text: 'You control every post: edit or delete it whenever you like.',
      },
    },
  },
  cta: {
    title: 'Got something to tell?',
    text: 'Add a story right now — it will appear in the feed instantly.',
  },
  news: {
    back: 'Back to list',
    edit: 'Edit',
    delete: 'Delete',
    readMore: 'Read more',
    deleteTitle: 'Delete this story?',
    deleteText: 'This action cannot be undone.',
    notFoundTitle: 'Story not found',
    notFoundText: 'It may have been deleted or the link is wrong.',
  },
  form: {
    createTitle: 'New story',
    editTitle: 'Edit story',
    title: 'Title',
    titlePlaceholder: 'What is this story about?',
    text: 'Story text',
    textPlaceholder: 'Tell us the details…',
    create: 'Publish',
    save: 'Save changes',
    cancel: 'Back to list',
    saving: 'Saving…',
  },
  validation: {
    titleMin: 'Title must be at least 3 characters',
    titleMax: 'Title is too long (up to 120 characters)',
    textMin: 'Text must be at least 10 characters',
    textMax: 'Text is too long (up to 5000 characters)',
  },
  toast: {
    created: 'Story published',
    updated: 'Changes saved',
    deleted: 'Story deleted',
    error: 'Something went wrong. Please try again',
  },
  state: {
    errorTitle: 'Could not load',
    errorText: 'Check your connection and try again.',
    retry: 'Try again',
    loading: 'Loading',
  },
  notFound: {
    title: 'Page not found',
    text: 'Looks like this page does not exist.',
    home: 'Go home',
  },
  footer: '© {{year}} Herald. A learning project.',
  lang: 'Language',
}
