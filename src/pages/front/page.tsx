import { useState } from 'react'

import { Button } from 'efai-ui-component'
import { Link } from 'react-router'

import Logo from '@/assets/logo/big-logo.svg'
import '@/styles/App.css'

function FrontPage() {
  const [count, setCount] = useState(0)

  const value = (count % 2) === 1
    ? 'ODD'
    : 'Even'

  return (
    <>
      <hgroup className="flex justify-center items-center">
        <i>
          <Link
            to="https://www.everfortuneai.com.tw/zh/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={Logo} className="logo" alt="EFAI logo" />
          </Link>
        </i>
        <h1 className="text-5xl font-bold">EFAI</h1>
      </hgroup>
      <div className="card">
        <p>Count: {count}</p>
        <Button type="button" onClick={() => setCount(count => count + 1)}>
          {value}
        </Button>
      </div>
      <p className="read-the-docs">
        Click on the EFAI logo to learn more
      </p>
    </>
  )
}

export default FrontPage
