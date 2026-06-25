// components/MessageBubble.tsx
'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Message } from '@/lib/types'
import AIAvatar from './AIAvatar'

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        gap: '10px',
        alignItems: 'flex-start',
      }}
    >
      {!isUser && <AIAvatar style={{ marginTop: '2px' }} />}

      <div
        className="text-sm"
        style={
          isUser
            ? {
                maxWidth: '68%',
                backgroundColor: '#2C6FF7',
                color: '#ffffff',
                padding: '11px 16px',
                borderRadius: '16px 16px 4px 16px',
                lineHeight: 1.65,
                boxShadow: '0 2px 8px rgba(44,111,247,0.2)',
              }
            : {
                flex: 1,
                backgroundColor: '#ffffff',
                color: '#1A1F36',
                padding: '14px 18px',
                borderRadius: '16px 16px 16px 4px',
                lineHeight: 1.75,
                boxShadow: '0 2px 12px rgba(44,111,247,0.08)',
                border: '1px solid rgba(44,111,247,0.08)',
              }
        }
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:mb-3 [&_ul]:pl-5 [&_ul]:list-disc [&_ol]:mb-3 [&_ol]:pl-5 [&_ol]:list-decimal [&_li]:mb-2 [&_li]:leading-relaxed [&_h1]:text-base [&_h1]:font-bold [&_h1]:mb-2 [&_h1]:mt-4 [&_h2]:text-sm [&_h2]:font-bold [&_h2]:mb-2 [&_h2]:mt-4 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mb-1 [&_h3]:mt-3 [&_strong]:font-semibold [&_table]:w-full [&_table]:border-collapse [&_table]:text-xs [&_table]:mb-3 [&_td]:border [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:px-2 [&_th]:py-1 [&_th]:font-semibold [&_a]:underline [&_a]:text-blue-600">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
            {message.sources && message.sources.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                {message.sources.map((source, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#F5F8FF', color: 'rgba(44,80,160,0.45)' }}
                  >
                    [{i + 1}] {source}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
