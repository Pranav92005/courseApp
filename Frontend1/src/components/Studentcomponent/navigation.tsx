

import { Link, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import { Home, BookOpen, GraduationCap, User } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'All Courses', href: '/courses', icon: BookOpen },
  { name: 'My Courses', href: '/my-courses', icon: GraduationCap },
  { name: 'Profile', href: '/profile', icon: User },
]

export default function Navigation() {


  const location = useLocation();
  const pathname = location.pathname;
  const { logout } = useAuth0();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">Academix</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    pathname === item.href
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <item.icon className="h-4 w-4 mr-1" />
                  {item.name}
                </Link>
              ))}
              {/* <button className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 font-bold' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <div className="flex  pb-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                pathname === item.href
                  ? 'text-indigo-600'
                  : 'text-gray-600 hover:text-gray-800'
              } flex flex-col items-center text-xs`}
            >
              <item.icon className="h-6 w-6" />
              <span>{item.name}</span>
            </Link>
          ))}
          {/* <button className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 font-bold' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button> */}
        </div>
      </div>
    </nav>
  )
}

