import {
  BG_WIDTH,
  MID_WIDTH,
  SM_WIDTH,
  BG,
  SM,
  MID,
  supportLangs,
} from 'common/constant'
// @ts-ignore
import Cookies from 'js-cookie'

// 防止文档传屏滚动
export const avoidScollingOverflow = (selecter: string = 'body') => {
  const top = document.documentElement.scrollTop
  let element = document.querySelector(selecter)
  element!.setAttribute(
    'style',
    `top: ${-top}px; overflow: hidden; position: fixed; width: 100%;`
  )

  // 返回清除方法
  return () => {
    element!.removeAttribute('style')
    document.documentElement.scrollTo({
      top: top,
    })
    element = null
  }
}

// 格式化浏览器默认语言, 并检测语言是否支持, 一般浏览器传过来的格式为这种 accept-language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,ja;q=0.5, 需要解析一下
export const getHeaderDefaultLang = (acceptLangs: string) => {
  if (!acceptLangs) {
    return supportLangs[0]
  }

  // 查询浏览器支持的语言是否在服务端支持的语言列表中
  const langs = acceptLangs.split(';') //  eg zh-CN,zh ; en-US ; en
  for (let i = 0; i < langs.length; i++) {
    for (let j = 0; j < supportLangs.length; j++) {
      // 以下三种种情况都表示匹配到支持的语言, 则直接返回支持的语言

      // 浏览器zh-CN,zh  : 服务端zh-CN
      if (langs[i].indexOf(supportLangs[j]) !== -1) {
        return supportLangs[j]
      }

      // 服务端zh-CN : 浏览器zh
      if (supportLangs[j].indexOf(langs[i]) !== -1) {
        return langs[i]
      }

      // zh-TW, zh-CN, 语言相同, 地区不同
      if (supportLangs[j].slice(0, 2) === langs[i].slice(0, 2)) {
        return langs[i]
      }
    }
  }

  // 没有交集返回默认支持的语言, 即英语
  return supportLangs[0]
}

// 检测当前语言是否支持, 不支持则返回英语en-US
export const checkLang = (defaultLang: string) => {
  return supportLangs.indexOf(defaultLang) !== -1
    ? defaultLang
    : supportLangs[0]
}

// 判断是否为移动端
export const isMobile = (userAgent: string) => {
  const ua = userAgent.toLowerCase()
  return /mobile|iphone|ipod|phone/i.test(ua)
}

// 获取屏幕大小, 并设置到cookie中, 方便下次访问服务端渲染, 可以根据屏幕大小返回不同的资源
export const getResponseSize = () => {
  const width = document.documentElement.offsetWidth || window.screen.width
  if (width <= SM_WIDTH) {
    Cookies.set('responseSize', SM)
    return SM
  } else if (width >= MID_WIDTH && width <= BG_WIDTH) {
    Cookies.set('responseSize', MID)
    return MID
  } else {
    Cookies.set('responseSize', BG)
    return BG
  }
}
