import { createBrowserRouter, RouterProvider } from 'react-router'

import FrontPage from './pages/front/page'

import './styles/App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <FrontPage />,
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
