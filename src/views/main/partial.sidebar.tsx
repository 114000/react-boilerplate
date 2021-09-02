import React, { FC, useRef, useCallback } from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useLocalStorage, useToggle } from 'react-use'
import { ToggleSelf } from '~/components'

export type SidebarItem = {
  name?: string,
  group?: string
  icon?: string,
  value?: string,
  count?: number,
  children?: SidebarItem[]
}

const Logo: FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32">
    <defs>
      <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
        <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
        <stop stopColor="#A5B4FC" offset="100%" />
      </linearGradient>
      <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
        <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
        <stop stopColor="#38BDF8" offset="100%" />
      </linearGradient>
    </defs>
    <rect fill="#6366F1" width="32" height="32" rx="16" />
    <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
    <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
    <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
  </svg>
)

const Item = ({ item, expanded, path, open }: any) => (
  <div className="flex flex-grow items-center">
    <Icon 
      icon={item.icon as string} 
      className={`w-6 h-6 flex-shrink-0 mr-3 ${path === item.value ? 'text-indigo-300' : 'text-gray-400'}`} 
    />
    <div 
      className={
        `flex-1 flex items-center text-sm font-medium 2xl:opacity-100 duration-200 ${expanded ? 'lg:opacity-100' : 'lg:opacity-0' }`
      }
    >
      <span className="flex-1 whitespace-nowrap">{item.name}</span>
      {/* Badge */}
      {item.count !== undefined && (
        <div className="flex-shrink-0 ml-2">
          <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-indigo-500 px-2 rounded-sm">{item.count}</span>
        </div>
      )}
      {/* arrow down */}
      {item.children && (
        <Icon 
          icon="akar-icons:chevron-down" 
          className={`
            w-3 h-3 flex-shrink-0 
            ml-1 fill-current text-gray-400 
            ${open && 'transform rotate-180'}
          `} />
      )}
    </div>
  </div>
)

