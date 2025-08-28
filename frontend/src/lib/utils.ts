import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterDateData<T extends object>(data: T, activeLabel: string = '') {
  const filterDayData = Object
    .entries(data ?? {})
    .find((item) => {
      const [month] = item
      return month.slice(0, 3) === activeLabel
    })?.[1]

  const dateData = filterDayData.data.map((item: any) => ({
    ...item,
    total: item.desktop + item.mobile,
  }))

  return dateData ?? []
}

export const timeUtils = {
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
}
