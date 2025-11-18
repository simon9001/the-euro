// src/components/Navbar.tsx
import { Link, useLocation } from 'react-router'
import type { JSX } from 'react/jsx-runtime';

interface NavItem {
  name: string;
  href: string;
  path: string;
}

export default function Navbar(): JSX.Element {
  const location = useLocation()

  const navItems: NavItem[] = [
    { name: 'Home', href: '#home', path: '/' },
    { name: 'Her Story', href: '#story', path: '/story' },
    { name: 'Music', href: '#music', path: '/music' },
    { name: 'Tributes', href: '#tributes', path: '/tributes' },
    { name: 'Gallery', href: '#gallery', path: '/gallery' },
    { name: 'Timeline', href: '#timeline', path: '/timeline' },
    { name: 'Visit Memorial', href: '#memorial-map', path: '/' }, // Changed from '/memorial' to '/'
    { name: 'Videos', href: '#videos', path: '/videos' },
    { name: 'Support', href: '#support', path: '/' }
  ]

  const scrollToSection = (href: string): void => {
    if (location.pathname === '/') {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // If we're not on home page, navigate to home first then scroll
      window.location.href = `/${href}`
    }
  }

  const handleNavClick = (item: NavItem): void => {
    if (item.path === '/') {
      scrollToSection(item.href)
    }
    // For other pages, the Link component will handle navigation
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
                      onClick={() => handleNavClick(item)} 
                      className="text-memorial-dark hover:text-memorial-gold cursor-pointer flex items-center gap-2"
                    >
                      {item.name === 'Visit Memorial' && <span className="text-sm">📍</span>}
                      {item.name}
                    </a>
                  ) : (
                    <Link 
                      to={item.path}
                      className="text-memorial-dark hover:text-memorial-gold flex items-center gap-2"
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
                    onClick={() => handleNavClick(item)}
                    className="text-memorial-dark hover:text-memorial-gold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    {item.name === 'Visit Memorial' && <span className="text-sm">📍</span>}
                    {item.name}
                  </a>
                ) : (
                  <Link 
                    to={item.path}
                    className="text-memorial-dark hover:text-memorial-gold transition-colors flex items-center gap-1"
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