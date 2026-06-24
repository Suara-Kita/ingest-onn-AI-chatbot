// __tests__/components/InputBar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InputBar from '@/components/InputBar'

describe('InputBar', () => {
  it('calls onSend with trimmed text when send button clicked', async () => {
    const onSend = jest.fn()
    render(<InputBar onSend={onSend} isLoading={false} />)
    await userEvent.type(screen.getByRole('textbox'), '  Hello  ')
    fireEvent.click(screen.getByRole('button', { name: /send/i }))
    expect(onSend).toHaveBeenCalledWith('Hello')
  })

  it('calls onSend when Enter is pressed (not Shift+Enter)', async () => {
    const onSend = jest.fn()
    render(<InputBar onSend={onSend} isLoading={false} />)
    await userEvent.type(screen.getByRole('textbox'), 'Hello{Enter}')
    expect(onSend).toHaveBeenCalledWith('Hello')
  })

  it('does not call onSend on Shift+Enter', async () => {
    const onSend = jest.fn()
    render(<InputBar onSend={onSend} isLoading={false} />)
    await userEvent.type(screen.getByRole('textbox'), 'Hello{Shift>}{Enter}{/Shift}')
    expect(onSend).not.toHaveBeenCalled()
  })

  it('does not call onSend when input is empty', () => {
    const onSend = jest.fn()
    render(<InputBar onSend={onSend} isLoading={false} />)
    fireEvent.click(screen.getByRole('button', { name: /send/i }))
    expect(onSend).not.toHaveBeenCalled()
  })

  it('disables textarea and button while isLoading', () => {
    render(<InputBar onSend={jest.fn()} isLoading={true} />)
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('button', { name: /send/i })).toBeDisabled()
  })

  it('clears input after send', async () => {
    const onSend = jest.fn()
    render(<InputBar onSend={onSend} isLoading={false} />)
    const textarea = screen.getByRole('textbox')
    await userEvent.type(textarea, 'Hello')
    fireEvent.click(screen.getByRole('button', { name: /send/i }))
    expect(textarea).toHaveValue('')
  })
})
