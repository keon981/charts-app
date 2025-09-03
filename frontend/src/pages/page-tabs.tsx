import { useState } from 'react'

import { PaginationContent, PaginationItem, PaginationNav } from 'efai-ui-component'
import { Outlet, useLocation, useNavigate } from 'react-router'

enum PageLabelENUM {
  RECHARTS = 'Recharts (SVG)',
  CHARTS = 'ChartJS (Canvas)',
  DOSE = 'Dose (SVG)',
}

const pageRouterMap: Record<string, PageLabelENUM> = {
  '/': PageLabelENUM.RECHARTS,
  '/chart': PageLabelENUM.CHARTS,
  '/dose': PageLabelENUM.DOSE,
}

interface PageRouter {
  router: string
  label: PageLabelENUM
}

const pageRouter: PageRouter[] = [
  {
    router: '/',
    label: PageLabelENUM.RECHARTS,
  },
  {
    router: '/chart',
    label: PageLabelENUM.CHARTS,
  },
  {
    router: '/dose',
    label: PageLabelENUM.DOSE,
  },
]

function PaginationTabs() {
  const location = useLocation()
  const _page = pageRouterMap[location.pathname] ?? PageLabelENUM.RECHARTS
  const [page, setPage] = useState<PageLabelENUM>(_page)
  const navigate = useNavigate()

  const handlePageChange = (page: PageRouter) => {
    navigate(page.router)
    setPage(page.label)
  }

  return (
    <>
      <PaginationNav className="py-4 mb-4 justify-center">
        <PaginationContent className="px-4 py-2 bg-accent-foreground/50 rounded-full">
          {pageRouter.map(item => (
            <PaginationItem
              key={item.router}
              isActive={page === item.label}
              classNames={{
                button: 'bg-transparent border-0 rounded-full',
              }}
              onClick={() => handlePageChange(item)}
            >
              {item.label}
            </PaginationItem>
          ))}
        </PaginationContent>
      </PaginationNav>
      <Outlet />
    </>
  )
}

export default PaginationTabs
