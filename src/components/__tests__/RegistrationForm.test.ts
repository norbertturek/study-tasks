import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import RegistrationForm from '../RegistrationForm.vue'

describe('Registration Form Integration Tests', () => {
  let formWrapper: VueWrapper

  beforeEach(() => {
    // Mount form component for testing
    formWrapper = mount(RegistrationForm)
  })

  describe('Form Validation Integration', () => {
    it('integrates all validation rules together', async () => {
      // Test all validations in combination
      await formWrapper.find('form').trigger('submit')

      // Verify multiple validation errors appear together
      const errorMessages = formWrapper.findAll('.error-message')
      expect(errorMessages.length).toBeGreaterThan(0)
      expect(formWrapper.text()).toContain('Username is required!!')
      expect(formWrapper.text()).toContain('Email is required')
      expect(formWrapper.text()).toContain('Password is required')
    })

    it('validates username and email format together', async () => {
      // Test invalid username and email combination
      await formWrapper.find('#username').setValue('a@')
      await formWrapper.find('#email').setValue('invalid-email')
      await formWrapper.find('form').trigger('submit')

      // Verify both validation errors appear
      expect(formWrapper.text()).toContain('Username must be at least 3 characters long')
      expect(formWrapper.text()).toContain('Please enter a valid email address')
    })

    it('validates password and confirmation together', async () => {
      // Test password validation combination
      await formWrapper.find('#password').setValue('pass123')
      await formWrapper.find('#confirmPassword').setValue('pass456')
      await formWrapper.find('form').trigger('submit')

      // Verify both password-related errors
      expect(formWrapper.text()).toContain('Password must be at least 8 characters long')
      expect(formWrapper.text()).toContain('Passwords do not match')
    })
  })

  describe('Form State and UI Integration', () => {
    it('maintains form state across multiple validation attempts', async () => {
      // Fill form with partial valid data
      await formWrapper.find('#username').setValue('validuser')
      await formWrapper.find('#email').setValue('test@example.com')
      
      // First validation attempt
      await formWrapper.find('form').trigger('submit')
      
      // Verify valid fields retain their values
      expect(formWrapper.find('#username').element.value).toBe('validuser')
      expect(formWrapper.find('#email').element.value).toBe('test@example.com')
      expect(formWrapper.text()).toContain('Password is required')
    })

    it('integrates error states with UI elements', async () => {
      // Submit empty form
      await formWrapper.find('form').trigger('submit')

      // Verify error classes are applied to inputs
      expect(formWrapper.find('#username').classes()).toContain('error')
      expect(formWrapper.find('#email').classes()).toContain('error')
      expect(formWrapper.find('#password').classes()).toContain('error')
    })

    it('clears error states when valid data is entered', async () => {
      // First trigger errors
      await formWrapper.find('form').trigger('submit')
      
      // Then fix one field
      await formWrapper.find('#username').setValue('validuser')
      await formWrapper.find('form').trigger('submit')

      // Verify that field's error is cleared
      expect(formWrapper.find('#username').classes()).not.toContain('error')
      expect(formWrapper.text()).not.toContain('Username is required')
    })
  })

  describe('Complete Registration Flow', () => {
    it('successfully completes registration with valid data', async () => {
      // Fill in all fields with valid data
      await formWrapper.find('#username').setValue('validuser')
      await formWrapper.find('#email').setValue('test@example.com')
      await formWrapper.find('#password').setValue('password123')
      await formWrapper.find('#confirmPassword').setValue('password123')

      // Submit form
      await formWrapper.find('form').trigger('submit')

      // Verify successful submission
      const emitted = formWrapper.emitted('register')
      expect(emitted).toBeTruthy()
      expect(emitted?.[0][0]).toMatchObject({
        username: 'validuser',
        email: 'test@example.com',
        password: 'password123'
      })

      // Verify no error messages are shown
      expect(formWrapper.findAll('.error-message').length).toBe(0)
    })
  })
}) 