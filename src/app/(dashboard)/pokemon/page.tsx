'use client'

import { HomeContentContainer } from '@/components'
import { PokemonManagementList } from '@/components/pages/Dashboard/PokemonManagement/List'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  return (
    <HomeContentContainer title={'Pokemon'}>
      <PokemonManagementList />
    </HomeContentContainer>
  )
}

export default Page
