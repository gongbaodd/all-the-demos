import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Count from '../1-Counter.vue'

describe('1-Counter', () => {
  it('has a button with #id', () => {
    const wrapper = mount(Count)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Count is: 0')
  })

  it('click the button and count should be 1', async () => {
    const wrapper = mount(Count)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('button').text()).toBe('Count is: 1')
  })
})
