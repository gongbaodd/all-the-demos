import Ref from '../9-Ref.vue'
import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/vue'

describe('9-Ref', () => {
  it('should render a "-" a "0" and a "+"', () => {
    const { getByText } = render(Ref)
    expect(getByText('-')).toBeTruthy()
    expect(getByText('0')).toBeTruthy()
    expect(getByText('+')).toBeTruthy()
  })

  it('should increment and decrement the counter', async () => {
    await screen.getByText('+').click()
    screen.getByText('1')
    await screen.getByText('-').click()
    screen.getByText('0')
  })
})
