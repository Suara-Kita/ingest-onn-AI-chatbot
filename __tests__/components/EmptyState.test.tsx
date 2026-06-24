// __tests__/components/EmptyState.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import EmptyState from '@/components/EmptyState'

describe('EmptyState', () => {
  it('renders the Onn AI heading', () => {
    render(<EmptyState onSelect={jest.fn()} />)
    expect(screen.getByRole('heading', { name: /onn ai/i })).toBeInTheDocument()
  })

  it('renders exactly 6 suggestion buttons', () => {
    render(<EmptyState onSelect={jest.fn()} />)
    expect(screen.getAllByRole('button')).toHaveLength(6)
  })

  it('calls onSelect with the correct text when a suggestion is clicked', () => {
    const onSelect = jest.fn()
    render(<EmptyState onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Apakah GDP Johor 2025?'))
    expect(onSelect).toHaveBeenCalledWith('Apakah GDP Johor 2025?')
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('renders bilingual tagline mentioning sekijang', () => {
    render(<EmptyState onSelect={jest.fn()} />)
    expect(screen.getByText(/sekijang/i)).toBeInTheDocument()
  })
})
