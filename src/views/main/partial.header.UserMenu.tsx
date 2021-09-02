import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from '~/components'

export function UserMenu() {
  return (
    <Dropdown label="Acme Inc.">
      <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
        <div className="font-medium text-gray-800">Acme Inc.</div>
        <div className="text-xs text-gray-500 italic">Administrator</div>
      </div>
      <ul>
        <li>
          <Link
            className="no-underline font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
            to="/settings"
          >
            Settings2
          </Link>
        </li>
        <li>
          <Link
            className="no-underline font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
            to="/signin"
          >
            Sign Out
          </Link>
        </li>
      </ul>
    </Dropdown>
  )
}