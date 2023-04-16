import {Dispatch, SetStateAction, useMemo, useState} from 'react'

export function useLocalStorageState<K>(
  initialState: K,
  key: string,
): [K, Dispatch<SetStateAction<K>>] {
  const sessionState = useMemo<K | undefined>(() => getItem<K | undefined>(key), [key])

  const [state, setState] = useState(sessionState ?? initialState)

  const dispatch: Dispatch<SetStateAction<K>> = (value) => {
    setState(value)
    setItem(key, value)
  }

  return [state, dispatch]
}

function getItem<T>(key: string): T | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }

  const value = window.localStorage.getItem(key)
  return value ? JSON.parse(value) : undefined
}

function setItem<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value))
}
