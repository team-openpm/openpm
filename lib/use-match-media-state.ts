import {useEffect, useState} from 'react'

export function useMatchMediaState(match: string): boolean | undefined {
  const [state, setState] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(match)
    setState(mediaQueryList.matches)

    const listener = (event: MediaQueryListEvent) => {
      setState(event.matches)
    }

    mediaQueryList.addEventListener('change', listener)

    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [match])

  return state
}
