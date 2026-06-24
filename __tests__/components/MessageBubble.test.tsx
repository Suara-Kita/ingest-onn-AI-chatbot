// __tests__/components/MessageBubble.test.tsx
import { render, screen } from '@testing-library/react'
import MessageBubble from '@/components/MessageBubble'
import { Message } from '@/lib/types'

const userMsg: Message = {
  id: '1',
  role: 'user',
  content: 'Hello Onn AI',
  timestamp: new Date(),
}
const aiMsg: Message = {
  id: '2',
  role: 'assistant',
  content: '**Bold answer** with a [link](https://example.com)',
  timestamp: new Date(),
}

describe('MessageBubble', () => {
  it('renders user message text', () => {
    render(<MessageBubble message={userMsg} />)
    expect(screen.getByText('Hello Onn AI')).toBeInTheDocument()
  })

  it('renders assistant markdown as HTML — bold', () => {
    render(<MessageBubble message={aiMsg} />)
    expect(screen.getByRole('strong')).toBeInTheDocument()
    expect(screen.getByRole('strong')).toHaveTextContent('Bold answer')
  })

  it('renders assistant markdown as HTML — link', () => {
    render(<MessageBubble message={aiMsg} />)
    expect(screen.getByRole('link', { name: 'link' })).toBeInTheDocument()
  })

  it('renders citation chips when sources are present', () => {
    const msgWithSources = {
      ...aiMsg,
      sources: ['Laporan Johor 2025.md', 'Analisis Ekonomi.md'],
    }
    render(<MessageBubble message={msgWithSources} />)
    expect(screen.getByText('[1] Laporan Johor 2025.md')).toBeInTheDocument()
    expect(screen.getByText('[2] Analisis Ekonomi.md')).toBeInTheDocument()
  })

  it('does not render citation chips when sources are absent', () => {
    render(<MessageBubble message={aiMsg} />)
    expect(screen.queryByText(/^\[1\]/)).not.toBeInTheDocument()
  })
})
