import { beforeEach, afterEach, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Modal from '../2-DomPortal.vue'

describe('2-DomPortal', () => {
  it('should render modal with "Hello World"', () => {
    const wrapper = mount(Modal)
    expect(document.querySelector('body>span')?.textContent).toBe('Hello World')
  })
})
