import type { NextPage } from 'next'
// @ts-ignore
import Cookies from 'js-cookie'
import { useCallback, useEffect, useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { avoidScollingOverflow } from 'common/util'
import { langs, menus } from 'common/constant'
import Image from 'next/image'

import DropdownMenu from '../../DropdownMenu'
import Drawer from '../../Drawer'
import { GloablContext } from '../../GloablContextProvider'

import './index.scss'
import React from 'react'

const MobileHeader: NextPage = () => {
  const { t, i18n } = useTranslation()

  const [showDrawer, setShowDrawer] = useState(false)

  const { lang, setLang } = useContext(GloablContext)

  const clickMenu = useCallback(() => {
    setShowDrawer(true)
  }, [])

  const closeDrawer = useCallback(() => {
    setShowDrawer(false)
  }, [])

  useEffect(() => {
    if (showDrawer) {
      return avoidScollingOverflow()
    }
  }, [showDrawer])

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
    <div className="snap-mobile-header">
      {/* logo */}
      <div className="logo-wrapper">snap</div>

      {/* menu area */}
      <div className="login-wrapper">
        <span className="menu">
          <Image
            onClick={clickMenu}
            src="/images/icon-menu.svg"
            width={32}
            height={18}
            alt="menu"
          />
        </span>
      </div>

      <Drawer isShow={showDrawer} rightMenuClick={closeDrawer}>
        {/* mobile lang area */}
        <div className="mobile-language">
          {langs.map((el) => {
            return (
              <div
                className={`mobile-lang-btn ${el.key === lang ? 'active' : ''}`}
                key={el.key}
                onClick={() => {
                  changeLang(el.key)
                }}
              >
                {el.title}
              </div>
            )
          })}
        </div>

        {/* mobile area */}
        {<DropdownMenu menu={menus} />}

        {/* mobile login area */}
        <div className="mobile-login-wrapper">
          <span className="login">{t('common_login')}</span>
          <span className="register">{t('common_register')}</span>
        </div>
      </Drawer>
    </div>
  )
}

export default React.memo(MobileHeader)
