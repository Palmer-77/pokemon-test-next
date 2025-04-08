import { merge } from 'lodash'
import { useEffect, useState } from 'react'

const PREFERENCES_LOCAL_STORAGE_KEY = 'dl:preferences'

type Preferences = {
  sidebar: {
    isExpanded: boolean
  }
}

const defaultPreferences: Preferences = {
  sidebar: {
    isExpanded: false,
  },
}

export const usePreferences = () => {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences)

  useEffect(() => {
    const storedPreferences = localStorage.getItem(PREFERENCES_LOCAL_STORAGE_KEY)
    if (storedPreferences) {
      setPreferences((prev) => merge(prev, JSON.parse(storedPreferences)))
    }
  }, [setPreferences])

  const set = (newPreferences: Partial<Preferences>) => {
    const mergedPreferences = merge(preferences, newPreferences)
    setPreferences(mergedPreferences)
    localStorage.setItem(PREFERENCES_LOCAL_STORAGE_KEY, JSON.stringify(mergedPreferences))
  }

  const reset = () => {
    setPreferences(defaultPreferences)
    localStorage.setItem(PREFERENCES_LOCAL_STORAGE_KEY, JSON.stringify(defaultPreferences))
  }

  return {
    preferences,
    setPreferences: set,
    resetPreferences: reset,
  }
}
