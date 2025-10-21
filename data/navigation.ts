import { Github, Twitter, Linkedin, MessageCircle } from 'lucide-react'
import { NavigationItem, FooterSection, SocialLink } from '@/types'

export const navigationItems: NavigationItem[] = [
  {
    href: '/what-is-tidb',
    label: 'What is TiDB'
  },
  {
    href: '/unified-data-infrastructure',
    label: 'Unified Data Infrastructure'
  },
  {
    href: '/#features',
    label: 'Features'
  },
  {
    href: '/#use-cases',
    label: 'Use Cases'
  },
  {
    href: '/gallery',
    label: 'Gallery'
  },
  {
    href: '/blog',
    label: 'Blog'
  },
  {
    href: '/docs-new/introduction',
    label: 'Docs'
  }
]

export const footerSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { href: '#', label: 'TiDB Cloud' },
      { href: '#', label: 'Vector Search' },
      { href: '#', label: 'Full-Text Search' },
      { href: '#', label: 'MySQL Compatibility' },
      { href: '#', label: 'Pricing' }
    ]
  },
  {
    title: 'Developers',
    links: [
      { href: '/docs-new/introduction', label: 'Documentation' },
      { href: '#', label: 'API Reference' },
      { href: '/gallery', label: 'Examples Gallery' },
      { href: '#', label: 'Tutorials' },
      { href: '#', label: 'Community' }
    ]
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/blog', label: 'Blog' },
      { href: '#', label: 'Careers' },
      { href: '#', label: 'Contact' },
      { href: '#', label: 'Press' }
    ]
  }
]

export const socialLinks: SocialLink[] = [
  {
    href: '#',
    icon: Github,
    label: 'GitHub'
  },
  {
    href: '#',
    icon: Twitter,
    label: 'Twitter'
  },
  {
    href: '#',
    icon: Linkedin,
    label: 'LinkedIn'
  },
  {
    href: '#',
    icon: MessageCircle,
    label: 'Discord'
  }
]

export const legalLinks: NavigationItem[] = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/cookies', label: 'Cookie Policy' }
]