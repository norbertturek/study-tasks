import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Calculator from '../Calculator.vue'

describe('Calculator', () => {
  it('displays initial value of 0', () => {
    const wrapper = mount(Calculator)
    const display = wrapper.find('.display')
    expect(display.text()).toBe('0')
  })

  it('appends digits correctly', async (): Promise<void> => {
    const wrapper = mount(Calculator)
    const buttons = wrapper.findAll('button')
    
    await buttons.find(btn => btn.text() === '1')?.trigger('click')
    await buttons.find(btn => btn.text() === '2')?.trigger('click')
    
    const display = wrapper.find('.display')
    expect(display.text()).toBe('12')
  })

  it('performs addition correctly', async (): Promise<void> => {
    const wrapper = mount(Calculator)
    const buttons = wrapper.findAll('button')
    
    await buttons.find(btn => btn.text() === '2')?.trigger('click')
    await buttons.find(btn => btn.text() === '+')?.trigger('click')
    await buttons.find(btn => btn.text() === '3')?.trigger('click')
    await buttons.find(btn => btn.text() === '=')?.trigger('click')
    
    const display = wrapper.find('.display')
    expect(display.text()).toBe('5')
  })

  it('handles division by zero', async (): Promise<void> => {
    const wrapper = mount(Calculator)
    const buttons = wrapper.findAll('button')
    
    await buttons.find(btn => btn.text() === '1')?.trigger('click')
    await buttons.find(btn => btn.text() === '/')?.trigger('click')
    await buttons.find(btn => btn.text() === '0')?.trigger('click')
    await buttons.find(btn => btn.text() === '=')?.trigger('click')
    
    const display = wrapper.find('.display')
    expect(display.text()).toBe('Error')
  })

  it('clears the display', async (): Promise<void> => {
    const wrapper = mount(Calculator)
    const buttons = wrapper.findAll('button')
    
    await buttons.find(btn => btn.text() === '1')?.trigger('click')
    await buttons.find(btn => btn.text() === '2')?.trigger('click')
    await buttons.find(btn => btn.text() === 'C')?.trigger('click')
    
    const display = wrapper.find('.display')
    expect(display.text()).toBe('0')
  })

  describe('Addition operations', () => {
    it('adds two positive numbers correctly', async (): Promise<void> => {
      const wrapper = mount(Calculator)
      const buttons = wrapper.findAll('button')
      
      await buttons.find(btn => btn.text() === '2')?.trigger('click')
      await buttons.find(btn => btn.text() === '5')?.trigger('click')
      await buttons.find(btn => btn.text() === '+')?.trigger('click')
      await buttons.find(btn => btn.text() === '1')?.trigger('click')
      await buttons.find(btn => btn.text() === '5')?.trigger('click')
      await buttons.find(btn => btn.text() === '=')?.trigger('click')
      
      const display = wrapper.find('.display')
      expect(display.text()).toBe('40')
    })

    it('handles multiple additions correctly', async (): Promise<void> => {
      const wrapper = mount(Calculator)
      const buttons = wrapper.findAll('button')
      
      await buttons.find(btn => btn.text() === '5')?.trigger('click')
      await buttons.find(btn => btn.text() === '+')?.trigger('click')
      await buttons.find(btn => btn.text() === '3')?.trigger('click')
      await buttons.find(btn => btn.text() === '=')?.trigger('click')
      await buttons.find(btn => btn.text() === '+')?.trigger('click')
      await buttons.find(btn => btn.text() === '2')?.trigger('click')
      await buttons.find(btn => btn.text() === '=')?.trigger('click')
      
      const display = wrapper.find('.display')
      expect(display.text()).toBe('10')
    })
  })

  describe('Subtraction operations', () => {
    it('subtracts two positive numbers correctly', async (): Promise<void> => {
      const wrapper = mount(Calculator)
      const buttons = wrapper.findAll('button')
      
      await buttons.find(btn => btn.text() === '5')?.trigger('click')
      await buttons.find(btn => btn.text() === '0')?.trigger('click')
      await buttons.find(btn => btn.text() === '-')?.trigger('click')
      await buttons.find(btn => btn.text() === '2')?.trigger('click')
      await buttons.find(btn => btn.text() === '5')?.trigger('click')
      await buttons.find(btn => btn.text() === '=')?.trigger('click')
      
      const display = wrapper.find('.display')
      expect(display.text()).toBe('25')
    })

    it('handles negative results correctly', async (): Promise<void> => {
      const wrapper = mount(Calculator)
      const buttons = wrapper.findAll('button')
      
      await buttons.find(btn => btn.text() === '2')?.trigger('click')
      await buttons.find(btn => btn.text() === '5')?.trigger('click')
      await buttons.find(btn => btn.text() === '-')?.trigger('click')
      await buttons.find(btn => btn.text() === '5')?.trigger('click')
      await buttons.find(btn => btn.text() === '0')?.trigger('click')
      await buttons.find(btn => btn.text() === '=')?.trigger('click')
      
      const display = wrapper.find('.display')
      expect(display.text()).toBe('-25')
    })

    it('handles multiple subtractions correctly', async (): Promise<void> => {
      const wrapper = mount(Calculator)
      const buttons = wrapper.findAll('button')
      
      await buttons.find(btn => btn.text() === '1')?.trigger('click')
      await buttons.find(btn => btn.text() === '0')?.trigger('click')
      await buttons.find(btn => btn.text() === '0')?.trigger('click')
      await buttons.find(btn => btn.text() === '-')?.trigger('click')
      await buttons.find(btn => btn.text() === '2')?.trigger('click')
      await buttons.find(btn => btn.text() === '5')?.trigger('click')
      await buttons.find(btn => btn.text() === '=')?.trigger('click')
      await buttons.find(btn => btn.text() === '-')?.trigger('click')
      await buttons.find(btn => btn.text() === '2')?.trigger('click')
      await buttons.find(btn => btn.text() === '5')?.trigger('click')
      await buttons.find(btn => btn.text() === '=')?.trigger('click')
      
      const display = wrapper.find('.display')
      expect(display.text()).toBe('50')
    })
  })
}) 