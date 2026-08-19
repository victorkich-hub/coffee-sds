import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import {
  ShoppingCart,
  Menu,
  X,
  UserCircle,
  LogOut,
  Sprout,
  Package,
  LayoutDashboard,
} from 'lucide-react'

import useAuth from '../hooks/useAuth'
import useCart from '../hooks/useCart'

const navigationLinks = [
  {
    to: '/',
    label: 'Home',
  },
  {
    to: '/products',
    label: 'Seedlings',
  },
  {
    to: '/about',
    label: 'About',
  },
  {
    to: '/contact',
    label: 'Contact',
  },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const { totalItems } = useCart()

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const navLinkClasses = ({ isActive }) => {
    return `
      rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200
      ${
        isActive
          ? 'bg-emerald-100 text-emerald-800'
          : 'text-gray-700 hover:bg-gray-100 hover:text-emerald-700'
      }
    `
  }

  const handleLogout = () => {
    logout()
    closeMobileMenu()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between">

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-sm">
              <Sprout size={23} />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-base font-extrabold leading-tight text-emerald-900">
                Coffee Seedlings
              </h1>

              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                Grow Better Coffee
              </p>
            </div>
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <nav className="hidden items-center gap-1 md:flex">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={navLinkClasses}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center gap-2">

            {/* Cart */}
            <Link
              to="/cart"
              className="relative rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 hover:text-emerald-700"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={21} />

              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* ================= AUTHENTICATED USER ================= */}
            {isAuthenticated ? (
              <>

                {/* Profile */}
                <Link
                  to="/profile"
                  className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 sm:flex"
                >
                  <UserCircle size={20} />

                  <span className="max-w-[120px] truncate">
                    {user?.name}
                  </span>
                </Link>

                {/* Orders */}
                <Link
                  to="/orders"
                  className="hidden rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 hover:text-emerald-700 sm:block"
                  title="My orders"
                >
                  <Package size={20} />
                </Link>

                {/* Admin */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="hidden rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 hover:text-emerald-700 sm:block"
                    title="Admin dashboard"
                  >
                    <LayoutDashboard size={20} />
                  </Link>
                )}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="hidden rounded-lg p-2 text-gray-700 transition hover:bg-red-50 hover:text-red-600 sm:block"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>

            ) : (

              /* ================= GUEST ================= */
              <Link
                to="/login"
                className="hidden rounded-xl bg-emerald-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 sm:block"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X size={23} />
              ) : (
                <Menu size={23} />
              )}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">
            <nav className="flex flex-col gap-1">

              {navigationLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={navLinkClasses}
                >
                  {link.label}
                </NavLink>
              ))}

              <NavLink
                to="/cart"
                onClick={closeMobileMenu}
                className={navLinkClasses}
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart size={18} />
                  Cart
                  {totalItems > 0 && (
                    <span className="rounded-full bg-orange-600 px-2 py-0.5 text-xs text-white">
                      {totalItems}
                    </span>
                  )}
                </span>
              </NavLink>

              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/orders"
                    onClick={closeMobileMenu}
                    className={navLinkClasses}
                  >
                    <span className="flex items-center gap-2">
                      <Package size={18} />
                      My Orders
                    </span>
                  </NavLink>

                  <NavLink
                    to="/profile"
                    onClick={closeMobileMenu}
                    className={navLinkClasses}
                  >
                    <span className="flex items-center gap-2">
                      <UserCircle size={18} />
                      Profile
                    </span>
                  </NavLink>

                  {isAdmin && (
                    <NavLink
                      to="/admin"
                      onClick={closeMobileMenu}
                      className={navLinkClasses}
                    >
                      <span className="flex items-center gap-2">
                        <LayoutDashboard size={18} />
                        Admin Dashboard
                      </span>
                    </NavLink>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="btn-secondary"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="btn-primary"
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}