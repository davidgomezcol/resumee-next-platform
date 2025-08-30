'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { BurgerIcon, CloseIcon } from '../../utils/icons'
import Logo from './Logo'

const Navbar = () => {
  const { t } = useLanguage()

  const navItems = [
    {
      label: t.nav.home,
      href: '/',
      id: '',
    },
    {
      label: t.nav.experience,
      href: '/#experience',
      id: 'experience',
    },
    {
      label: t.nav.services,
      href: '/#services',
      id: 'services',
    },
    {
      label: t.nav.contact,
      href: '/#contact',
      id: 'contact',
    },
  ]
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)

      // Get all sections
      const sections = document.querySelectorAll('section[id], h2[id], h3[id]')
      let currentSection = ''

      sections.forEach((section) => {
        const sectionElement = section as HTMLElement
        const sectionTop = sectionElement.offsetTop - 100 // Offset for header height
        const sectionHeight = sectionElement.offsetHeight
        const sectionId = section.getAttribute('id')

        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
          currentSection = sectionId || ''
        }
      })

      // If we're at the top, set home as active
      if (scrollTop < 100) {
        currentSection = ''
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsVisible(!isVisible)
  }

  return (
    <nav
      className={`bg-primary/95 border-border sticky top-0 z-50 overflow-hidden border-b backdrop-blur-sm transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-primary/98 h-14 shadow-lg' : 'h-16 shadow-sm'
      }`}
      style={{ position: 'sticky', top: 0 }}>
      <div className="mx-auto flex h-full w-dvw max-w-[1200px] items-center justify-between px-4 py-1">
        {isVisible ? (
          <div className="text-primary-content md:hidden">_menu</div>
        ) : (
          <Link href="/">
            <div
              className={`animate-fade-up text-primary-content relative flex items-center gap-3 transition-all duration-300 md:static ${
                isScrolled ? 'scale-95' : 'scale-100'
              }`}>
              <Logo />
              <span className="text-primary-content">david_gomez</span>
            </div>
          </Link>
        )}

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isVisible ? (
              <CloseIcon className="text-primary-content" />
            ) : (
              <BurgerIcon className="text-primary-content" />
            )}
          </button>
        </div>

        <ul
          className={`${isVisible ? 'flex' : 'hidden'} animate-fade-in bg-primary absolute top-16 left-0 z-10 h-dvh w-dvw flex-col md:static md:top-0 md:flex md:h-full md:w-[72%] md:flex-row lg:w-[70%]`}>
          {navItems.map(({ label, href, id }) => {
            const isActive = activeSection === id || (id === '' && activeSection === '')
            return (
              <li
                key={href}
                onClick={() => setIsVisible(false)}
                className="border-border flex items-center border-b px-4 text-2xl md:border-y-0 md:border-e md:text-base md:first:border-s md:last:ml-auto md:last:border-none md:last:px-0 lg:px-8">
                <Link
                  href={href}
                  className={`text-primary-content hover:text-neutral group relative w-full py-7 transition-all duration-300 md:py-0 ${
                    isActive ? 'text-neutral cursor-text' : ''
                  }`}>
                  <span className="relative z-10 flex items-center gap-2">
                    {isActive && (
                      <span className="bg-accent h-2 w-2 animate-pulse rounded-full"></span>
                    )}
                    {label}
                  </span>
                  {/* Subtle hover underline */}
                  <span className="bg-accent/50 absolute bottom-0 left-0 h-0.5 w-0 origin-left transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
