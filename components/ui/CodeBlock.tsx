import React from 'react'
import { Copy, Check } from 'lucide-react'
import { CodeBlockProps } from '@/types'

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'python',
  filename,
  onCopy,
  copied = false
}) => {
  const displayFilename = filename || `example.${language}`

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-300 text-sm font-medium">
            {displayFilename}
          </span>
        </div>
        {onCopy && (
          <button
            onClick={onCopy}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm"
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Code Content */}
      <div className="p-6 overflow-x-auto">
        <pre className="text-sm text-gray-100 leading-relaxed">
          <code>
            {code.split('\n').map((line, index) => (
              <div key={index} className="text-gray-100">
                {line}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}

export default CodeBlock