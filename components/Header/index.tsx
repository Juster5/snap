import type { NextPage } from 'next'
// @ts-ignore
import { useContext } from 'react'
import { SM } from 'common/constant'

import PCHeader from './PCHeader'
import MobileHeader from './MobileHeader'

import { GloablContext } from '../GloablContextProvider'

import React from 'react'

const Header: NextPage = () => {
  const { responseSize } = useContext(GloablContext)

  return (
    <>
      <header className="snap-header">
        {responseSize === SM ? <MobileHeader /> : <PCHeader />}
      </header>
    </>
  )
}

export default React.memo(Header)
