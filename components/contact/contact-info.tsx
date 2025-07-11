import { 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  HeartIcon,
  GlobeAmericasIcon
} from '@heroicons/react/24/outline'

function MissionStatement() {
  return (
    <div className="bg-bb-subtle-gradient rounded-2xl p-8 flex-1 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <HeartIcon className="w-6 h-6 text-bb-flame-magenta" />
        <h3 className="text-xl font-bold text-white">Our Mission</h3>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-bb-gray-300 leading-relaxed mb-4">
          We are a company who puts our love for God and service to others in the forefront of all we do. 
          We have a passion for using the creativity God gave us to bring you the finest custom designs for your home and business.
        </p>
        <div className="flex items-center gap-2 text-bb-flame-orange">
          <GlobeAmericasIcon className="w-5 h-5" />
          <span className="text-sm font-medium">A portion of our sales supports ministry in the Dominican Republic</span>
        </div>
      </div>
    </div>
  )
}

function ContactDetails() {
  return (
    <div className="bg-bb-subtle-gradient rounded-2xl p-8 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-white mb-6">Get In Touch</h3>
      
      <div className="space-y-6 flex-1">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-bb-flame-magenta/10 rounded-lg flex items-center justify-center">
            <PhoneIcon className="w-6 h-6 text-bb-flame-magenta" />
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Phone</h4>
            <p className="text-bb-gray-300">
              <a href="tel:+1234567890" className="hover:text-bb-flame-magenta transition-colors">
                (123) 456-7890
              </a>
            </p>
            <p className="text-sm text-bb-gray-400">Call or text for quick questions</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-bb-flame-magenta/10 rounded-lg flex items-center justify-center">
            <EnvelopeIcon className="w-6 h-6 text-bb-flame-magenta" />
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Email</h4>
            <p className="text-bb-gray-300">
              <a href="mailto:info@buringbushdesign.com" className="hover:text-bb-flame-magenta transition-colors">
                info@buringbushdesign.com
              </a>
            </p>
            <p className="text-sm text-bb-gray-400">Best for detailed project discussions</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-bb-flame-magenta/10 rounded-lg flex items-center justify-center">
            <ClockIcon className="w-6 h-6 text-bb-flame-magenta" />
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Business Hours</h4>
            <div className="text-bb-gray-300 space-y-1">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
            <p className="text-sm text-bb-gray-400 mt-2">Response time: Within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ContactInfo() {
  return (
    <div className="h-full flex flex-col space-y-8">
      <MissionStatement />
      <ContactDetails />
    </div>
  )
} 