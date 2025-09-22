'use client'

import React from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github-dark.css'

interface MarkdownRendererProps {
  content: string
  className?: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = ''
}) => {
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none text-gray-900 dark:text-gray-100 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Custom heading renderer with anchor links
          h1: ({ children, ...props }) => (
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-12 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-4" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-2" {...props}>
              {children}
            </h4>
          ),
          // Custom paragraph styling
          p: ({ children, ...props }) => {
            // Check if this paragraph has align attribute (for center-aligned images)
            const hasAlign = (props as { align?: string }).align
            if (hasAlign) {
              return (
                <div className={`mb-4 leading-relaxed text-gray-900 dark:text-gray-100 text-${hasAlign}`}>
                  {children}
                </div>
              )
            }
            return (
              <p className="mb-4 leading-relaxed text-gray-900 dark:text-gray-100" {...props}>
                {children}
              </p>
            )
          },
          // Custom code block styling
          pre: ({ children, ...props }) => (
            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded border shadow-sm my-6" {...props}>
              {children}
            </pre>
          ),
          // Inline code styling
          code: ({ children, className, ...props }) => {
            const isInline = !className?.includes('language-')

            if (isInline) {
              return (
                <code className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              )
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          // Custom blockquote styling
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 py-2 rounded-r" {...props}>
              {children}
            </blockquote>
          ),
          // Custom table styling
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-gray-200 dark:border-gray-700" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700" {...props}>
              {children}
            </td>
          ),
          // Custom list styling
          ul: ({ children, ...props }) => (
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-900 dark:text-gray-100" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-900 dark:text-gray-100" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="mb-1" {...props}>
              {children}
            </li>
          ),
          // Custom link styling
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),
          // Custom image styling
          img: ({ src, alt }) => {
            const isExternalUrl = src?.startsWith('http://') || src?.startsWith('https://')

            if (isExternalUrl) {
              return (
                <div className="my-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src || ''}
                    alt={alt || ''}
                    className="rounded-lg border border-gray-200 dark:border-gray-700 max-w-full h-auto"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              )
            }

            return (
              <div className="my-6">
                <Image
                  src={src || ''}
                  alt={alt || ''}
                  width={800}
                  height={400}
                  className="rounded-lg border border-gray-200 dark:border-gray-700"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            )
          },
          // Custom horizontal rule
          hr: ({ ...props }) => (
            <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer