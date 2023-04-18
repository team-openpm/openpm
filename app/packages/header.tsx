'use client'

import clsx from 'clsx'
import {ReactNode, useEffect, useState} from 'react'

export function Header({children}: {children: ReactNode}) {
  const [top, setTop] = useState(true)

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 40 ? setTop(false) : setTop(true)
    }
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  return (
    <header
      className={clsx(
        'top-14 z-30 flex flex-1 transform-gpu flex-col transition duration-300 ease-in-out sm:sticky',
        {'sm:drop-shadow-lg': !top},
      )}
    >
      {children}
    </header>
  )
}
