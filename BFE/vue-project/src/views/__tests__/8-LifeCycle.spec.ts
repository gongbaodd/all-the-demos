import LifeCycle from '../8-LifeCycle.vue'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'

describe('8-LifeCycle', () => {
  it('should render "Child Component: 0" and a button with "Toggle Child Component"', () => {
    render(LifeCycle)
    screen.getByText('Child Component: 0')
    screen.getByText('Toggle Child Component')
  })

  it('should render "Child Component: 1" after 1s', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    screen.getByText('Child Component: 1')
  })

  it('should remove child component after click "Toggle Child Component"', async () => {
    await screen.getByText('Toggle Child Component').click()
    expect(screen.queryByText('Child Component: 1')).toBeNull()
  })

  it('should show child component after click "Toggle Child Component" again', async () => {
    await screen.getByText('Toggle Child Component').click()
    screen.getByText('Child Component: 1')
  })

  it('should render "Child Component: 2" after 1s', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    screen.getByText('Child Component: 2')
  })
})
