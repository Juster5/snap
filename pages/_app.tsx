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

  // 客户端加载语言包
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
    // 如果路径有带语言和屏幕信息则从路径里面取
    lang = query.lang
    responseSize = query.size
  } else {
    // 否则, 则从cookie里面取
    if (!req || !req.cookies || !req.headers) return {}

    const { cookies, headers } = req

    const defaultLanguage = getHeaderDefaultLang(headers['accept-language'])
    const userAgent = headers['user-agent']

    // 首选cookie中语言, 否则取浏览器默认语言
    lang = checkLang(cookies.locale || (defaultLanguage as string))

    // 首选cookie中传递过来的屏幕宽度, 如果没有则根据user-agent来判断是否为手机, 如果不是则不做处理
    responseSize =
      cookies.responseSize || (isMobile(userAgent) ? SM : undefined)
  }

  // 设置语言, 并渲染对应的语言的页面
  initI18n(lang)

  return {
    lang,
    responseSize,
  }
}
