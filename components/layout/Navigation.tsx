'use client'

import React, { useState, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useScrollEffect } from '@/hooks'
import { navigationItems } from '@/data'
import { Button } from '@/components/ui'
import { NavigationItem } from '@/types'

interface NavigationProps {
  className?: string
}

interface NavLinkProps {
  item: NavigationItem
  onClick?: () => void
  className?: string
}

const NavLink: React.FC<NavLinkProps> = ({ item, onClick, className = '' }) => (
  <a
    href={item.href}
    className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors ${className}`}
    onClick={onClick}
    {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
  >
    {item.label}
  </a>
)

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const scrolled = useScrollEffect(50)

  const handleToggleMenu = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const handleCloseMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  const navClasses = `
    fixed top-0 w-full z-50 transition-all duration-300
    ${scrolled
      ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/20'
      : 'bg-transparent'
    }
    ${className}
  `.trim().replace(/\s+/g, ' ')

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            aria-label="TiDB for AI Home"
          >
            <Image
              src="/tidb-logo.png"
              alt="TiDB Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              TiDB for AI
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={handleToggleMenu}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-gray-200/20 dark:border-gray-800/20">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  onClick={handleCloseMenu}
                  className="block px-3 py-2"
                />
              ))}
              <div className="mt-4">
                <Button variant="primary" size="md" fullWidth>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation