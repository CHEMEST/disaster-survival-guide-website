import { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigationItems = [
  { name: 'Early Fires', to: '#earlyFires', id: 1 },
  { name: 'Destruction', to: '#revolution', id: 2 },
  { name: 'Modern', to: '#modern', id: 3 },
  { name: 'Map', to: '#map', id: 4 },
  { name: 'News', to: '#news', id: 5 },
  { name: 'About Us', to: '#dfghj', id: 6 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TopNavbar({ activeId, setActiveId, switchSlides }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => setFadeOut(false), 500); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [fadeOut]);

  return (
    <Disclosure as="nav" className="bg-accent-dim sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </Disclosure.Button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <button onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                if (!switchSlides(() => 0)) return; // Trigger slide animation
                setActiveId(0);
                console.log(0);
              }}>
                <img alt="Logo" src="/fireLogo.png" className="h-8 w-auto hover:scale-110"/>
              </button>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.to}
                    onClick={(e) => {
                      e.preventDefault();
                      if (activeId === item.id) return;

                      // Start fade-out effect
                      setFadeOut(true);
                      setActiveId(item.id); // Update active item
                      if (!switchSlides(() => item.id)) return;
                    }}
                    className={classNames(
                      'nav-item-background', // Default hidden background
                      activeId === item.id && !fadeOut ? 'nav-item-active' : '',
                      fadeOut && activeId === item.id ? 'fade-out' : '',
                      'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
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
    </Disclosure>
  );
}
