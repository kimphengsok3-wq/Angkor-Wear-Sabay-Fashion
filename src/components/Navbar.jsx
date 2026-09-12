import React from 'react'
import { NavLink } from 'react-router-dom'
import { RiReactjsFill } from "react-icons/ri";
import shopLogo from '../assets/shop_logo.png'

function Navbar() {
  return (
      <div className='bg-gray-200'>
        <ul className='flex gap-5 px-10 py-3 items-center'>
          <img src={shopLogo} alt="Shop Logo" className='h-15 w-15' />
          <li>
            <NavLink 
              className={({isActive})=> isActive ? "text-white font-bold p-3 bg-blue-500 rounded-lg transition-all duration-300 ease-in-out" : "text-black"} 
              to="/">Home</NavLink>
          </li>
          <li>
            <NavLink 
              className={({isActive})=> isActive ? "text-white font-bold p-3 bg-blue-500 rounded-lg transition-all duration-300 ease-in-out" : "text-black"} 
              to="/product">Product</NavLink>
          </li>
          <li>
            <NavLink 
              className={({isActive})=> isActive ? "text-white font-bold p-3 bg-blue-500 rounded-lg transition-all duration-300 ease-in-out" : "text-black"} 
              to="/about">About</NavLink>
          </li>
          <li>
            <NavLink 
              className={({isActive})=> isActive ? "text-white font-bold p-3 bg-blue-500 rounded-lg transition-all duration-300 ease-in-out" : "text-black"} 
              to="/create">Create</NavLink>
          </li>
        </ul>
      </div>
  )
}

export default Navbar