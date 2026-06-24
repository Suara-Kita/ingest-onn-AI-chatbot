// components/MessageBubble.tsx
'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Message } from '@/lib/types'

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <span className="text-white text-xs font-bold select-none">O</span>
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
          isUser ? 'rounded-tr-sm' : 'rounded-tl-sm shadow-sm border'
        }`}
        style={
          isUser
            ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }
            : {
                backgroundColor: 'var(--card)',
                color: 'var(--card-foreground)',
                borderColor: 'var(--border)',
              }
        }
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:pl-5 [&_ul]:list-disc [&_ol]:mb-3 [&_ol]:pl-5 [&_ol]:list-decimal [&_h1]:text-base [&_h1]:font-bold [&_h1]:mb-2 [&_h2]:text-sm [&_h2]:font-bold [&_h2]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mb-1 [&_strong]:font-semibold [&_table]:w-full [&_table]:border-collapse [&_table]:text-xs [&_table]:mb-3 [&_td]:border [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:px-2 [&_th]:py-1 [&_th]:font-semibold [&_a]:underline [&_a]:text-blue-600">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
