import {useEffect} from 'react'

export function useMessageListener(callback: (event: MessageEvent) => void) {
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      callback(event)
    }
    window.addEventListener('message', listener)
    return () => {
      window.removeEventListener('message', listener)
    }
  }, [callback])
}
