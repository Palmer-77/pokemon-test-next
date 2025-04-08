'use client'

import {
  ColumnDef,
  CoreOptions,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Header,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  Updater,
  useReactTable,
} from '@tanstack/react-table'
import { useTranslations } from 'next-intl'
import { ThHTMLAttributes, useEffect, useMemo, useState } from 'react'

import { Button, Checkbox, Skeleton } from '@/components/ui'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DEFAULT_PAGE_SIZE_OPTIONS } from '@/constants/datatable'
import CharacterEmptyIcon from '~icons/dl/character-empty.jsx'
import SortAscIcon from '~icons/dl/sort-asc.jsx'
import SortDescIcon from '~icons/dl/sort-desc.jsx'
import SortNoneIcon from '~icons/dl/sort-none.jsx'

import { PageSizeSwitcher } from './PageSizeSwitcher'
import { Pagination } from './Pagination'
import { cn } from '@/lib/utils'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  sorting?: SortingState
  setSorting?: (sorting: SortingState) => void
  pagination?: PaginationState
  setPagination?: (pagination: PaginationState) => void
  pageSizeOptions?: number[]
  totalPages?: number
  showPageSize?: boolean
  showPagination?: boolean
  isLoading?: boolean
  selectable?: boolean
  isSelectable?: (_row: Row<TData>) => boolean
  rowSelection?: RowSelectionState
  setRowSelection?: (_rowSelection: Updater<RowSelectionState>) => void
  getRowId?: CoreOptions<TData>['getRowId']
  manualPagination?: boolean
  manualSorting?: boolean
}

export function RenderHeader<TData, TValue>({ column, getContext }: Header<TData, TValue>) {
  const isSortable = column.columnDef.enableSorting
  const sortDirection = column.getIsSorted()

  if (isSortable) {
    return (
      <Button
        type="button"
        variant="link"
        className="p-0 hover:no-underline space-x-1"
        onClick={() => column.toggleSorting(undefined, true)}
      >
        <span className="font-bold text-t-secondary">{flexRender(column.columnDef.header, getContext())}</span>
        {sortDirection === 'asc' ? (
          <SortAscIcon className="size-4 text-t-secondary" />
        ) : sortDirection === 'desc' ? (
          <SortDescIcon className="size-4 text-t-secondary" />
        ) : (
          <SortNoneIcon className="size-4 text-t-secondary " />
        )}
      </Button>
    )
  }

  return <span>{flexRender(column.columnDef.header, getContext())}</span>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  sorting,
  setSorting,
  pagination,
  setPagination,
  totalPages,
  showPageSize = false,
  showPagination = false,
  isLoading = false,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  isFilter = false,
  enableMultiSort = false,
  selectable = false,
  isSelectable,
  rowSelection,
  setRowSelection,
  getRowId,
  manualPagination = true,
  manualSorting = true,
  getDeletedRow,
}: DataTableProps<TData, TValue> & {
  isFilter?: boolean
  enableMultiSort?: boolean
  getDeletedRow?: (_row: Row<TData>) => boolean
}) {
  const t = useTranslations()

  const formattedColumns = useMemo(() => {
    const formatted = [] as ColumnDef<TData, TValue>[]

    if (selectable) {
      formatted.push({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="translate-y-[2px] bg-s-primary border-b-primary data-[state=checked]:border-0 disabled:bg-s-secondary disabled:border-b-disabled"
          />
        ),
        cell: ({ row }) => {
          const selectable = isSelectable?.(row) ?? true

          return (
            <div className="text-center">
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                disabled={!selectable}
                aria-label="Select row"
                className="translate-y-[2px] bg-s-primary border-b-primary data-[state=checked]:border-0 disabled:bg-s-secondary disabled:border-b-disabled"
              />
            </div>
          )
        },
        enableSorting: false,
        enableHiding: false,
        size: 32,
        meta: {
          align: 'center',
        },
      })
    }

    formatted.push(...columns)

    return formatted
  }, [columns, selectable, t])

  const table = useReactTable({
    data,
    columns: formattedColumns,
    getCoreRowModel: getCoreRowModel(),
    state: { sorting, pagination, rowSelection },
    manualSorting,
    enableMultiSort: enableMultiSort,
    onSortingChange: (updater) => {
      if (!setSorting || !sorting) return

      const newSortingValue = typeof updater === 'function' ? updater(sorting) : updater

      setSorting?.(newSortingValue)
    },
    manualPagination,
    onPaginationChange: (updater) => {
      if (!setPagination || !pagination) return

      const newPaginationValue = typeof updater === 'function' ? updater(pagination) : updater

      if (newPaginationValue.pageSize !== pagination.pageSize) {
        newPaginationValue.pageIndex = 0
      }

      setPagination?.(newPaginationValue)
    },
    enableRowSelection: isSelectable ?? true,
    onRowSelectionChange: (updater) => {
      if (!setRowSelection || !rowSelection) return

      const newSelection = typeof updater === 'function' ? updater(rowSelection) : updater

      setRowSelection?.(newSelection)
    },
    getRowId,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              data-role="header"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    align={
                      (header.column.columnDef.meta as Record<string, string>)?.align as ThHTMLAttributes<'th'>['align']
                    }
                  >
                    {header.isPlaceholder ? null : <RenderHeader {...header} />}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow
                key={`loading-${index}`}
                data-state="loading"
              >
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <Skeleton className="h-6 rounded" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className={cn(getDeletedRow?.(row) && 'line-through')}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow data-role="no-result">
              <TableCell
                colSpan={columns.length}
                className="p-8 text-center hover:bg-s-primary"
              >
                <span className="text-sm font-semibold text-t-secondary">
                  {isFilter ? t('common.components.datatable.no_results') : t('common.components.datatable.empty')}
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mt-6 flex justify-between">
        <div data-id="page-size-switcher">
          {showPageSize && (
            <PageSizeSwitcher
              options={pageSizeOptions}
              initialPageSize={table.getState().pagination.pageSize}
              onPageSizeChange={(pageSize) => {
                table.setPageSize(pageSize)
              }}
            />
          )}
        </div>
        <div data-id="pagination">
          {showPagination && (
            <Pagination
              currentPage={table.getState().pagination.pageIndex + 1}
              totalPages={totalPages || 0}
              onPageChange={(pageIndex) => {
                table.setPageIndex(pageIndex - 1)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
