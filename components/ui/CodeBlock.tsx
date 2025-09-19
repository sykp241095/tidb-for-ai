import React, { useEffect } from 'react'
import { Copy, Check } from 'lucide-react'
import { CodeBlockProps } from '@/types'
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/themes/prism-tomorrow.css'

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'python',
  filename,
  onCopy,
  copied = false
}) => {
  const displayFilename = filename || `example.${language}`

  useEffect(() => {
    Prism.highlightAll()
  }, [code])

  const languageObj = Prism.languages[language] || Prism.languages.python
  const highlightedCode = Prism.highlight(code, languageObj, language)

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
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm leading-relaxed font-mono bg-transparent">
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  )
}

export default CodeBlock