import { SM_WIDTH, BG, SM, supportLangs } from 'common/constant'
// @ts-ignore
import Cookies from 'js-cookie'

export const avoidScollingOverflow = (selecter: string = 'body') => {
  const top = document.documentElement.scrollTop
  let element = document.querySelector(selecter)
  element!.setAttribute(
    'style',
    `top: ${-top}px; overflow: hidden; position: fixed; width: 100%;`
  )

  return () => {
    element!.removeAttribute('style')
    document.documentElement.scrollTo({
      top: top,
    })
    element = null
  }
}

export const getHeaderDefaultLang = (acceptLangs: string) => {
  if (!acceptLangs) {
    return supportLangs[0]
  }

  const langs = acceptLangs.split(';') //  eg zh-CN,zh ; en-US ; en
  for (let i = 0; i < langs.length; i++) {
    for (let j = 0; j < supportLangs.length; j++) {
      if (langs[i].indexOf(supportLangs[j]) !== -1) {
        return supportLangs[j]
      }

      if (supportLangs[j].indexOf(langs[i]) !== -1) {
        return langs[i]
      }

      if (supportLangs[j].slice(0, 2) === langs[i].slice(0, 2)) {
        return langs[i]
      }
    }
  }

  return supportLangs[0]
}

export const checkLang = (defaultLang: string) => {
  return supportLangs.indexOf(defaultLang) !== -1
    ? defaultLang
    : supportLangs[0]
}

export const isMobile = (userAgent: string) => {
  const ua = userAgent.toLowerCase()
  return /mobile|iphone|ipod|phone/i.test(ua)
}

export const getResponseSize = () => {
  const width = document.documentElement.offsetWidth || window.screen.width
  if (width <= SM_WIDTH) {
    Cookies.set('responseSize', SM)
    return SM
  } else {
    Cookies.set('responseSize', BG)
    return BG
  }
}
