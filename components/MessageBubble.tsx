'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import { Message } from '@/lib/types'

const _sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'sup'],
  attributes: {
    ...defaultSchema.attributes,
    sup: ['className'],
  },
}

// Convert inline [n] / [1, 2] citations to <sup> — body text only, not the references list.
// Negative lookahead (?!\() prevents matching Markdown link syntax [n](url).
function injectCitationSups(content: string): string {
  const refHeadingIdx = content.search(/\n## (?:Rujukan|References)\b/i)
  const body = refHeadingIdx === -1 ? content : content.slice(0, refHeadingIdx)
  const refs = refHeadingIdx === -1 ? '' : content.slice(refHeadingIdx)
  const processed = body.replace(
    /\[(\d+(?:,\s*\d+)*)\](?!\()/g,
    (_, n) => `<sup class="ref">[${n}]</sup>`,
  )
  return processed + refs
}

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
                color: '#1A1F36',
                lineHeight: 1.7,
              }
        }
      >
        {isUser ? (
          <p style={{ margin: 0 }}>{message.content}</p>
        ) : (
          <div>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, [rehypeSanitize, _sanitizeSchema]]}
              components={{
                h2: ({ children }) => (
                  <h2
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#0A0F1E',
                      marginTop: '22px',
                      marginBottom: '8px',
                      paddingBottom: '6px',
                      borderBottom: '1px solid rgba(44,111,247,0.12)',
                      letterSpacing: '-0.2px',
                    }}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#0A0F1E',
                      marginTop: '16px',
                      marginBottom: '6px',
                      letterSpacing: '-0.1px',
                    }}
                  >
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p style={{ marginBottom: '10px', lineHeight: 1.75, color: '#2D3748' }}>
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul style={{ paddingLeft: '18px', marginBottom: '10px', listStyleType: 'disc' }}>
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol style={{ paddingLeft: '18px', marginBottom: '10px', listStyleType: 'decimal' }}>
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li style={{ marginBottom: '5px', lineHeight: 1.65, color: '#1A1F36' }}>
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong style={{ fontWeight: 700, color: '#0F1B36' }}>{children}</strong>
                ),
                blockquote: ({ children }) => (
                  <blockquote
                    style={{
                      borderLeft: '3px solid #2C6FF7',
                      paddingLeft: '12px',
                      paddingTop: '6px',
                      paddingBottom: '6px',
                      margin: '12px 0',
                      backgroundColor: 'rgba(44,111,247,0.04)',
                      borderRadius: '0 6px 6px 0',
                      color: '#334466',
                    }}
                  >
                    {children}
                  </blockquote>
                ),
                hr: () => (
                  <hr
                    style={{
                      border: 'none',
                      borderTop: '1px solid rgba(44,111,247,0.12)',
                      margin: '16px 0',
                    }}
                  />
                ),
                table: ({ children }) => (
                  <div style={{ overflowX: 'auto', marginBottom: '12px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th
                    style={{
                      border: '1px solid rgba(44,111,247,0.15)',
                      padding: '6px 10px',
                      backgroundColor: 'rgba(44,111,247,0.05)',
                      fontWeight: 600,
                      textAlign: 'left',
                    }}
                  >
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td
                    style={{
                      border: '1px solid rgba(44,111,247,0.12)',
                      padding: '5px 10px',
                    }}
                  >
                    {children}
                  </td>
                ),
                a: ({ children, href }) => (
                  <a href={href} style={{ color: '#2C6FF7', textDecoration: 'underline' }}>
                    {children}
                  </a>
                ),
              }}
            >
              {injectCitationSups(message.content)}
            </ReactMarkdown>

            {message.sources && message.sources.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginTop: '8px',
                  paddingTop: '8px',
                  borderTop: '1px solid rgba(44,111,247,0.1)',
                }}
              >
                {message.sources.map((source, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      backgroundColor: '#F5F8FF',
                      color: 'rgba(44,80,160,0.45)',
                    }}
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
