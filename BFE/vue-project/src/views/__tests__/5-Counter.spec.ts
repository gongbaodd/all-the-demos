import { describe, it, expect } from 'vitest'
import { screen, fireEvent, render } from '@testing-library/vue'
import Counter from '../5-Counter.vue'

describe('5-Counter', () => {
  it('should render a + button, a 0, a - button and a reset button', () => {
    render(Counter)
    screen.getByText('+')
    screen.getByText('0')
    screen.getByText('-')
    screen.getByText('reset')
  })

  it('should increment the counter when clicking on the + button, value should stop at 10', async () => {
    const button = screen.getByText('+')
    const counter = screen.getByText('0')

    for (let i = 0; i < 20; i++) {
      await fireEvent.click(button)
    }

    expect(counter.textContent).toBe('10')
  })

  it('should decrement the counter when clicking on the - button, value should stop at 0', async () => {
    const button = screen.getByText('-')
    const counter = screen.getByText('10')

    for (let i = 0; i < 11; i++) {
      await fireEvent.click(button)
    }

    expect(counter.textContent).toBe('0')
  })

  it('should reset the counter after clicking on the reset button', async () => {
    const resetButton = screen.getByText('reset')
    const plusButton = screen.getByText('+')

    for (let i = 0; i < 5; i++) {
      await fireEvent.click(plusButton)
    }

    const counter = screen.getByText('5')

    await fireEvent.click(resetButton)

    expect(counter.textContent).toBe('0')
  })
})
