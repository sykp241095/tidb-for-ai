import { Github, Twitter, Linkedin, MessageCircle } from 'lucide-react'
import { NavigationItem, FooterSection, SocialLink } from '@/types'

export const navigationItems: NavigationItem[] = [
  {
    href: '/what-is-tidb',
    label: 'What is TiDB'
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
    href: 'https://pingcap.github.io/ai/',
    label: 'Docs',
    external: true
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
      { href: '#', label: 'Documentation' },
      { href: '#', label: 'API Reference' },
      { href: '#', label: 'Examples Gallery' },
      { href: '#', label: 'Tutorials' },
      { href: '#', label: 'Community' }
    ]
  },
  {
    title: 'Company',
    links: [
      { href: '#', label: 'About' },
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
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Cookie Policy' }
]