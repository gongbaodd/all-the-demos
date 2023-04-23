import { describe, expect, it } from 'vitest'
import Functional from '../3-Functional.vue'
import { mount } from '@vue/test-utils'

describe('3-Functional', () => {
  it('should render the list with John, Doe, Smith', () => {
    const element = mount(Functional)
    expect(element.html()).toContain('John')
    expect(element.html()).toContain('Doe')
    expect(element.html()).toContain('Smith')

    const Red = getComputedStyle(element.find('li:first-child').element).color
    expect(Red).toBe('red')
  })

  it('should turn red when Smith is clicked, and John turn back origin', async () => {
    const element = mount(Functional)
    await element.find('li:last-child').trigger('click')

    const Red = getComputedStyle(element.find('li:first-child').element).color
    expect(Red).toBe('')

    const Black = getComputedStyle(element.find('li:last-child').element).color
    expect(Black).toBe('red')
  })
})
