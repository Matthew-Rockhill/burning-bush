import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Link } from '../ui/link'

const navigation = [
  { name: 'Home', href: '/', current: true, isNew: false },
  { name: 'Shop', href: '/shop', current: false, isNew: false },
  { name: 'Team Stores', href: '/team-store', current: false, isNew: true },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-bb-dark border-b border-bb-darker">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="mr-2 -ml-2 flex items-center md:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-bb-gray-400 hover:bg-bb-darker hover:text-white focus:ring-2 focus:ring-bb-flame-purple focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
            <div className="flex shrink-0 items-center">
              {/* Logo */}
              <div className="text-2xl font-bold text-bb-gradient">
                Burning Bush
              </div>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current 
                      ? 'bg-bb-darker text-white' 
                      : 'text-bb-gray-300 hover:bg-bb-darker hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 relative inline-flex items-center gap-2',
                  )}
                >
                  {item.name}
                  {item.isNew && (
                    <Badge color="flame" className="text-xs font-bold">
                      NEW
                    </Badge>
                  )}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="shrink-0">
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-bb-flame-magenta hover:bg-bb-flame-purple rounded-lg">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current 
                  ? 'bg-bb-darker text-white' 
                  : 'text-bb-gray-300 hover:bg-bb-darker hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 flex items-center gap-2',
              )}
            >
              {item.name}
              {item.isNew && (
                <Badge color="flame" className="text-xs font-bold">
                  NEW
                </Badge>
              )}
            </DisclosureButton>
          ))}
        </div>
        <div className="border-t border-bb-darker pt-4 pb-3">
          <div className="flex items-center justify-center px-5 sm:px-6">
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-bb-flame-magenta hover:bg-bb-flame-purple rounded-lg w-full">
              Contact
            </Link>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
} 