import React, { FC } from 'react'

export interface MenuItem {
  name: string,
  value: string
}


export const Menu: FC<{}> = () => {
  return (
    <div>
      Menu
    </div>
  )
}