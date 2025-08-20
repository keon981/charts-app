import { createBrowserRouter, RouterProvider } from 'react-router'

import RechartsPage from './pages/recharts/page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RechartsPage />,
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
