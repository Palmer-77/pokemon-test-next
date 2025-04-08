export type PaginatedResponse<DataType = any, MetaType = Record<string, any>> = {
  message: string
  data: DataType[]
  meta: MetaType
}

export type DataResponse<DataType = any> = {
  data: DataType
}

export type DlResponse<T> = {
  code: string
  data: T
}
