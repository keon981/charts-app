import { createBrowserRouter, RouterProvider } from 'react-router'

import ChartJsPage from './pages/chartJs/page'
import PaginationTabs from './pages/page-tabs'
import RechartsPage from './pages/recharts/page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PaginationTabs />,
    children: [
      {
        index: true,
        element: <RechartsPage />,
      },
      {
        path: 'chart',
        element: <ChartJsPage />,
      },
    ],
  },
], {
  basename: import.meta.env.VITE_BASE_PATH,
})

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
