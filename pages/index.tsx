import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { GloablContext } from '@/components/GloablContextProvider'

import '@/pages/index.scss'
import { SM, clients } from 'common/constant'

export default function Home() {
  const { t } = useTranslation()

  const { responseSize } = useContext(GloablContext)

  return (
    <main className="home-page-container">
      <section className="content">
        <div className="content-left">
          <div className="banner">
            <div className="banner-top">
              <div className="banner-title">
                {responseSize === SM ? (
                  <p>
                    {t('banner_title_1')} {t('banner_title_2')}
                  </p>
                ) : (
                  <>
                    <p>{t('banner_title_1')}</p>
                    <p>{t('banner_title_2')}</p>
                  </>
                )}
              </div>
              <div className="banner-desc">
                {responseSize === SM ? (
                  <p>
                    {t('banner_desc_1')} {t('banner_desc_2')}{' '}
                    {t('banner_desc_3')}
                  </p>
                ) : (
                  <>
                    <p>{t('banner_desc_1')}</p>
                    <p>{t('banner_desc_2')}</p>
                    <p>{t('banner_desc_3')}</p>
                  </>
                )}
              </div>
              <button className="banner-button">{t('banner_button')}</button>
            </div>
            <ul className="banner-bottom-clients">
              {clients.map((el, index) => {
                return (
                  <li key={index + el.alt}>
                    <Image
                      src={el.icon}
                      alt={el.alt}
                      width={responseSize === SM ? el.width * 0.75 : el.width}
                      height={
                        responseSize === SM ? el.height * 0.75 : el.height
                      }
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="content-right">
          {responseSize === SM ? (
            <Image src="/images/image-hero-mobile.png" alt="hero" fill />
          ) : (
            <Image
              src="/images/image-hero-desktop.png"
              width={480}
              height={640}
              alt="hero"
            />
          )}
        </div>
      </section>
    </main>
  )
}
