import { DEFAULT_PAGE_SIZE_OPTIONS } from '@/constants/datatable'
import { ColumnDef, CoreOptions, PaginationState, Row, RowSelectionState, SortingState } from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'


type DataTableState = {
  sorting: SortingState
  pagination: {
    page: number
    pageSize: number
  }
  selectedRows: RowSelectionState
}

type UseDataTableOptions<TData, TValue = any> = {
  sorting?: SortingState
  columns?: ColumnDef<TData, TValue>[]
  initialPageSize?: number
  initialPage?: number
  data?: TData[]
  isLoading?: boolean
  showPageSize?: boolean
  pageSizeOptions?: number[]
  showPagination?: boolean
  enableMultiSort?: boolean
  manualPagination?: boolean
  manualSorting?: boolean
  selectable?: boolean
  selector?: RowSelectionState
  isSelectable?: (_row: Row<TData>) => boolean
  getRowId?: CoreOptions<TData>['getRowId']
}

export const useDataTable = <TData, TValue = any>({
  sorting = [],
  columns = [],
  data: initialData = [],
  isLoading = false,
  initialPage = 1,
  initialPageSize,
  showPageSize = false,
  showPagination = false,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  enableMultiSort = false,
  manualPagination = true,
  manualSorting = true,
  selectable = false,
  selector = {},
  isSelectable,
  getRowId,
}: UseDataTableOptions<TData, TValue>) => {
  const [totalPages, _setTotalPages] = useState<number>(0)
  const [sortingState, _setSortingSate] = useState<SortingState>(sorting)
  const [paginationState, _setPaginationState] = useState<PaginationState>({
    pageSize: initialPageSize ?? pageSizeOptions[0],
    pageIndex: initialPage - 1,
  })
  const [rowSelectionState, _setRowSelection] = useState<RowSelectionState>(selector)
  const [data, _setData] = useState(initialData)

  const state = useMemo<DataTableState>(
    () => ({
      sorting: sortingState,
      pagination: {
        page: paginationState.pageIndex + 1,
        pageSize: paginationState.pageSize,
        totalPages,
      },
      selectedRows: rowSelectionState,
    }),
    [sortingState, paginationState, totalPages, rowSelectionState],
  )

  const setTotalPages = useCallback(
    (totalPages: number) => {
      _setTotalPages(totalPages)
    },
    [_setTotalPages],
  )

  const dataTableProps = useMemo(
    () => ({
      columns,
      data,
      sorting: sortingState,
      setSorting: _setSortingSate,
      pagination: paginationState,
      setPagination: _setPaginationState,
      rowSelection: rowSelectionState,
      setRowSelection: _setRowSelection,
      totalPages,
      isLoading,
      showPageSize,
      showPagination,
      pageSizeOptions,
      enableMultiSort,
      manualPagination,
      manualSorting,
      selectable,
      isSelectable,
      getRowId,
    }),
    [
      columns,
      data,
      isLoading,
      sortingState,
      paginationState,
      totalPages,
      showPageSize,
      showPagination,
      pageSizeOptions,
      enableMultiSort,
      manualPagination,
      manualSorting,
      rowSelectionState,
      selectable,
    ],
  )

  const setData = useCallback((newData: TData[]) => {
    _setData(newData)
  }, [])

  const setPagination = useCallback(
    (newPagination: PaginationState) => {
      _setPaginationState(newPagination)
    },
    [_setPaginationState],
  )

  const setRowSelection = useCallback(
    (newRowSelection: RowSelectionState) => {
      _setRowSelection(newRowSelection)
    },
    [_setRowSelection],
  )

  return {
    setTotalPages,
    dataTableProps,
    state,
    setData,
    setPagination,
    setRowSelection,
  }
}
