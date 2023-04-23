import { describe, it, expect } from 'vitest'
import { screen, fireEvent, render } from '@testing-library/vue'
import Capitalize from '../B-Capitalize.vue'

describe('B-Capitalize', () => {
  it('should render a text input', async () => {
    render(Capitalize)
    expect((screen.queryByRole('textbox') as HTMLInputElement)?.value).toBe('')
  })

  it('should capitalize the input value', async () => {
    const input = screen.getByRole('textbox') as HTMLInputElement
    await fireEvent.update(input, 'hello world')
    expect(input.value).toBe('Hello world')
  })
})
