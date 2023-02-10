import React from 'react'
import Image from 'next/image'
import './index.scss'

type DrawerPropsType = {
  children: any
  isShow?: boolean
  rightMenuClick: Function
}
const Drawer: React.FC<DrawerPropsType> = ({
  children,
  isShow = true,
  rightMenuClick,
}) => {
  return (
    <>
      <div className={`drawer-wrapper ${isShow ? 'show' : ''}`}>
        <div
          className="close-warpper"
          onClick={() => {
            rightMenuClick()
          }}
        >
          <Image
            src="/images/icon-close-menu.svg"
            width={26}
            height={26}
            alt="close"
          />
        </div>
        {children}
      </div>
      <div className={`drawer-mask  ${isShow ? 'show' : ''}`}></div>
    </>
  )
}

export default React.memo(Drawer)
