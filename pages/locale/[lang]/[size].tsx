import Home from '../..'
import { SM, MID, BG, EN, ZH } from 'common/constant'

export async function getStaticPaths() {
  return {
    paths: [
      { params: { lang: ZH, size: SM } },
      { params: { lang: ZH, size: MID } },
      { params: { lang: ZH, size: BG } },
      { params: { lang: EN, size: SM } },
      { params: { lang: EN, size: MID } },
      { params: { lang: EN, size: BG } },
    ],
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps(context: any) {
  const { params } = context

  return {
    props: {
      staticLang: params.lang,
      staticSize: params.size,
    },
  }
}

export default Home
