import { NavLink } from 'react-router-dom'
import shopLogo from '../assets/shop_logo.png'
import React, { useState } from 'react'
import { RxDragHandleHorizontal } from "react-icons/rx";
import { MdOutlineAddCard } from "react-icons/md";

function Navbar() {

    const [isMobile, setIsMobile] = useState(false)

    function toggleHandle(){
        setIsMobile(!isMobile)
    }

  return (
    <>
        <div className='bg-gray-200 flex justify-between px-8 md:px-10 lg:px-20 items-center relative'>
            <img src={shopLogo} alt="Shop Logo" className='h-15 w-15 ' />
            <ul className='gap-3 lg:gap-5 items-center hidden md:flex absolute left-1/2 -translate-x-1/2'>
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
                  to="/contact">Contact</NavLink>
              </li>
            </ul>
            <div className='hidden md:flex items-center gap-6'>
<<<<<<< HEAD
                <input type="text" placeholder='Search' className='p-1 border border-gray-500 rounded-lg focus:outline-hidden'/>
                <button className='bg-blue-500 text-white px-3 rounded-lg py-1 cursor-pointer'>Search</button>
=======
                <input type="text" placeholder='Search...' className='w-30 p-1 border border-gray-500 rounded-lg focus:outline-blue-500 '/>
                <button className='bg-blue-500 text-white px-3 rounded-lg py-1'>Search</button>
                <NavLink 
                  className={({isActive})=> isActive ? "block w-full text-white font-bold text-2xl p-1 bg-blue-500 rounded-lg transition-all duration-300 ease-in-out" : "text-black text-2xl"} 
                  to="/create"><MdOutlineAddCard /></NavLink>
>>>>>>> panha-branch
            </div>
            <div className='md:hidden flex w-full justify-end items-center gap-3'>
                <NavLink 
                  className={({isActive})=> isActive ? " text-white font-bold text-2xl p-1 bg-blue-500 rounded-lg transition-all duration-300 ease-in-out" : "text-black text-2xl"} 
                  to="/create"><MdOutlineAddCard /></NavLink>
                <RxDragHandleHorizontal onClick={toggleHandle} className='text-3xl ' />
            </div>
        </div>

        <ul className={`flex md:hidden flex-col items-start gap-6 px-8  overflow-hidden transition-all duration-300 ease-in-out bg-gray-100  ${isMobile ? "max-h-96" : "max-h-0"}`}>
            <li className='w-full mt-3'>
                <NavLink 
                  className={({isActive})=> isActive ? "block w-full text-white font-bold px-1 py-2 bg-blue-500 rounded-lg transition-all duration-300 ease-in-out" : "text-black"} 
                  to="/">Home</NavLink>
              </li>
              <li className='w-full'>
                <NavLink 
                  className={({isActive})=> isActive ? "block w-full text-white font-bold px-1 py-2 bg-blue-500 rounded-lg transition-all duration-300 ease-in-out" : "text-black"} 
                  to="/product">Product</NavLink>
              </li>
              <li className='w-full'>
                <NavLink 
                  className={({isActive})=> isActive ? "block w-full text-white font-bold px-1 py-2 bg-blue-500 rounded-lg transition-all duration-300 ease-in-out" : "text-black"} 
                  to="/about">About</NavLink>
              </li>
              <li className='w-full'>
                <NavLink 
                  className={({isActive})=> isActive ? "block w-full text-white font-bold px-1 py-2 bg-blue-500 rounded-lg transition-all duration-300 ease-in-out" : "text-black"} 
                  to="/contact">Contact</NavLink>
              </li>
              <li className='flex gap-5 mb-5'>
<<<<<<< HEAD
                  <input type="text" placeholder='Search' className='w-auto p-1 border border-gray-500 rounded-lg focus:outline-hidden'/>
                  <button className='bg-blue-500 text-white px-3 rounded-lg py-1 cursor-pointer'>Search</button>
=======
                  <input type="text" placeholder='Search...' className='w-auto p-1 border border-gray-500 rounded-lg focus:outline-hidden'/>
                  <button className='bg-blue-500 text-white px-3 rounded-lg py-1'>Search</button>
                  
>>>>>>> panha-branch
              </li>
        </ul>
    </>
  )
}

export default Navbar