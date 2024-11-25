"use client"; // Marks this component as a Client Component

import React, { useState, useEffect } from 'react';
import Logo from './Logo';

function Header() {
  const [isClient, setIsClient] = useState(false);

  // Set client-side state after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isClient) {
    return null; // Optionally render nothing or a loading state before mounting
  }

  return (
    <div className="px-5">
      <nav className="z-10 w-full">
        <div>
          <div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
            <div className="relative z-20 w-full flex justify-between lg:w-max md:px-0">
              <a href="/dashboard" aria-label="logo" className="flex space-x-2 items-center">
                <Logo />
              </a>

              <div className="relative flex items-center lg:hidden max-h-10">
                <label role="button" htmlFor="toggle_nav" aria-label="hamburger" id="hamburger" className="relative p-6 -mr-6">
                  <div className="m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300"></div>
                  <div className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300"></div>
                </label>
              </div>
            </div>

            <div className="flex-col z-20 flex-wrap gap-6 p-8 rounded-3xl border bg-white shadow-2xl shadow-gray-600/10 justify-end w-full lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:border-none">
              <div className="text-gray-600 lg:pr-4 lg:w-auto w-full lg:pt-0">
                <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                  <li>
                    <button onClick={() => scrollToSection("features")} className="block md:px-4 transition hover:text-primary">
                      <span><b>Features</b></span>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection("testimonials")} className="block md:px-4 transition hover:text-primary">
                      <span><b>Testimonials</b></span>
                    </button>
                  </li>
                </ul>
              </div>

              {/* "Get Started" button as per original code */}
              <div className="mt-12 lg:mt-0">
                <a
                  href="/dashboard"
                  className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  <span className="relative text-sm font-semibold text-white">Sign Up</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
