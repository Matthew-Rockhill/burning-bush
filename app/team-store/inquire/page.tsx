'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import Section from '@/components/layout/section'

export default function TeamStoreInquiryPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    website: '',
    description: '',
    logo: null as File | null,
    design: null as File | null
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('organization', formData.organization)
      formDataToSend.append('website', formData.website)
      formDataToSend.append('description', formData.description)
      
      if (formData.logo) {
        formDataToSend.append('logo', formData.logo)
      }
      if (formData.design) {
        formDataToSend.append('design', formData.design)
      }

      const response = await fetch('/api/team-store-inquiries', {
        method: 'POST',
        body: formDataToSend
      })

      if (response.ok) {
        setMessageType('success')
        setMessage('Thank you! Your team store inquiry has been submitted successfully. We\'ll be in touch soon!')
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          website: '',
          description: '',
          logo: null,
          design: null
        })
        
        // Reset file inputs
        const fileInputs = document.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>
        fileInputs.forEach(input => input.value = '')
      } else {
        const error = await response.json()
        setMessageType('error')
        setMessage(error.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setMessageType('error')
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Section className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heading level={1} className="text-4xl font-bold text-gray-900 mb-4">
              Launch Your Team Store
            </Heading>
            <Text className="text-xl text-gray-600">
              Tell us about your organization and we'll help you create a custom merchandise store.
            </Text>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {message && (
              <div className={`mb-6 p-4 rounded-lg border ${messageType === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
                <Heading level={3} className="text-xl font-semibold mb-4 text-gray-900">
                  Contact Information
                </Heading>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Organization Information */}
              <div>
                <Heading level={3} className="text-xl font-semibold mb-4 text-gray-900">
                  Organization Information
                </Heading>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Name *
                    </label>
                    <Input
                      id="organization"
                      name="organization"
                      type="text"
                      required
                      value={formData.organization}
                      onChange={handleInputChange}
                      placeholder="Your organization name"
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://your-organization.com"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your organization and what you'd like to achieve with a team store *
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your organization, your community, and what kind of merchandise you're interested in..."
                  />
                </div>
              </div>

              {/* File Uploads */}
              <div>
                <Heading level={3} className="text-xl font-semibold mb-4 text-gray-900">
                  Design Assets (Optional)
                </Heading>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Logo
                    </label>
                    <Input
                      id="logo"
                      name="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <Text className="text-sm text-gray-500 mt-1">
                      Upload your organization's logo (PNG, JPG, SVG)
                    </Text>
                  </div>
                  <div>
                    <label htmlFor="design" className="block text-sm font-medium text-gray-700 mb-2">
                      Design Ideas
                    </label>
                    <Input
                      id="design"
                      name="design"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <Text className="text-sm text-gray-500 mt-1">
                      Upload any design ideas or inspiration (Images, PDF)
                    </Text>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  className="text-lg px-6 py-3"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Team Store Inquiry'}
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <Text className="text-sm text-gray-500">
                We'll review your inquiry and get back to you within 2-3 business days.
              </Text>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
} 