import { NavLink } from 'react-router-dom'
import shopLogo from '../assets/shop_logo.png'
import React, { useState } from 'react'
import { RxDragHandleHorizontal } from "react-icons/rx";
import { MdOutlineAddCard } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";

function Navbar() {

    const [isMobile, setIsMobile] = useState(false)

    function toggleHandle(){
        setIsMobile(!isMobile)
    }

  return (
    <>
        <div className='bg-gray-200 flex justify-between px-5 md:px-8 lg:px-20 items-center relative'>
            <img src={shopLogo} alt="Shop Logo" className='h-15 w-15 ' />
            <ul className='gap-3 lg:gap-5 items-center hidden md:flex absolute left-1/2 -translate-x-1/2'>
              <li>
                <NavLink 
                  className={({isActive})=> isActive ? "font-bold underline underline-offset-5 rounded-lg transition-all duration-300 ease-in-out" : "text-black"} 
                  to="/">Home</NavLink>
              </li>
              <li>
                <NavLink 
                  className={({isActive})=> isActive ? "font-bold underline underline-offset-5 rounded-lg transition-all duration-300 ease-in-out" : "text-black"} 
                  to="/product">Product</NavLink>
              </li>
              <li>
                <NavLink 
                  className={({isActive})=> isActive ? "font-bold underline underline-offset-5 rounded-lg transition-all duration-300 ease-in-out" : "text-black"} 
                  to="/about">About</NavLink>
              </li>
              <li>
                <NavLink 
                  className={({isActive})=> isActive ? "font-bold underline underline-offset-5 rounded-lg transition-all duration-300 ease-in-out" : "text-black"} 
                  to="/contact">Contact</NavLink>
              </li>
            </ul>
<<<<<<< Updated upstream
            <div className='hidden md:flex items-center gap-6'>
                <input type="text" placeholder='Search...' className='w-30 p-1 border border-gray-500 rounded-lg focus:outline-blue-500 '/>
                <button className='bg-blue-500 text-white px-3 rounded-lg py-1'>Search</button>
=======
            <div className='hidden md:flex items-center gap-1 md:gap-3'>
>>>>>>> Stashed changes
                <NavLink 
                  className={({isActive})=> isActive ? " text-red-500 font-bold text-2xl p-1 bg-gray-300 rounded-lg transition-all duration-300 ease-in-out" : "text-red-500 text-2xl"} 
                  to="/favorite"><MdFavorite /></NavLink>
                <NavLink 
                  className={({isActive})=> isActive ? " text-black font-bold text-2xl p-1 bg-gray-300 rounded-lg transition-all duration-300 ease-in-out" : "text-black text-2xl"} 
                  to="/create"><MdOutlineAddCard /></NavLink>
            </div>

            <div className='md:hidden flex w-full justify-end items-center gap-3'>
                <NavLink 
                  className={({isActive})=> isActive ? " text-red-500 font-bold text-2xl p-1 bg-gray-300 rounded-lg transition-all duration-300 ease-in-out" : "text-red-500 text-2xl"} 
                  to="/favorite"><MdFavorite /></NavLink>
                <NavLink 
                  className={({isActive})=> isActive ? " text-black font-bold text-2xl p-1 bg-gray-300 rounded-lg transition-all duration-300 ease-in-out" : "text-black text-2xl"} 
                  to="/create"><MdOutlineAddCard /></NavLink>
                <RxDragHandleHorizontal onClick={toggleHandle} className='text-3xl ' />
            </div>
        </div>

        <ul className={`flex md:hidden flex-col items-start gap-6 px-8  overflow-hidden transition-all duration-300 ease-in-out bg-gray-100  ${isMobile ? "max-h-96" : "max-h-0"}`}>
            <li className='w-full mt-3'>
                <NavLink 
                  className={({isActive})=> isActive ? "font-bold underline underline-offset-5 rounded-lg transition-all duration-300 ease-in-out" : "text-black"} 
                  to="/">Home</NavLink>
              </li>
              <li className='w-full'>
                <NavLink 
                  className={({isActive})=> isActive ? "font-bold underline underline-offset-5 rounded-lg transition-all duration-300 ease-in-out" : "text-black"} 
                  to="/product">Product</NavLink>
              </li>
              <li className='w-full'>
                <NavLink 
                  className={({isActive})=> isActive ? "font-bold underline underline-offset-5 rounded-lg transition-all duration-300 ease-in-out" : "text-black"} 
                  to="/about">About</NavLink>
              </li>
              <li className='w-full mb-5'>
                <NavLink 
                  className={({isActive})=> isActive ? "font-bold underline underline-offset-5 rounded-lg transition-all duration-300 ease-in-out" : "text-black"} 
                  to="/contact">Contact</NavLink>
              </li>
<<<<<<< Updated upstream
              <li className='flex gap-5 mb-5'>
                  <input type="text" placeholder='Search...' className='w-auto p-1 border border-gray-500 rounded-lg focus:outline-hidden'/>
                  <button className='bg-blue-500 text-white px-3 rounded-lg py-1'>Search</button>
                  
              </li>
=======
>>>>>>> Stashed changes
        </ul>
    </>
  )
}

export default Navbar