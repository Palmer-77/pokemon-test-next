import { useMutation, useQuery } from '@/hooks'
import { PaginatedResponse } from '@/models/api'
import { SizeStatus } from '@/constants/size'
import { useQueryClient } from '@tanstack/react-query'

export interface PrevEvolution {
  num: string
  name: string
}

export interface Pokemon {
  id: number
  num: string
  name: string
  img: string
  type: string[]
  height: string
  weight: string
  candy: string
  egg: string
  multipliers: number[] | null
  weaknesses: string[]
  spawn_chance: number
  avg_spawns: number
  spawn_time: string
  prev_evolution?: PrevEvolution[]
}

export const useGetPokemonList = () => {
  return useQuery<Pokemon[]>({
    queryKey: ['pokemon'],
    url: '/pokemon',
  })
}

export const useCreatePokemon = () => {
  const queryClient = useQueryClient()
  return useMutation<any, Error, Omit<Pokemon, 'id'>>(
    ['create_pokemon'],
    {
      url: `/pokemon`,
      method: 'POST',
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['pokemon'] })
      },
    },
  )
}

export const useDeletePokemon = () => {
  const queryClient = useQueryClient()
  return useMutation<any, Error, { id: number }>(
    ['delete_pokemon'],
    {
      url: `/pokemon/:id`,
      method: 'DELETE',
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['pokemon'] })
      },
    },
  )
}

export const useUpdatePokemon = () => {
  const queryClient = useQueryClient()
  return useMutation<any, Error, Omit<Pokemon, 'id'> & { id: number }>(
    ['update_pokemon'],
    {
      url: `/pokemon/:id`,
      method: 'PATCH',
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['pokemon'] })
      },
    },
  )
}
