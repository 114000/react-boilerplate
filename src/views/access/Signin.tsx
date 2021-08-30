import React, { FC } from 'react'
import { Link } from 'react-router-dom'

export const Signin: FC<{}> = () => {
  return (
    <div className="absolute w-full h-full flex items-center justify-center">
      <div className=" max-w-80 w-full pb-30">
        <h2 className="text-center text-2xl font-semibold py-4">Welcome Admin</h2>
        <label htmlFor="username" className="block py-2">username: </label>
        <input id="username" className="w-full px-3 py-2 border-gray-500 border" />
        <label htmlFor="password" className="block py-2">password: </label>
        <input id="password" className="w-full px-3 py-2 border-gray-500 border mb-8" />
        
        <Link to="/" className="w-full">
          <button className="w-full px-4 py-2 bg-indigo-500 text-white">Sign In</button>
        </Link>
      </div>
    </div>
  )
}