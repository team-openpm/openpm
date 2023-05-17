import {useEffect, useState} from 'react'

export function useDebouncedState<T>(
  initialState: T,
  delay = 100,
): [T, (value: T) => void] {
  const [state, setState] = useState<T>(initialState)
  const [debouncedState, setDebouncedState] = useState(initialState)

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedState(state), delay)
    return () => clearTimeout(timeoutId)
  }, [delay, state])

  return [debouncedState, setState]
}
