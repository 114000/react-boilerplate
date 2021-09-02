import React, { useRef, FC } from 'react'
import { Icon } from '@iconify/react'
import { useKey, useToggle } from 'react-use'
import { Transition } from '~/components'
import { useEventListener } from '~/hooks'

// import UserAvatar from '../../images/user-avatar-32.png'

export const Dropdown: FC<{
  label?: string,
}> = ({
  label,
  children,
  ...rest
}) => {

  const [dropdownOpen, toggleDropdownOpen] = useToggle(false)

  const trigger = useRef<HTMLButtonElement>(null)
  const dropdown = useRef<HTMLDivElement>(null)

  // close on click 
  useEventListener(document, 'click', ({ target }: Event) => {
    if (!dropdown.current) return;
    if (
      !dropdownOpen || 
      dropdown.current?.contains(target as Node) || 
      trigger.current?.contains(target as Node)
    ) return

    toggleDropdownOpen(false)

  }, [dropdownOpen])


  // close if the esc key is pressed
  useKey('Escape', () => {
    if (!dropdownOpen) return
    toggleDropdownOpen(false)
  }, undefined, [dropdownOpen])

  return (
    <div className="relative inline-flex" {...rest}>
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={toggleDropdownOpen}
        aria-expanded={dropdownOpen}
      >
        {/*<img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" /> */}
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800">{ label }</span>
          <Icon icon="akar-icons:chevron-down" className="flex-shrink-0 ml-1 fill-current text-gray-400" />
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => toggleDropdownOpen(true)}
          onBlur={() => toggleDropdownOpen(false)}
          onClick={toggleDropdownOpen}
        >
          { children }
        </div>
      </Transition>
    </div>
  )
}