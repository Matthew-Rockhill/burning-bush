import { Button } from '../ui/button'

export default function Hero() {
  return (
    <div className="bg-bb-black">
      <div className="relative isolate">
        {/* Background pattern */}
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-256 w-full mask-[radial-gradient(32rem_32rem_at_center,white,transparent)] stroke-bb-darker"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="hero-pattern"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-bb-dark">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#hero-pattern)" width="100%" height="100%" strokeWidth={0} />
        </svg>
        
        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
        >
          <div
            style={{
              clipPath:
                'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
            }}
            className="aspect-801/1036 w-200.25 bg-bb-flame-gradient opacity-30"
          />
        </div>
        
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1 className="text-5xl font-semibold tracking-tight text-pretty text-white sm:text-7xl">
                  Custom Apparel & 
                  <span className="text-bb-gradient"> Personalized Creations</span>
                </h1>
                <p className="mt-8 text-lg font-medium text-pretty text-bb-gray-300 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                  From custom clothing that makes a statement to meaningful keepsakes that last a lifetime. 
                  We bring your vision to life with God-given creativity and premium craftsmanship.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Button color="flame">
                    Start Your Project
                  </Button>
                  <a href="#browse-categories" className="text-sm/6 font-semibold text-bb-gray-300 hover:text-white transition-colors duration-200">
                    Explore Our Work <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              <div className="mt-14 lg:mt-0">
                {/* Top row - slides left */}
                <div className="flex gap-6 overflow-hidden">
                  <div className="flex gap-6 animate-slide-left">
                    <div className="relative w-80 flex-shrink-0">
                      <img
                        alt="Custom apparel showcase"
                        src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&h=400&w=320&q=80"
                        className="aspect-4/5 w-full rounded-xl bg-bb-darker object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-bb-flame-purple/20 ring-inset" />
                    </div>
                    <div className="relative w-80 flex-shrink-0">
                      <img
                        alt="Professional signage"
                        src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&h=400&w=320&q=80"
                        className="aspect-4/5 w-full rounded-xl bg-bb-darker object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-bb-flame-purple/20 ring-inset" />
                    </div>
                    <div className="relative w-80 flex-shrink-0">
                      <img
                        alt="Custom team merchandise"
                        src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&auto=format&fit=crop&crop=left&w=320&h=400&q=80"
                        className="aspect-4/5 w-full rounded-xl bg-bb-darker object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-bb-flame-purple/20 ring-inset" />
                    </div>
                    <div className="relative w-80 flex-shrink-0">
                      <img
                        alt="Personalized keepsakes"
                        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=320&h=400&q=80"
                        className="aspect-4/5 w-full rounded-xl bg-bb-darker object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-bb-flame-purple/20 ring-inset" />
                    </div>
                    {/* Duplicate images for seamless loop */}
                    <div className="relative w-80 flex-shrink-0">
                      <img
                        alt="Custom apparel showcase"
                        src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&h=400&w=320&q=80"
                        className="aspect-4/5 w-full rounded-xl bg-bb-darker object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-bb-flame-purple/20 ring-inset" />
                    </div>
                    <div className="relative w-80 flex-shrink-0">
                      <img
                        alt="Professional signage"
                        src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&h=400&w=320&q=80"
                        className="aspect-4/5 w-full rounded-xl bg-bb-darker object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-bb-flame-purple/20 ring-inset" />
                    </div>
                  </div>
                </div>

                {/* Bottom row - slides right */}
                <div className="flex gap-6 overflow-hidden mt-6">
                  <div className="flex gap-6 animate-slide-right">
                    <div className="relative w-80 flex-shrink-0">
                      <img
                        alt="Personalized keepsakes"
                        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=320&h=400&q=80"
                        className="aspect-4/5 w-full rounded-xl bg-bb-darker object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-bb-flame-purple/20 ring-inset" />
                    </div>
                    <div className="relative w-80 flex-shrink-0">
                      <img
                        alt="Custom team merchandise"
                        src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&auto=format&fit=crop&crop=left&w=320&h=400&q=80"
                        className="aspect-4/5 w-full rounded-xl bg-bb-darker object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-bb-flame-purple/20 ring-inset" />
                    </div>
                    <div className="relative w-80 flex-shrink-0">
                      <img
                        alt="Professional signage"
                        src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&h=400&w=320&q=80"
                        className="aspect-4/5 w-full rounded-xl bg-bb-darker object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-bb-flame-purple/20 ring-inset" />
                    </div>
                    <div className="relative w-80 flex-shrink-0">
                      <img
                        alt="Custom apparel showcase"
                        src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&h=400&w=320&q=80"
                        className="aspect-4/5 w-full rounded-xl bg-bb-darker object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-bb-flame-purple/20 ring-inset" />
                    </div>
                    {/* Duplicate images for seamless loop */}
                    <div className="relative w-80 flex-shrink-0">
                      <img
                        alt="Personalized keepsakes"
                        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=320&h=400&q=80"
                        className="aspect-4/5 w-full rounded-xl bg-bb-darker object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-bb-flame-purple/20 ring-inset" />
                    </div>
                    <div className="relative w-80 flex-shrink-0">
                      <img
                        alt="Custom team merchandise"
                        src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&auto=format&fit=crop&crop=left&w=320&h=400&q=80"
                        className="aspect-4/5 w-full rounded-xl bg-bb-darker object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-bb-flame-purple/20 ring-inset" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 