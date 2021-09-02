import React, { FC, DetailedHTMLProps, HTMLAttributes } from 'react'
import { useToggle } from 'react-use'

interface ToggleSelfProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  active: boolean
  activeClassName?: string,
  tag?: string
}


export const ToggleSelf: FC<ToggleSelfProps> = ({
  children,
  active,
  className,
  activeClassName,
  tag = 'div',
  ...rest
}) => {

  const [open, toggleOpen] = useToggle(active)
  const Component = tag

  ;(rest as Partial<ToggleSelfProps>).className = `
    ${className}
    ${active && activeClassName}
  `
  return (
    <Component {...rest}>
      {typeof children === 'function' ? children(toggleOpen, open) : children}
    </Component>
  );
}