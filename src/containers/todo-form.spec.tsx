import { render, fireEvent, screen, waitFor, act } from '@testing-library/react'
import TodoForm from './todo-form'

describe('todo-form', () => {
  it('renders the form correctly', () => {
    render(<TodoForm formSubmitHandler={jest.fn()} />)
    expect(screen.getByLabelText('Item Name')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('calls the formSubmitHandler with the correct values', async () => {
    const mockFormSubmitHandler = jest.fn()
    render(<TodoForm formSubmitHandler={mockFormSubmitHandler} />)

    const itemNameInput = screen.getByLabelText('Item Name')
    fireEvent.change(itemNameInput, { target: { value: 'Test Todo Item' } })

    fireEvent.submit(screen.getByRole('form'))

    await waitFor(() => {
      expect(mockFormSubmitHandler).toHaveBeenCalledWith(-1, { itemName: 'Test Todo Item' })
    })
  })

  it('disables the submit button when the form is invalid', async () => {
    render(<TodoForm formSubmitHandler={jest.fn()} />)

    const submitButton = screen.getByRole('button', { name: 'Submit' })
    expect(submitButton).toBeDisabled()

    const itemNameInput = screen.getByLabelText('Item Name')
    fireEvent.change(itemNameInput, { target: { value: 'a'.repeat(51) } })

    await waitFor(() => {
      expect(submitButton).toBeDisabled()
    })
  })

  it('enables the submit button when the form is valid', async () => {
    render(<TodoForm formSubmitHandler={jest.fn()} />)

    const submitButton = screen.getByRole('button', { name: 'Submit' })
    expect(submitButton).toBeDisabled()

    const itemNameInput = screen.getByLabelText('Item Name')

    // Simulate typing in the input field
    for (let i = 0; i < 'Test Todo Item'.length; i++) {
      fireEvent.change(itemNameInput, {
        target: { value: 'Test Todo Item'.slice(0, i + 1) },
      })
      await act(async () => {
        // Wait for the component to update the submit button state
        await new Promise((resolve) => setTimeout(resolve, 100))
      })
    }

    expect(submitButton).toBeEnabled()
  })
})
