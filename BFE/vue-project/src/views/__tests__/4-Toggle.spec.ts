import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/vue'
import Toggle from '../4-Toggle.vue'

describe('4-Toggle', () => {
  const wrapper = render(Toggle)

  it('should render State OFF', () => {
    wrapper.getByText('State: OFF')
    screen.getByText('Toggle state')
  })

  it('should render State ON when "Toggle state" was clicked', async () => {
    const p = screen.getByText('Toggle state')
    await fireEvent.click(p)
    wrapper.getByText('State: ON')
  })
})
