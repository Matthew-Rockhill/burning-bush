import Header from '@/components/layout/header'
import Section from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import Footer from '@/components/layout/footer'

export default function TeamStorePage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="bg-bb-black">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Your Team Store,
                <span className="text-bb-gradient"> Completely Handled</span>
              </h1>
              <p className="text-xl text-bb-gray-300 mb-8">
                Professional merchandise your community will actually want to buy. We design, create, and manage everything so you can focus on what matters most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button color="flame">Launch Your Store</Button>
                <Button outline>See Examples</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  alt="Professional team merchandise"
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
                  className="w-full rounded-lg bg-bb-darker object-cover shadow-lg"
                />
                <img
                  alt="Premium custom caps"
                  src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80"
                  className="w-full rounded-lg bg-bb-darker object-cover shadow-lg"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  alt="Custom team store interface"
                  src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80"
                  className="w-full rounded-lg bg-bb-darker object-cover shadow-lg"
                />
                <img
                  alt="Recognition and awards"
                  src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80"
                  className="w-full rounded-lg bg-bb-darker object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Organizations Choose Us - Split Layout */}
      <Section background="subtle" spacing="xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-base/7 font-semibold text-bb-flame-magenta">Why Organizations Choose Us</h2>
            <h3 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl mb-8">
              Premium quality that builds pride
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Professional Results</h4>
                <p className="text-bb-gray-300">Your team deserves merchandise that looks as professional as your organization. No cheap heat transfers or faded prints.</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Zero Hassle Management</h4>
                <p className="text-bb-gray-300">We handle customer service, inventory, shipping, returns - everything. You get the revenue and community building without the headaches.</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Complete Customization</h4>
                <p className="text-bb-gray-300">From apparel to awards to signage - we create everything your organization needs with your branding, perfectly coordinated.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              alt="Professional team merchandise display"
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
              className="w-full rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-bb-flame-magenta text-white p-4 rounded-lg shadow-lg">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm">Managed for You</div>
            </div>
          </div>
        </div>
      </Section>

      {/* How It Works - Horizontal Timeline */}
      <Section background="default" spacing="xl">
        <div className="text-center mb-16">
          <h2 className="text-base/7 font-semibold text-bb-flame-magenta">How It Works</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Simple process, professional results
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-0.5 bg-bb-flame-gradient hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center relative">
              <div className="mx-auto h-16 w-16 rounded-full bg-bb-flame-magenta text-white flex items-center justify-center font-bold text-2xl mb-6 relative z-10">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Tell Us Your Vision</h3>
              <p className="text-bb-gray-300">
                Share your organization details, design ideas, and what success looks like for your community.
              </p>
            </div>
            
            <div className="text-center relative">
              <div className="mx-auto h-16 w-16 rounded-full bg-bb-flame-orange text-white flex items-center justify-center font-bold text-2xl mb-6 relative z-10">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">We Build Everything</h3>
              <p className="text-bb-gray-300">
                Custom designs, product selection, store setup, and launch - all handled by our team while you focus on your mission.
              </p>
            </div>
            
            <div className="text-center relative">
              <div className="mx-auto h-16 w-16 rounded-full bg-bb-flame-cyan text-white flex items-center justify-center font-bold text-2xl mb-6 relative z-10">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Watch It Grow</h3>
              <p className="text-bb-gray-300">
                Your community starts buying, you start earning, and we handle all the logistics. Pure profit and community pride.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Product Range - Grid with Categories */}
      <Section background="subtle" spacing="xl">
        <div className="text-center mb-16">
          <h2 className="text-base/7 font-semibold text-bb-flame-magenta">Complete Product Range</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Everything your organization needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Apparel Category */}
          <div className="bg-bb-darker p-8 rounded-xl">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-lg bg-bb-flame-purple/20 flex items-center justify-center mr-4">
                <svg className="h-6 w-6 text-bb-flame-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Custom Apparel</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80" alt="Custom t-shirts" className="rounded-lg object-cover" />
              <img src="https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80" alt="Premium caps" className="rounded-lg object-cover" />
            </div>
            <ul className="text-bb-gray-300 space-y-2">
              <li>• Premium caps with unique detailing</li>
              <li>• Durable custom t-shirts and hoodies</li>
              <li>• Professional uniforms and polos</li>
              <li>• Seasonal and special event gear</li>
            </ul>
          </div>

          {/* Recognition & Signage Category */}
          <div className="bg-bb-darker p-8 rounded-xl">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-lg bg-bb-flame-orange/20 flex items-center justify-center mr-4">
                <svg className="h-6 w-6 text-bb-flame-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Awards & Signage</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80" alt="Custom awards" className="rounded-lg object-cover" />
              <img src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80" alt="Custom signage" className="rounded-lg object-cover" />
            </div>
            <ul className="text-bb-gray-300 space-y-2">
              <li>• Custom awards and recognition plaques</li>
              <li>• Professional signage and banners</li>
              <li>• Personalized gifts and keepsakes</li>
              <li>• Event materials and displays</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Success Metrics - Stats Layout */}
      <Section background="default" spacing="xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-base/7 font-semibold text-bb-flame-magenta">Proven Results</h2>
            <h3 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl mb-8">
              Organizations are succeeding
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-bb-darker rounded-lg">
                <div className="text-3xl font-bold text-bb-flame-magenta mb-2">$50K+</div>
                <div className="text-bb-gray-300">Average Annual Revenue</div>
              </div>
              <div className="text-center p-6 bg-bb-darker rounded-lg">
                <div className="text-3xl font-bold text-bb-flame-orange mb-2">95%</div>
                <div className="text-bb-gray-300">Customer Satisfaction</div>
              </div>
              <div className="text-center p-6 bg-bb-darker rounded-lg">
                <div className="text-3xl font-bold text-bb-flame-purple mb-2">48hr</div>
                <div className="text-bb-gray-300">Average Response Time</div>
              </div>
              <div className="text-center p-6 bg-bb-darker rounded-lg">
                <div className="text-3xl font-bold text-bb-flame-cyan mb-2">100+</div>
                <div className="text-bb-gray-300">Active Team Stores</div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-bb-darker p-6 rounded-lg border-l-4 border-bb-flame-magenta">
              <div className="flex items-center mb-3">
                <img src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80" alt="School logo" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <div className="text-white font-semibold">Lincoln High Athletics</div>
                  <div className="text-bb-gray-400 text-sm">High School</div>
                </div>
              </div>
              <p className="text-bb-gray-300">"The quality exceeded our expectations. Our community loves the merchandise and we've raised significant funds for our programs."</p>
            </div>
            
            <div className="bg-bb-darker p-6 rounded-lg border-l-4 border-bb-flame-orange">
              <div className="flex items-center mb-3">
                <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80" alt="Nonprofit logo" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <div className="text-white font-semibold">Community First Foundation</div>
                  <div className="text-bb-gray-400 text-sm">Non-Profit</div>
                </div>
              </div>
              <p className="text-bb-gray-300">"Having everything managed for us was a game-changer. We can focus on our mission while the store runs itself."</p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="flame" spacing="xl">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Build Something Great?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join organizations across the country who've discovered the power of professional, managed team stores. 
            Let's create something your community will be proud to support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button color="light">
              Start Your Store
            </Button>
            <Button outline>
              See Success Stories
            </Button>
          </div>
          <p className="text-white/70 text-sm mt-6">
            Faith-driven business • Supporting ministry in the Dominican Republic
          </p>
        </div>
      </Section>

      <Footer />
    </>
  )
}