import {useEffect} from 'react'

interface KeyboardShortcutOptions {
  metaKey?: boolean
}

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  {metaKey = false}: KeyboardShortcutOptions = {},
) {
  // Add a cmd+k hotkey to focus the search input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key !== key) return
      if (metaKey && !event.metaKey) return

      event.preventDefault()
      callback()
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [key, metaKey, callback])
}
