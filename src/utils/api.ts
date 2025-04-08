import { SortingState } from '@tanstack/react-table'

export const datatableSortingStateToQuery = (sort?: SortingState) => {
  return sort?.length ? sort.map(({ id, desc }) => `${desc ? '-' : '+'}${id}`).join(',') : undefined
}

export const getOrderState = (sort?: SortingState) => {
  console.log(sort)

  return sort?.length ? sort[0]?.id : undefined
}
