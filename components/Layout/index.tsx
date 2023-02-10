// import type { NextPage } from 'next';
import React from 'react'
import Header from 'components/Header'
import './index.scss'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  return (
    <div className="snap-app">
      <Header />
      <main>{props.children}</main>
    </div>
  )
}

export default React.memo(Layout)
