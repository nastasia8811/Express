import { createBrowserRouter } from 'react-router'
import { Layout } from '../components/Layout'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import('../pages/HomePage')).default }),
      },
      {
        path: 'news/new',
        lazy: async () => ({ Component: (await import('../pages/NewsFormPage')).CreateNewsPage }),
      },
      {
        path: 'news/:id',
        lazy: async () => ({ Component: (await import('../pages/NewsPage')).default }),
      },
      {
        path: 'news/:id/edit',
        lazy: async () => ({ Component: (await import('../pages/NewsFormPage')).EditNewsPage }),
      },
      {
        path: '*',
        lazy: async () => ({ Component: (await import('../pages/NotFoundPage')).default }),
      },
    ],
  },
])
