import { Suspense, useEffect } from 'react'
import type { AppProps } from 'next/app'
import Layout from 'components/Layout'
import ErrorBoundary from 'components/ErrorBoundary'
import Loading from '@/components/Loading'
import GloablContextProvider from '@/components/GloablContextProvider'
import init from '../common/i18n'
import initI18n from '../common/i18nForServer'
import { checkLang, getHeaderDefaultLang, isMobile } from 'common/util'
import { langPath, SM } from 'common/constant'
import '@/styles/global.scss'
import '@/styles/media.scss'

type IProps = AppProps & { lang?: string; responseSize?: string }

export default function MyApp(props: IProps) {
  const { Component, lang, responseSize } = props

  // fetch lang resource in browser
  useEffect(() => {
    init(lang)
  }, [])

  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <GloablContextProvider defaultLang={lang} defaultSize={responseSize}>
          <Layout>
            <Component {...props} />
          </Layout>
        </GloablContextProvider>
      </ErrorBoundary>
    </Suspense>
  )
}

MyApp.getInitialProps = ({ ctx }: any) => {
  let lang, responseSize

  const { req, query, pathname } = ctx

  if (pathname === langPath) {
    lang = query.lang
    responseSize = query.size
  } else {
    if (!req || !req.cookies || !req.headers) return {}

    const { cookies, headers } = req

    const defaultLanguage = getHeaderDefaultLang(headers['accept-language'])
    const userAgent = headers['user-agent']

    lang = checkLang(cookies.locale || (defaultLanguage as string))

    responseSize =
      cookies.responseSize || (isMobile(userAgent) ? SM : undefined)
  }

  // init ssr i18n instance
  initI18n(lang)

  return {
    lang,
    responseSize,
  }
}
