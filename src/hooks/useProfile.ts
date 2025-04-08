import { useEffect, useMemo, useState } from 'react'

const useProfileData = () => {
  const [profile, setProfile] = useState<any | null>(null)

  return {
    profile,
    setProfile,
  }
}

export { useProfileData }
