import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Modal from '../2-DomPortal.vue'
import { h } from 'vue'
import type { FunctionalComponent } from 'vue'

const Wraper: FunctionalComponent = () => {
  return h(Modal)
}

describe('2-DomPortal', () => {
  it('should render modal with "Hello World"', () => {
    const wrapper = mount(Wraper)
    expect(wrapper.find('span').exists()).toBe(false)
    expect(document.querySelector('body>span')?.textContent).toBe('Hello World')
  })
})
