import React from 'react'
import { NavLink } from 'react-router-dom'

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { ImYoutube } from "react-icons/im";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              Sabay<span className="text-blue-400">-Fashion</span>
            </h2>

            <p className="text-gray-400 mt-4 leading-7">
              Discover your style with Sabay-Fashion.
              We bring you modern and comfortable clothes
              for every occasion.
            </p>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://web.facebook.com/"
                className="w-10 h-10 flex items-center justify-center
                rounded-full bg-white hover:bg-gray-300
                transition"
              >
                <FaFacebook className='text-blue-500'/>
              </a>

              <a
                href="https://www.instagram.com/"
                className="w-10 h-10 flex items-center justify-center
                rounded-full bg-white hover:bg-gray-300
                transition "
              >
                <FaInstagram className='text-black'/>
              </a>

              <a
                href="https://www.tiktok.com/"
                className="w-10 h-10 flex items-center justify-center
                rounded-full bg-white hover:bg-gray-300
                transition"
              >
                <AiFillTikTok className='text-black'/>
              </a>

              <a
                href="https://www.youtube.com/"
                className="w-10 h-10 flex items-center justify-center
                rounded-full bg-white hover:bg-gray-300
                transition"
              >
                <ImYoutube className='text-red-500'/>
              </a>
            </div>
          </div>


          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <NavLink className="hover:text-white transition" to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink className="hover:text-white transition" to="/product">Product</NavLink>
              </li>
              <li>
                <NavLink className="hover:text-white transition" to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink className="hover:text-white transition" to="/contact">Contact Us</NavLink>
              </li>
              <li>
                <NavLink className="hover:text-white transition" to="/contact#faq">FAQ</NavLink>
              </li>
            </ul>
          </div>


          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Categories
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Men
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Women
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  T-Shirts
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Pants
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Shoes
                </a>
              </li>
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-gray-400">

              <p>
                📍 Phnom Penh, Cambodia
              </p>

              <p>
                📞 +855 12 345 678
              </p>

              <p>
                ✉️ sabayfashion@gmail.com
              </p>

              <p>
                🕒 Mon - Sun: 8:00 AM - 9:00 PM
              </p>

            </div>
          </div>

        </div>
      </div>


      {/* Bottom Footer */}
      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-5
          flex flex-col md:flex-row
          justify-between items-center gap-3">

          <p className="text-gray-500 text-sm">
            © 2026 Sabay-Fashion. All rights reserved.
          </p>

          <div className="flex gap-5 text-sm text-gray-500">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white">
              Terms & Conditions
            </a>
          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer