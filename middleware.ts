// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getHeaderDefaultLang, checkLang } from 'common/util'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  let lang = request.cookies.get('locale')?.value
  let responseSize = request.cookies.get('responseSize')?.value

  // 如果浏览器已经设置了宽度和语言, 则直接返回预渲染的页面
  if (lang && responseSize) {
    lang = checkLang(lang as string)
    return NextResponse.rewrite(
      new URL(`/locale/${lang}/${responseSize}`, request.url)
    )
  }

  // 获取用户设置的语言, 如果没有则获取浏览器的默认语言, 并设置到浏览器中
  if (!lang) {
    lang = getHeaderDefaultLang(
      request.headers.get('accept-language') as string
    )
  } else {
    // 检测请求的语言是否支持, 不支持, 则返回英语
    lang = checkLang(lang as string)
  }

  response.cookies.set('locale', lang)
  return response
}

export const config = {
  matcher: ['/'],
}
