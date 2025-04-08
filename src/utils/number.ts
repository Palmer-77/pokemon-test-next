export const formatPrice = (amount: number): string => {
  return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatNumber = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatTableNumber = ({
  index,
  pageSize,
  pageIndex,
}: {
  index: number
  pageSize: number
  pageIndex: number
}): number => {
  return index + pageSize * pageIndex
}

export const formatPhoneNumber = (phone: string, mask: boolean = false) => {
  const phoneNumberRegex = /(\d{3})(\d{3})(\d{4})/
  const match = phone.match(phoneNumberRegex)
  if (!match) {
    return phone
  }

  const formatted = `${match[1]}-${match[2]}-${match[3]}`

  return mask ? '***-***-' + match[3] : formatted
}
