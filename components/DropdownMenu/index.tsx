import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

import './index.scss'

type MenuItemType = {
  title: string
  children?: {
    icon?: string
    title: string
  }[]
}

type DropdownMenuProps = {
  menu: MenuItemType[]
  menuClick?: Function
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ menu, menuClick }) => {
  const { t } = useTranslation()

  const [expandIndexs, setExpandIndexs] = useState<any>({})

  const expandMenu = (index: any) => {
    if (!expandIndexs[index]) {
      expandIndexs[index] = true
      setExpandIndexs({
        ...expandIndexs,
      })
    } else {
      expandIndexs[index] = false
      setExpandIndexs({
        ...expandIndexs,
      })
    }
  }

  return (
    <ul className="dropdown-menu">
      {menu?.map((el, index) => {
        return (
          <li
            key={el.title + index}
            className={`${expandIndexs[el.title] ? 'expand' : ''}`}
          >
            {/* menu title area */}
            <div
              className="menu-item"
              onClick={() => {
                expandMenu(el.title)
              }}
            >
              <div className="menu-item-title">{t(el.title)}</div>
              {el.children && el.children.length > 0 && (
                <Image
                  className="menu-arrow"
                  src="/images/icon-arrow-down.svg"
                  width={15}
                  height={9}
                  alt="arrow-down"
                />
              )}
            </div>

            {/* menus item area */}
            {el.children && el.children.length > 0 && (
              <div className="sub-item-wrapper">
                {el.children.map((subEl, index) => {
                  return (
                    <div
                      className="sub-item"
                      key={subEl.title + index}
                      onClick={() => {
                        typeof menuClick === 'function' && menuClick(el)
                      }}
                    >
                      {subEl.icon && (
                        <Image
                          className="mr12"
                          src={subEl.icon}
                          alt={subEl.icon}
                          width={16}
                          height={16}
                        />
                      )}
                      {t(subEl.title)}
                    </div>
                  )
                })}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default React.memo(DropdownMenu)
