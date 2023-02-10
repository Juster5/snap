import React, { useCallback, useEffect, useState } from 'react'
import { getResponseSize } from 'common/util'
// @ts-ignore
import Cookies from 'js-cookie'
import { checkLang } from 'common/util'
import { SM } from 'common/constant'

type GloablContextProps = {
  children: any
  defaultLang?: string // ssr default lang
  defaultSize?: string // ssr default size
}

type GloablContextType = {
  lang: string
  setLang: Function
  responseSize: string
  setResponseSize: Function
}

export const GloablContext = React.createContext<GloablContextType>(
  {} as GloablContextType
)

// fetch lang from cookie
const locale = checkLang(Cookies.get('locale'))

const Provider = GloablContext.Provider

const GloablContextProvider: React.FC<GloablContextProps> = ({
  children,
  defaultLang,
  defaultSize,
}) => {
  const [lang, setLang] = useState(defaultLang || locale)
  const [responseSize, setResponseSize] = useState(defaultSize || SM)

  // detect screen width
  const dective = useCallback(() => {
    setResponseSize(getResponseSize())
  }, [])

  useEffect(() => {
    dective()
    window.addEventListener('resize', dective, false)
    return () => {
      window.removeEventListener('resize', dective, false)
    }
  }, [])

  return (
    <Provider
      value={{
        lang,
        setLang,
        responseSize,
        setResponseSize,
      }}
    >
      {children}
    </Provider>
  )
}

export default React.memo(GloablContextProvider)
