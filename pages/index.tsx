import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import Footer from '../components/common/Footer';
import ServiceName from '../components/common/ServiceName';
import DemoCoursesSection from '../components/landing/DemoCoursesSection';

/**
 * The primary landing page for the application.
 *
 * This is mostly for marketing.
 *
 * TODO: also show some lightweight interactive demos since why not.
 */
export default function LandingPage(): JSX.Element {
  return (
    <div className="min-w-screen min-h-screen flex flex-col bg-gray-200">
      <Head>
        <title>Nebula Web - A Degree Planning Tool for UTD Students</title>
        <meta
          name="description"
          content="Nebula Web is a tool that lets you plan out your academic career."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* TODO: Change opacity of header to 0% on scroll */}
      <header className="w-full flex p-4 fixed bg-white drop-shadow-sm bg-opacity-25">
        <div className="flex-grow flex">
          <div className="px-2 flex-initial text-headline6 font-bold">Nebula</div>
        </div>
        <div>
          <a
            href={process.env.NEXT_PUBLIC_ADMIN_ROUTE}
            className="mx-2 p-2 text-button font-bold uppercase"
          >
            Admin
          </a>
          <Link href="/app/auth">
            <a className="mx-w p-2 text-button font-bold bg-primary uppercase rounded-md shadow-sm">
              Sign In
            </a>
          </Link>
        </div>
      </header>
      <div className="min-h-screen flex-grow md:flex md:flex-nowrap">
        <div className="flex-shrink-0 p-4 md:p-8 bg-gray-200 flex flex-col justify-center">
          <div className="max-w-4xl bg-white mt-16 md:my-0 p-8 mx-auto shadow-md rounded-md text-center md:text-left">
            <div className="text-headline4 font-bold">
              <ServiceName />
            </div>
            <div className="text-headline6">Plan out your degree plan and so much more.</div>
            <div className="my-2 text-body1 font-bold">Coming soon.</div>
            <div className="my-4">
              <div className="text-body2 mb-2">Or, if you&apos;re curious:</div>
              <button className="p-2 rounded-md shadow-md hover:shadow-lg bg-secondary font-bold text-button uppercase">
                <Link href="/app">
                  <a>Explore Nebula 🌌</a>
                </Link>
              </button>
            </div>
          </div>
          <div className="p-4 text-center">
            A{' '}
            <a
              className="text-primary hover:text-primary-dark font-bold"
              href="https://nebula.acmutd.co"
            >
              Project Nebula
            </a>{' '}
            initative
          </div>
        </div>
        <div className="md:flex-grow md:py-16 bg-gray-300 md:overflow-hidden">
          <div className="px-4 md:ml-8 md:px-0 py-4 md:py-0 text-headline5 md:invisible">
            Degree planning at a glance
          </div>
          <DemoCoursesSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
