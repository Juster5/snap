// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getHeaderDefaultLang, checkLang } from 'common/util'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  let lang = request.cookies.get('locale')?.value
  let responseSize = request.cookies.get('responseSize')?.value

  if (lang && responseSize) {
    lang = checkLang(lang as string)
    return NextResponse.rewrite(
      new URL(`/locale/${lang}/${responseSize}`, request.url)
    )
  }

  if (!lang) {
    lang = getHeaderDefaultLang(
      request.headers.get('accept-language') as string
    )
  } else {
    lang = checkLang(lang as string)
  }

  response.cookies.set('locale', lang)
  return response
}

export const config = {
  matcher: ['/'],
}
