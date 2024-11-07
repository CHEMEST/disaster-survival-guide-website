import { Disclosure, DisclosureButton } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigationItems = [
  { name: 'Early Fires', to: '#earlyFires', id: 0 },
  { name: 'Revolution', to: '#revolution', id: 1 },
  { name: 'Modern', to: '#modern', id: 2 },
  { name: 'Map', to: '#map', id: 3 },
  { name: 'News', to: '#news', id: 4 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TopNavbar({ activeId, setActiveId, switchSlides }) {
  return (
    <Disclosure as="nav" className="bg-accent-dim sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </Disclosure.Button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img alt="Logo" src="/fireLogo.png" className="h-8 w-auto" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.to} // Sets href to target section
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default anchor behavior
                      setActiveId(item.id);
                      console.log(item.id);
                      switchSlides(() => item.id); // Trigger slide animation
                    }}
                    className={classNames(
                      activeId === item.id ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={activeId === item.id ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigationItems.map((item) => (
            <Disclosure.Button
              key={item.id}
              as="a"
              href={item.to}
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                setActiveId(item.id);
                switchSlides(() => item.id); // Trigger slide animation
              }}
              className={classNames(
                activeId === item.id ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
              aria-current={activeId === item.id ? 'page' : undefined}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel> */}
    </Disclosure>
  );
}
