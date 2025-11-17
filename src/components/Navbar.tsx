// src/components/Navbar.tsx
import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import type { JSX } from 'react/jsx-runtime';

interface NavItem {
  name: string;
  href: string;
  path: string;
}

export default function Navbar(): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const location = useLocation()

  const navItems: NavItem[] = [
    { name: 'Home', href: '#home', path: '/' },
    { name: 'Her Story', href: '#story', path: '/story' },
    { name: 'Music', href: '#music', path: '/music' },
    { name: 'Tributes', href: '#tributes', path: '/tributes' },
    { name: 'Gallery', href: '#gallery', path: '/gallery' },
    { name: 'Timeline', href: '#timeline', path: '/timeline' },
    { name: 'Videos', href: '#videos', path: '/videos' },
    { name: 'Support', href: '#support', path: '/' }
  ]

  const scrollToSection = (href: string): void => {
    if (location.pathname === '/') {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsDrawerOpen(false)
  }

  return (
    <>
      <div className="navbar sticky top-0 z-50 bg-base-100/80 backdrop-blur-md shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.path === '/' ? (
                    <a 
                      onClick={() => scrollToSection(item.href)} 
                      className="text-memorial-dark hover:text-memorial-gold cursor-pointer"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link 
                      to={item.path}
                      className="text-memorial-dark hover:text-memorial-gold"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl text-memorial-dark">Betty Bayo</Link>
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.path === '/' ? (
                  <a 
                    onClick={() => scrollToSection(item.href)}
                    className="text-memorial-dark hover:text-memorial-gold transition-colors cursor-pointer"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link 
                    to={item.path}
                    className="text-memorial-dark hover:text-memorial-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <div className="text-memorial-gold text-xl">🕯️</div>
          </button>
        </div>
      </div>
    </>
  )
}