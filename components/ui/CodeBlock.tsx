import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { CodeBlockProps } from '@/types'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python'

SyntaxHighlighter.registerLanguage('python', python)

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'python',
  filename,
  onCopy,
  copied = false
}) => {
  const displayFilename = filename || `example.${language}`
  const [selectedLine, setSelectedLine] = useState<number | null>(null)

  return (
    <div className="relative bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden border border-gray-700 dark:border-gray-600 group">
      {/* VSCode-style Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-850 border-b border-gray-700 dark:border-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          <span className="text-xs text-gray-400 font-mono">{displayFilename}</span>
        </div>
        {/* Copy Button in Header */}
        {onCopy && (
          <button
            onClick={onCopy}
            className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-gray-700/90 hover:bg-gray-600/90 text-gray-300 rounded-md text-xs font-medium transition-all duration-200"
          >
            {copied ? (
              <>
                <Check size={12} className="text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: '2.5rem',
            paddingRight: '1rem',
            textAlign: 'right',
            color: '#6b7280',
            backgroundColor: 'transparent',
            userSelect: 'none'
          }}
          customStyle={{
            margin: 0,
            padding: '1rem',
            backgroundColor: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}
          codeTagProps={{
            style: {
              backgroundColor: 'transparent'
            }
          }}
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: selectedLine === lineNumber ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            },
            onClick: () => setSelectedLine(selectedLine === lineNumber ? null : lineNumber)
          })}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default CodeBlock