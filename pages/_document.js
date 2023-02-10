import { Html,Head,Main,NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <title>Snap</title>
        <link rel="stylesheet" type="text/css" href="/fonts/font.css" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <body id="body">
        <Main id="main" />
        <NextScript />
      </body>
    </Html>
  )
}
