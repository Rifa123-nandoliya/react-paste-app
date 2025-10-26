import React from 'react'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="bg-white/70 backdrop-blur-sm py-3 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
  <div className="text-2xl sm:text-3xl font-serif font-extrabold text-indigo-600">QuickPaste</div>
  <nav className='flex flex-row gap-4 text-base md:text-lg'>
          <NavLink
            to="/"
            className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'text-indigo-600 font-semibold' : 'text-gray-700 hover:text-indigo-600'}`}>
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'text-indigo-600 font-semibold' : 'text-gray-700 hover:text-indigo-600'}`}>
            Pastes
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
