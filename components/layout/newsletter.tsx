import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Section from './section'

export default function Newsletter() {
  return (
    <Section background="subtle" spacing="lg">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Stay up to date with our latest designs
        </h2>
        <p className="mt-4 text-lg text-bb-gray-300">
          Get exclusive access to new products, special offers, and design inspiration delivered to your inbox.
        </p>
        <form className="mt-8 sm:flex sm:max-w-md sm:mx-auto">
          <div className="flex-1 min-w-0">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <Input
              id="email-address"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="w-full"
            />
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-3">
            <Button 
              type="submit" 
              color="flame"
              className="w-full sm:w-auto"
            >
              Subscribe
            </Button>
          </div>
        </form>
        <p className="mt-4 text-sm text-bb-gray-400">
          We care about your privacy. Read our{' '}
          <a href="/privacy" className="text-bb-flame-magenta hover:text-bb-flame-pink transition-colors">
            privacy policy
          </a>
          .
        </p>
      </div>
    </Section>
  )
} 