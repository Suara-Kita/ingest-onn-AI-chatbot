// __tests__/components/EmptyState.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import EmptyState from '@/components/EmptyState'

describe('EmptyState', () => {
  it('renders the main heading', () => {
    render(<EmptyState onSelect={jest.fn()} />)
    expect(screen.getByText(/apa yang boleh saya bantu/i)).toBeInTheDocument()
  })

  it('renders exactly 6 suggestion cards', () => {
    render(<EmptyState onSelect={jest.fn()} />)
    expect(screen.getAllByRole('button')).toHaveLength(6)
  })

  it('calls onSelect with the correct question when a card is clicked', () => {
    const onSelect = jest.fn()
    render(<EmptyState onSelect={onSelect} />)
    fireEvent.click(screen.getByText('GDP Johor 2025'))
    expect(onSelect).toHaveBeenCalledWith('Apakah GDP Johor 2025?')
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('renders subheading mentioning Sekijang', () => {
    render(<EmptyState onSelect={jest.fn()} />)
    expect(screen.getByText(/sekijang/i)).toBeInTheDocument()
  })
})
