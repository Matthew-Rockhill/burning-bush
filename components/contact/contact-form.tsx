'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Fieldset } from '../ui/fieldset'
import { Select } from '../ui/select'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    timeline: '',
    budget: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitMessage('Thank you for your message! We\'ll get back to you within 24 hours.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: '',
          timeline: '',
          budget: ''
        })
      } else {
        const error = await response.json()
        setSubmitMessage(`Error: ${error.error || 'Failed to send message'}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitMessage('Error: Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="bg-bb-subtle-gradient rounded-2xl p-8 h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-3">Start Your Project</h2>
        <p className="text-bb-gray-300">
          Tell us about your custom design needs and we'll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
        {submitMessage && (
          <div className={`p-4 rounded-lg ${submitMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {submitMessage}
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Fieldset>
            <label className="block text-sm font-medium text-white mb-2">
              Name *
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full"
            />
          </Fieldset>

          <Fieldset>
            <label className="block text-sm font-medium text-white mb-2">
              Email *
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full"
            />
          </Fieldset>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Fieldset>
            <label className="block text-sm font-medium text-white mb-2">
              Phone
            </label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full"
            />
          </Fieldset>

          <Fieldset>
            <label className="block text-sm font-medium text-white mb-2">
              Project Type *
            </label>
            <Select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
              className="w-full"
            >
              <option value="">Select a service</option>
              <option value="custom-hats">Custom Hats</option>
              <option value="custom-shirts">Custom Shirts & Apparel</option>
              <option value="engraved-gifts">Engraved Gifts</option>
              <option value="team-uniforms">Team Uniforms</option>
              <option value="business-merchandise">Business Merchandise</option>
              <option value="awards-plaques">Awards & Plaques</option>
              <option value="other">Other</option>
            </Select>
          </Fieldset>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Fieldset>
            <label className="block text-sm font-medium text-white mb-2">
              Timeline
            </label>
            <Select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full"
            >
              <option value="">Select timeline</option>
              <option value="asap">ASAP</option>
              <option value="1-2-weeks">1-2 weeks</option>
              <option value="3-4-weeks">3-4 weeks</option>
              <option value="1-2-months">1-2 months</option>
              <option value="flexible">Flexible</option>
            </Select>
          </Fieldset>

          <Fieldset>
            <label className="block text-sm font-medium text-white mb-2">
              Budget Range
            </label>
            <Select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full"
            >
              <option value="">Select budget range</option>
              <option value="under-500">Under $500</option>
              <option value="500-1000">$500 - $1,000</option>
              <option value="1000-2500">$1,000 - $2,500</option>
              <option value="2500-5000">$2,500 - $5,000</option>
              <option value="5000-plus">$5,000+</option>
            </Select>
          </Fieldset>
        </div>

        <Fieldset>
          <label className="block text-sm font-medium text-white mb-2">
            Project Details *
          </label>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
            placeholder="Tell us about your project... What items do you need? How many? Any specific design ideas? Colors? Text or logos?"
            className="w-full"
          />
        </Fieldset>

        <div className="mt-auto pt-4">
          <Button
            type="submit"
            color="flame"
            disabled={isSubmitting}
            className="w-full py-3 text-lg font-semibold"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>

          <p className="text-sm text-bb-gray-400 text-center mt-4">
            We'll respond within 24 hours with a custom quote and next steps.
          </p>
        </div>
      </form>
    </div>
  )
} 