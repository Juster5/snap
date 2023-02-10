import React from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

import './index.scss'

type menuItem = {
  icon?: string
  title: string
}

type CollpaseMenuProps = {
  children: any
  menu?: menuItem[]
  position?: 'left' | 'right' // menu position
  menuClick?: Function
}

const CollpaseMenu: React.FC<CollpaseMenuProps> = ({
  children,
  menu,
  position,
  menuClick,
}) => {
  const { t } = useTranslation()

  return (
    <div className="collpase-wrapper">
      {children}

      {/* menu ui */}
      {menu && menu.length > 0 && (
        <div
          className={`collpase-menu collpase-${position ? position : 'left'}`}
        >
          {menu?.map((el, index) => {
            return (
              <div
                className="menu-item"
                key={index}
                onClick={() => {
                  menuClick && menuClick(el)
                }}
              >
                {el.icon && (
                  <Image
                    className="menu-item__icon"
                    src={el.icon}
                    alt={el.icon}
                    width={16}
                    height={16}
                  />
                )}
                <div className="menu-item__text">
                  <div className="title">{t(el.title)}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default React.memo(CollpaseMenu)
