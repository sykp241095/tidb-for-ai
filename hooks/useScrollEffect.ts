import { useState, useEffect, useCallback } from 'react'

export const useScrollEffect = (threshold = 50) => {
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    setScrolled(currentScrollY > threshold)
  }, [threshold])

  useEffect(() => {
    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return scrolled
}