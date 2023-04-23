import { describe, it, expect } from 'vitest'
import { fireEvent, screen, render } from '@testing-library/vue'
import Mouse from '../7-Mouse.vue'

describe('7-Mouse', () => {
  it('should render 0, 0 at first', () => {
    render(Mouse)
    screen.getByText('Mouse position is at: 0, 0')
  })

  it('shoud render 100, 100 after mousemove', async () => {
    await fireEvent.mouseMove(window, {
      clientX: 100,
      clientY: 100
    })
    screen.getByText('Mouse position is at: 100, 100')
  })
})
