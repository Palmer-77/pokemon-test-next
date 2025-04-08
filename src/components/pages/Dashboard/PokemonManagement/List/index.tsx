'use client'

import { Fragment, useState } from 'react'
import { Loader } from '@/components/common/Loader'
import { Button } from '@/components/ui'
import { Pokemon, useCreatePokemon, useDeletePokemon, useGetPokemonList, useUpdatePokemon } from '@/modules/pokemon/services/pokemon'
import { toast } from '@/components/common/Toast'
import ModalCreatePokemon from './ModalCreatePokemon'

export const PokemonManagementList = () => {
  const [isOpen, setIsOpen] = useState(false)
  const $apiDeletePokemon = useDeletePokemon()
  const $apiUpdatePokemon = useUpdatePokemon()
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)

  const { data, isLoading: isLoadingPokemon } = useGetPokemonList()

  const $apiCreatePokemon = useCreatePokemon()

  const handleCreatePokemon = async (pokemon: Omit<Pokemon, 'id'>) => {
    try {
      await $apiCreatePokemon.mutateAsync({
        ...pokemon,
      })
      setIsOpen(false)
      toast.toastSuccess('สร้างโปเกมอนสำเร็จ')
    } catch (error) {
      console.log(error)
    } finally {
      setSelectedPokemon(null)
    }
  }

  const handleUpdatePokemon = async (pokemon: Omit<Pokemon, 'id'>) => {
    try {
      await $apiUpdatePokemon.mutateAsync({
        ...pokemon,
        id: selectedPokemon?.id ?? 0,
      })
      setIsOpen(false)
      toast.toastSuccess('อัพเดตโปเกมอนสำเร็จ')
    } catch (error) {
      console.log(error)
    } finally {
      setSelectedPokemon(null)
    }
  }

  return (
    <Fragment>
      <div className="flex items-center gap-3 w-full pr-8 mobile:pr-0 sm:absolute sm:right-0 sm:top-4 sm:w-auto mobile:w-full">
        <Button
          className="rounded-lg mobile:w-full"
          onClick={() => {
            setSelectedPokemon(null)
            setIsOpen(true)
          }}
        >
          Create
        </Button>
      </div>
      <div className="relative">
        <div className="relative p-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {isLoadingPokemon ? (
              <div>Loading...</div>
            ) : (
              data?.map((pokemon) => (
                <div key={pokemon.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="flex justify-center items-center h-48 overflow-hidden">
                    <img
                      src={pokemon.img}
                      alt={pokemon.name}
                      className="w-20 h-20 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{pokemon.name}</h3>
                    <p className="text-sm text-gray-600">Type: {pokemon.type.join(', ')}</p>
                    <div className="mt-2 text-sm">
                      <p>Height: {pokemon.height}</p>
                      <p>Weight: {pokemon.weight}</p>
                      <p>Weaknesses: {pokemon.weaknesses.join(', ')}</p>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedPokemon(pokemon)
                          setIsOpen(true)
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={async () => {
                          try {
                            await $apiDeletePokemon.mutateAsync({ id: pokemon.id })
                          } catch (error) {
                            console.log(error)
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {isLoadingPokemon || $apiCreatePokemon.isLoading || $apiUpdatePokemon.isLoading || $apiDeletePokemon.isLoading && <Loader.FullScreen />}
      </div>
      <ModalCreatePokemon
        mode={selectedPokemon ? 'update' : 'create'}
        initialData={selectedPokemon ? (({ id, ...rest }) => rest)(selectedPokemon) : undefined}
        handleSubmit={selectedPokemon ? handleUpdatePokemon : handleCreatePokemon}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </Fragment>
  )
}
