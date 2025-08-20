import React, { useState } from 'react'

import { PaginationContent, PaginationItem, PaginationNav } from 'efai-ui-component'
import { Outlet, useNavigate } from 'react-router'

interface PageRouter {
  router: string
  label: 'Recharts' | 'ChartsJS'
}

const pageRouter: PageRouter[] = [{
  router: '/',
  label: 'Recharts',
}, {
  router: '/chart',
  label: 'ChartsJS',
}]

function PaginationTabs() {
  const [page, setPage] = useState<'Recharts' | 'ChartsJS'>('Recharts')
  const navigate = useNavigate()

  const handlePageChange = (page: PageRouter) => {
    navigate(page.router)
    setPage(page.label)
  }

  return (
    <>
      {/* <PaginationNav className="absolute top-6 justify-center">
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
      </PaginationNav> */}
      <Outlet />
    </>
  )
}

export default PaginationTabs
