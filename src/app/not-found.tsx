'use client'

import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useRedirectTimeout } from '@/modules/common/hooks/useRedirectTimeout'

const NotFound = () => {
  useRedirectTimeout(5000, '/')

  return (
    <>
      <section className="flex size-full items-center p-16">
        <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
          <div className="max-w-md text-center">
            <h2 className="mb-8 text-9xl font-extrabold text-primary-regular">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldnt find this page.
            </p>
            <p className="mb-8 mt-4 text-primary-regular">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link
              href="/"
              passHref
              className="flex items-center justify-center gap-4"
            >
              <Icon icon={'bi:arrow-left-circle'} />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
export default NotFound
