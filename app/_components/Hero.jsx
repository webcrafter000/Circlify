// Hero Component (Hero.js)
import React from 'react';

function Hero() {
  return (
    <div className="relative" id="home">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-pink-300 dark:from-blue-500"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-teal-200 to-light-blue-200 dark:to-purple-500"></div>
      </div>
      <div>
        <div className="relative pt-36 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
              Circlify, where <span className="text-primary dark:text-white">collaboration flows effortlessly.</span>
            </h1>
            <p className="mt-8 text-gray-700 dark:text-gray-300">
              Circlify provides a unified workspace where teams can collaborate, share, and manage projects
              smoothly. With adaptable templates and modular components that sync across various tools, it’s
              easier than ever to stay organized and in sync.
            </p>
            <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
              <a
                href="/dashboard"
                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <span className="relative text-base font-semibold text-white">
                  Get started
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
