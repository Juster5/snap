import type { NextPage } from 'next'
import React from 'react'
// @ts-ignore
import Cookies from 'js-cookie'
import { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { langs, menus } from 'common/constant'

import CollpaseMenu from '../../CollapseMenu'
import { GloablContext } from '../../GloablContextProvider'

import './index.scss'

const PCHeader: NextPage = () => {
  const { t, i18n } = useTranslation()

  const { setLang } = useContext(GloablContext)

  const changeLang = useCallback((lang: string) => {
    // fetch lang resource
    if (i18n.languages.indexOf(lang) === -1) {
      i18n.loadLanguages(lang, () => {
        i18n.changeLanguage(lang)
        Cookies.set('locale', lang)
      })
    } else {
      // switch lang
      i18n.changeLanguage(lang)
      Cookies.set('locale', lang)
    }
    setLang(lang)
  }, [])

  return (
    <>
      {/* logo */}
      <div className="logo-wrapper">snap</div>

      {/* pc menu */}
      <div className="pc-navs">
        {menus.map((el) => {
          return (
            <CollpaseMenu menu={el.children} key={el.title}>
              <div className="nav-item">
                <span>{t(el.title)}</span>
                {el.children && el.children.length > 0 && (
                  <span className="title-arrow okx-header-footer-arrow-chevrons-down"></span>
                )}
              </div>
            </CollpaseMenu>
          )
        })}
      </div>

      {/* pc login area */}
      <div className="login-wrapper">
        <span className="login mr12">{t('common_login')}</span>
        <span className="signup">{t('common_register')}</span>
      </div>

      <CollpaseMenu
        position="right"
        menu={langs}
        menuClick={(el: any) => {
          changeLang(el.key)
        }}
      >
        <div className="languages">
          <span className="okx-header-footer-language"></span>
        </div>
      </CollpaseMenu>
    </>
  )
}

export default React.memo(PCHeader)
