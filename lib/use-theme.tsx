// Adds a dark mode class if the user has dark mode enabled

import {Dispatch, SetStateAction} from 'react'

import {useLocalStorageState} from './use-local-storage-state'
import {useMatchMediaState} from './use-match-media-state'

export function useTheme(): [boolean, Dispatch<SetStateAction<boolean | null>>] {
  const [userDarkMode, setUserDarkMode] = useLocalStorageState<boolean | null>(
    null,
    'dark-mode',
  )
  const mediaDarkMode = useMatchMediaState('(prefers-color-scheme: dark)')
  const darkMode = userDarkMode ?? mediaDarkMode ?? false

  return [darkMode, setUserDarkMode]
}
