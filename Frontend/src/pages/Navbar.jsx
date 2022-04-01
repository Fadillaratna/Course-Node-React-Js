import { LogoutIcon } from '@heroicons/react/outline'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navbar extends Component {
 out = () => {
  if (window.confirm("Are you sure to logout?")) {
   window.location = '/signin'
   localStorage.clear()
  }
 }
  

  render() {
    return (
        <div>
        <nav class="bg-gray-50 drop-shadow-md md:drop-shadow-xl">
          <div class="max-w-7xl mx-5 px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
              <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 text-decoration-line: none hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                  <span class="sr-only">Open main menu</span>
  
                  <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
  
                  <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start mr-10">
                <div class="flex-shrink-0 flex items-center mr-10">
                  <img class="hidden lg:block h-10 w-auto" src="/assets/techlog.png" alt="Workflow" />
                  <img class="hidden lg:block h-5 ml-3 w-auto mr-10" src="/assets/TECHCO.png" alt="Workflow" />
                </div>
                <div class="hidden sm:block sm:ml-10 mx-10">
                  <div class="menu flex space-x-4 ml-10">
                    <NavLink to="/" className="no-underline ml-10 text-gray-800 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium " aria-current="page">Dashboard</NavLink>
                    <NavLink to="/category" className="no-underline text-gray-800 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium " aria-current="page">Category</NavLink>
                    <NavLink to="/user" className="no-underline text-gray-800 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium " aria-current="page">User</NavLink>
                    <NavLink to="/signup" className="no-underline text-gray-800 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium " aria-current="page">Register</NavLink>
                    {/* <NavLink to="/signin" className="no-underline text-gray-800 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium " aria-current="page">Login</NavLink> */}
                    <NavLink to="/profile" className="no-underline text-gray-800 hover:text-blue-900 px-3 py-0 px-1 rounded-md text-2xl font-medium " aria-current="page" id="profile"><i className="fa fa-user me-1 "></i></NavLink>
                    <button onClick={() => this.out()} className="no-underline text-gray-800 px-1 py-0 hover:text-blue-900 rounded-md text-2xl font-medium" aria-current="page" > <i className="fa fa-sign-out me-1 "></i></button>
                  </div>
  
                </div>
  
              </div>
  
            </div>
          </div>
        </nav>
        <div>
        </div>
      </div>
    )
  }
}
