import { render, fireEvent, screen, waitFor, act } from '@testing-library/react'
import TodoForm from './todo-form'

describe('todo-form', () => {
  it('renders the form correctly', () => {
    render(<TodoForm formSubmitHandler={jest.fn()} />)
    expect(screen.getByLabelText('Item Name')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('calls submit the form with the correct itemId and itemName', async () => {
    const mockFormSubmitHandler = jest.fn()
    const itemId = 1
    render(<TodoForm itemId={itemId} formSubmitHandler={mockFormSubmitHandler} />)
    const testingInput = 'Test Todo Item'
    const itemNameInput = screen.getByLabelText('Item Name')
    fireEvent.change(itemNameInput, { target: { value: testingInput } })

    fireEvent.submit(screen.getByRole('form'))

    await waitFor(() => {
      expect(mockFormSubmitHandler).toHaveBeenCalledWith(itemId, { itemName: testingInput })
    })
  })

  it('disables the submit button when the form is not invalid', async () => {
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

    const testingInput = 'Test Todo Item'
    // Simulate typing in the input field
    for (let i = 0; i < testingInput.length; i++) {
      fireEvent.change(itemNameInput, {
        target: { value: testingInput.slice(0, i + 1) },
      })
      await act(async () => {
        // Wait for the component to update the submit button state
        await new Promise((resolve) => setTimeout(resolve, 100))
      })
    }

    expect(submitButton).toBeEnabled()
  })
})
