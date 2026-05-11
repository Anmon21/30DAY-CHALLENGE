import { useState } from 'react'

function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    setStored(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [stored, setValue] as const
}

export default useLocalStorage