export const Sidebar: FC<{
  visible: boolean,
  sidebarToggle: (on?: any) => void
}> = (props) => {

  const { visible, sidebarToggle } = props
  const sidebar = useRef(null)
  const BASIC_EXPANDED = true

  const routeMatch = useRouteMatch()
  console.log(routeMatch)
  const [storageExpanded, setStorageExpended] = useLocalStorage(
    'sidebar-expanded', // storage-key
    BASIC_EXPANDED, // storage-defult-value
    { raw: false, serializer: String, deserializer: JSON.parse }
  )
  const [expanded, toggleExpanded] = useToggle(storageExpanded)

  const setExpanded = useCallback((val: boolean) => {
      toggleExpanded(val)
      setStorageExpended(val)
  }, [toggleExpanded, setStorageExpended])


  const items: SidebarItem[] = [
    { group: 'PAGES' },
    { name: '仪表盘', icon: 'ant-design:dashboard-twotone', value: '/dashboard' },
    {
      name: '组件',
      icon: 'ant-design:dashboard-twotone',
      value: '/components',
      count: 77,
      children: [
        { name: 'Button 按钮', value: '/components_button' },
        { name: 'Input Form', value: '/components_input' },
        { name: 'Dropdown 下拉', value: '/components_dropdown' },
      ],
    },
    { group: 'MORE' },
    {
      name: '容器',
      icon: 'ant-design:dashboard-twotone',
      value: '/projects',
      children: [
        { name: 'daily', value: '/projects_daily' },
      ],
    },
  ]

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        onClick={sidebarToggle}
        className={`
          lg:hidden
          fixed inset-0 z-40 lg:z-auto
          bg-gray-900 bg-opacity-30 
          transition-opacity duration-200
          ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
        `} 
        aria-hidden="true"
      ></div>

      <div
        id="sidebar"
        ref={sidebar}
        className={`
          flex flex-col
          absolute z-40 left-0 top-0 
          lg:static lg:left-auto lg:top-auto lg:translate-x-0 
          transform transition-all duration-200 ease-in-out 
          lg:w-20 2xl:w-64
          ${visible ? 'translate-x-0' : '-translate-x-64'}
          ${expanded ? '!w-64' : ''} 

          h-screen 
          overflow-y-scroll lg:overflow-y-auto no-scrollbar 
          flex-shrink-0 
          bg-gray-800 
          p-4 
        `}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            // ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={sidebarToggle}
            aria-controls="sidebar"
            aria-expanded={visible}
          >
            <span className="sr-only">Close sidebar</span>
            <Icon icon="akar-icons:arrow-left" className="w-5 h-5 fill-current" />
          </button>
          {/* Logo */}
          <NavLink exact to="/" className="block">
            <Logo />
          </NavLink>
        </div>
        {/* Links */}
        <div>
          <ul className="mt-3">
            {/* Items for */}
            {items.map((item, i) => (
              item.hasOwnProperty('group') ?
              (<h3 
                key={i} 
                className={`text-xs uppercase text-gray-500 font-semibold pl-3 ${i=== 0 ? 'pt-0' : 'pt-8'}`}
              >
                <span className={`h-5 2xl:block ${expanded ? 'lg:block' : 'lg:hidden'}`}>{item.group}</span>
                <Icon icon="dashicons:ellipsis" className={`w-6 h-5 hidden 2xl:hidden ${expanded ? 'lg:hidden' : 'lg:block'}`} />
              </h3>) :
              <ToggleSelf 
                active={false} 
                key={i}
                tag="li"
                className="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                activeClassName="bg-gray-900"
              >
                {(toggleOpen: (o?: any) => void, open: boolean) => {

                  return (
                    <>
                      { item.children ? (
                        <>
                          <div 
                            className={`block text-gray-200 hover:text-white no-underline transition duration-150 ${routeMatch.path === item.value && 'hover:text-gray-200'}`}
                            onClick={(e) => { e.preventDefault(); expanded ? toggleOpen() : setExpanded(true) }}
                          >
                            <Item path={routeMatch.path} open={open} expanded={expanded} item={item} />
                          </div>
                          <div 
                            className={!expanded ? 'hidden' : ''}>
                            <ul className={`pl-9 mt-1 ${open ? '!block' : 'hidden'}`}>
                              {item.children.map((child, j) =>
                                <li className="mb-1 last:mb-0" key={j}>
                                  <NavLink 
                                    exact 
                                    to={child.value as any} 
                                    className={`
                                      no-underline block 
                                      text-gray-400 hover:text-gray-200 
                                      transition duration-150 
                                      truncate
                                    `} 
                                    activeClassName="text-indigo-400 hover:text-indigo-300">
                                    <span className={`
                                      text-sm 
                                      font-medium 
                                      ml-3 2xl:opacity-100 
                                      duration-200 
                                      ${expanded ? 'lg:opacity-100' : 'lg:opacity-0'}`}
                                    >{child.name}</span>
                                  </NavLink>
                                </li>
                              )}
                            </ul>
                          </div>
                        </>
                      ) : (
                        <NavLink 
                          exact 
                          to={item.value as string}
                          className={`block text-gray-200 hover:text-white no-underline transition duration-150 ${routeMatch.path === item.value && 'hover:text-gray-200'}`}
                        >
                          <Item path={routeMatch.path} open={open} expanded={expanded} item={item} />
                        </NavLink>
                      )}
                    </>
                  )
                }}
              </ToggleSelf>
            ))} 
            {/* Customers */}
          </ul>
        </div>
        
        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setExpanded(!expanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <Icon 
                icon="bi:arrow-bar-right" 
                className={`
                  w-7 h-7 fill-current text-gray-400 transform
                  ${expanded ? 'rotate-180' : ''}
                `} />
            </button>
          </div>
        </div>
      </div>

    </div>
  )
} 