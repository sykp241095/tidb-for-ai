import { useState, useCallback, useEffect } from 'react'

// Enhanced clipboard hook using modern browser APIs with fallbacks
export const useClipboard = (resetTime = 2000) => {
  const [copied, setCopied] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  const copyToClipboard = useCallback(async (text: string) => {
    if (!isClient) {
      return false
    }

    try {
      // Modern clipboard API
      if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else if (typeof document !== 'undefined') {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'absolute'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()

        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)

        if (!successful) {
          throw new Error('Copy command was unsuccessful')
        }
      } else {
        throw new Error('Clipboard not supported')
      }

      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, resetTime)

      return true
    } catch (err) {
      console.error('Failed to copy text:', err)
      return false
    }
  }, [resetTime, isClient])

  const isSupported = isClient &&
    (typeof navigator !== 'undefined' && navigator.clipboard) ||
    (typeof document !== 'undefined' && document.execCommand)

  return {
    copied,
    copyToClipboard,
    isSupported
  }
}