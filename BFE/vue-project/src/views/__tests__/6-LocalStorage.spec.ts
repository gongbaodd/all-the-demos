import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent, render } from '@testing-library/vue'
import LocalStorage from '../6-LocalStorage.vue'

describe('6-LocalStorage', () => {
  it('should render a 0 and a button with setValue', () => {
    render(LocalStorage)
    expect(screen.getByText('0')).toBeTruthy()
    expect(screen.getByText('setValue')).toBeTruthy()
  })

  it('should call localStorage.setItem when clicking the button', async () => {
    const spy = vi.spyOn(window.localStorage.__proto__, 'setItem')
    await fireEvent.click(screen.getByText('setValue'))
    expect(spy).toHaveBeenCalled()
  })
})
