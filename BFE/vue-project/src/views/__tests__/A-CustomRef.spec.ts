import CustomRef from '@/views/A-CustomRef.vue'
import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'

describe('A-CustomRef.vue', () => {
  it('should render an input with "hello" as value, and a "hello" span', async () => {
    render(CustomRef)
    screen.getByText('text: hello')
    const input = (await screen.findByLabelText('text: hello')) satisfies HTMLInputElement
    expect(input.value).toBe('hello')
  })

  it('should update the input value when input some charaters, but the span will not change in 200 ms', async () => {
    const input = (await screen.findByLabelText('text: hello')) satisfies HTMLInputElement
    expect(input.value).toBe('hello')
    await fireEvent.update(input, 'world')
    expect(input.value).toBe('world')
    await screen.findByText('text: hello')
    await new Promise((resolve) => setTimeout(resolve, 200))
    await screen.findByText('text: world')
  })
})
