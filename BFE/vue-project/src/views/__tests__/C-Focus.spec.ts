import { describe, it, expect } from 'vitest'
import { screen, fireEvent, render } from '@testing-library/vue'
import Focus from '../C-Focus.vue'

describe('C-Focus', () => {
  it('should render a text input and not be focused on mounted', async () => {
    render(Focus)
    expect((screen.queryByRole('textbox') as HTMLInputElement)?.value).toBe('')
    expect(document.activeElement).not.toBe(screen.getByRole('textbox'))
  })

  it('should focus the input in 2s', async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    expect(document.activeElement).toBe(screen.getByRole('textbox'))
  })
})
