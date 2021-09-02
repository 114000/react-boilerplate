import React, { FC, HTMLAttributes } from 'react'
import { useClassName } from '~/hooks'

export const Card: FC<HTMLAttributes<any>> = ({
  className = '',
  children,
  ...rest
}) => {

  const baseClass = 'flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200'
  const [newClassName] = useClassName(baseClass, [className])
  

  return (
    <div className={newClassName} {...rest}>
      <div className="px-5 pt-5">
        { children }
      </div>
    </div>
  )
}