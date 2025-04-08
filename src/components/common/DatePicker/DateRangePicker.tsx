// Tremor Raw Date Picker [v1.0.2]

'use client'

import { Time } from '@internationalized/date'
import { AriaTimeFieldProps, TimeValue, useDateSegment, useTimeField } from '@react-aria/datepicker'
import { type DateFieldState, type DateSegment, useTimeFieldState } from '@react-stately/datepicker'
import { format, type Locale } from 'date-fns'
import { enUS, th } from 'date-fns/locale'
import { useLocale, useTranslations } from 'next-intl'
import {
  ComponentProps,
  ElementRef,
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { tv, VariantProps } from 'tailwind-variants'

import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import { cn, focusInput, focusRing, hasErrorInput } from '@/lib/utils'
import TimeIcon from '~icons/dl/time-icon'
import IcRoundMinus from '~icons/ic/round-minus.jsx'

import { Calendar as CalendarPrimitive, type Matcher } from './Calendar'

const useCalendarLocale = (): Locale => {
  const locale = useLocale()
  return locale === 'th'
    ? {
      ...th,
      localize: {
        ...th.localize,
        // @ts-ignore
        preprocessor: (date: Date, parts: Array<{ isToken: boolean; value: string }>) => {
          const yearIndex = parts.findIndex((part) => ['yyyy', 'yyy'].includes(part.value))
          if (yearIndex > -1) {
            parts[yearIndex] = { isToken: false, value: `${date.getFullYear() + 543}` }
          }
          return parts
        },
      },
    }
    : enUS
}

type TimeSegmentProps = {
  segment: DateSegment
  state: DateFieldState
}

const TimeSegment = ({ segment, state }: TimeSegmentProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const { segmentProps } = useDateSegment(segment, state, ref)

  const isColon = segment.type === 'literal' && segment.text === ':'
  const isSpace = segment.type === 'literal' && segment.text === ' '

  const isDecorator = isColon || isSpace

  return (
    <div
      {...segmentProps}
      ref={ref}
      aria-invalid={isDecorator ? 'false' : state.isInvalid}
      className={cn(
        // base
        'relative block w-full appearance-none rounded-md border px-2.5 py-1.5 text-left uppercase tabular-nums shadow-sm outline-none transition sm:text-sm',
        // border color
        'border-b-primary dark:border-b-primary',
        // text color
        'text-gray-900 dark:text-gray-50',
        // background color
        'bg-s-input dark:bg-s-input',
        // focus
        focusInput,
        // invalid (optional)
        'aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 group-aria-[invalid=true]/time-input:border-red-500 group-aria-[invalid=true]/time-input:ring-2 group-aria-[invalid=true]/time-input:ring-red-200 group-aria-[invalid=true]/time-input:dark:ring-red-400/20',
        {
          '!w-fit border-none bg-transparent px-0 text-gray-400 shadow-none': isDecorator,
          hidden: isSpace,
          'border-b-primary bg-gray-100 text-gray-400 dark:border-b-primary dark:bg-gray-800 dark:text-gray-500':
            state.isDisabled,
          '!bg-transparent !text-gray-400': !segment.isEditable,
        },
      )}
    >
      <span
        aria-hidden="true"
        className={cn('pointer-events-none block w-full text-left text-gray-700 sm:text-sm', {
          hidden: !segment.isPlaceholder,
          'h-0': !segment.isPlaceholder,
        })}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? '' : segment.text}
    </div>
  )
}

type TimeInputProps = Omit<
  AriaTimeFieldProps<TimeValue>,
  'label' | 'shouldForceLeadingZeros' | 'description' | 'errorMessage'
>

const TimeInput = forwardRef<HTMLDivElement, TimeInputProps>(({ hourCycle, ...props }: TimeInputProps, ref) => {
  const innerRef = useRef<HTMLDivElement>(null)

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => innerRef?.current)

  const locale = window !== undefined ? window.navigator.language : 'en-US'

  const state = useTimeFieldState({
    hourCycle: hourCycle,
    locale: locale,
    shouldForceLeadingZeros: true,
    autoFocus: true,
    ...props,
  })

  const { fieldProps } = useTimeField(
    {
      ...props,
      hourCycle: hourCycle,
      shouldForceLeadingZeros: true,
    },
    state,
    innerRef,
  )

  return (
    <div
      {...fieldProps}
      ref={innerRef}
      className="group/time-input inline-flex w-full gap-x-2"
    >
      {state.segments.map((segment, i) => (
        <TimeSegment
          key={i}
          segment={segment}
          state={state}
        />
      ))}
    </div>
  )
})
TimeInput.displayName = 'TimeInput'

//#region Trigger
// ============================================================================

const triggerStyles = tv({
  base: [
    // base
    'flex items-center gap-x-2 w-full appearance-none truncate sm:text-sm font-normal',
    // 'peer flex w-full cursor-pointer appearance-none items-center gap-x-2 truncate rounded-md border px-3 py-2 shadow-sm outline-none transition-all sm:text-sm',
    // background color
    'flex h-10 w-full rounded-md border border-b-primary bg-s-input px-3 py-2 text-sm ring-offset-b-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-t-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    // border color
    'ring-ring ring-offset-2 focus:ring-2',
    // 'border-gray-300 dark:border-gray-800',
    // text color
    // 'text-gray-900 dark:text-gray-50',
    // placeholder color
    // 'placeholder-gray-400 dark:placeholder-gray-500',
    // hover
    // 'hover:bg-gray-50 hover:dark:bg-gray-950/50',
    // disabled
    // 'disabled:pointer-events-none',
    // 'disabled:bg-gray-100 disabled:text-gray-400',
    // 'disabled:dark:border-gray-800 disabled:dark:bg-gray-800 disabled:dark:text-gray-500',
    // focus
    // focusInput,
    // invalid (optional)
    // "aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
  ],
  variants: {
    hasError: {
      true: hasErrorInput,
    },
  },
})

type TriggerProps = ComponentProps<'button'> &
  VariantProps<typeof triggerStyles> & {
    placeholder?: string
    placeholderLabel?: string
  }

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ className, children, placeholder, placeholderLabel, hasError, ...props }, forwardedRef) => {
    return (
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          ref={forwardedRef}
          className={cn(triggerStyles({ hasError }), className)}
          {...props}
        >
          <span className="flex flex-col flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left text-gray-900 dark:text-gray-50">
            {placeholderLabel ? (
              <>
                <span className="text-t-placeholder">{placeholderLabel}</span>
                {children ?? null}
              </>
            ) : (
              <>
                {children ? children : placeholder ? <span className="text-t-placeholder">{placeholder}</span> : null}
              </>
            )}
          </span>
          <TimeIcon className="size-6 shrink-0 text-gray-400 dark:text-gray-600" />
        </Button>
      </PopoverTrigger>
    )
  },
)

Trigger.displayName = 'DatePicker.Trigger'

//#region Popover
// ============================================================================

const CalendarPopover = forwardRef<ElementRef<typeof PopoverContent>, ComponentProps<typeof PopoverContent>>(
  ({ align, className, children, ...props }, forwardedRef) => {
    return (
      <PopoverContent
        ref={forwardedRef}
        sideOffset={10}
        side="bottom"
        align={align}
        avoidCollisions
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          // base
          'relative z-50 w-fit rounded-md border text-sm shadow-xl shadow-black/[2.5%] p-0',
          // widths
          'min-w-[calc(var(--radix-select-trigger-width)-2px)] max-w-[95vw]',
          // border color
          'border-gray-200 dark:border-gray-800',
          // background color
          'bg-white dark:bg-gray-950',
          // transition
          'will-change-[transform,opacity]',
          'data-[state=closed]:animate-hide',
          'data-[state=open]:data-[side=bottom]:animate-slideDownAndFade data-[state=open]:data-[side=left]:animate-slideLeftAndFade data-[state=open]:data-[side=right]:animate-slideRightAndFade data-[state=open]:data-[side=top]:animate-slideUpAndFade',
          className,
        )}
        {...props}
      >
        {children}
      </PopoverContent>
    )
  },
)

CalendarPopover.displayName = 'DatePicker.CalendarPopover'

//#region Preset
// ============================================================================

export type DateRange = {
  from: Date | undefined
  to?: Date | undefined
}

interface Preset {
  label: string
}

interface DatePreset extends Preset {
  date: Date
}

interface DateRangePreset extends Preset {
  dateRange: DateRange
}

type PresetContainerProps<TPreset extends Preset, TValue> = {
  presets: TPreset[]
  onSelect: (value: TValue) => void
  currentValue?: TValue
}

const PresetContainer = <TPreset extends Preset, TValue>({
  // Available preset configurations
  presets,
  // Event handler when a preset is selected
  onSelect,
  // Currently selected preset
  currentValue,
}: PresetContainerProps<TPreset, TValue>) => {
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isDateRangePresets = (preset: any): preset is DateRangePreset => {
    return 'dateRange' in preset
  }
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isDatePresets = (preset: any): preset is DatePreset => {
    return 'date' in preset
  }

  const handleClick = (preset: TPreset) => {
    if (isDateRangePresets(preset)) {
      onSelect(preset.dateRange as TValue)
    } else if (isDatePresets(preset)) {
      onSelect(preset.date as TValue)
    }
  }

  const compareDates = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const compareRanges = (range1: DateRange, range2: DateRange) => {
    const from1 = range1.from
    const from2 = range2.from

    let equalFrom = false

    if (from1 && from2) {
      const sameFrom = compareDates(from1, from2)

      if (sameFrom) {
        equalFrom = true
      }
    }

    const to1 = range1.to
    const to2 = range2.to

    let equalTo = false

    if (to1 && to2) {
      const sameTo = compareDates(to1, to2)

      if (sameTo) {
        equalTo = true
      }
    }

    return equalFrom && equalTo
  }

  const matchesCurrent = (preset: TPreset) => {
    if (isDateRangePresets(preset)) {
      const value = currentValue as DateRange | undefined

      return value && compareRanges(value, preset.dateRange)
    } else if (isDatePresets(preset)) {
      const value = currentValue as Date | undefined

      return value && compareDates(value, preset.date)
    }

    return false
  }

  return (
    <ul
      role="list"
      className="flex items-start gap-x-2 sm:flex-col"
    >
      {presets.map((preset, index) => {
        return (
          <li
            key={index}
            className="sm:w-full sm:py-px"
          >
            <button
              title={preset.label}
              className={cn(
                // base
                'relative w-full overflow-hidden text-ellipsis whitespace-nowrap rounded border px-2.5 py-1.5 text-left text-base shadow-sm outline-none transition-all sm:border-none sm:py-2 sm:text-sm sm:shadow-none',
                // text color
                'text-gray-700 dark:text-gray-300',
                // border color
                'border-gray-200 dark:border-gray-800',
                // focus
                focusRing,
                // background color
                'focus-visible:bg-gray-100 focus-visible:dark:bg-gray-900',
                'hover:bg-gray-100 hover:dark:bg-gray-900',
                {
                  'bg-gray-100 dark:bg-gray-900': matchesCurrent(preset),
                },
              )}
              onClick={() => handleClick(preset)}
              aria-label={`Select ${preset.label}`}
            >
              <span>{preset.label}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

PresetContainer.displayName = 'DatePicker.PresetContainer'

//#region Date Picker Shared
// ============================================================================

const formatDate = (date: Date, locale: Locale, includeTime?: boolean): string => {
  let dateString: string

  const formatStrings: Record<string, any> = {
    'en-US': {
      datetime: 'dd MMM yyyy HH:mm',
      date: 'dd MMM yyyy',
    },
    th: {
      datetime: 'dd MMM yyyy HH:mm น.',
      date: 'dd MMM yyyy',
    },
  }

  if (includeTime) {
    dateString = format(date, formatStrings[locale.code!].datetime, { locale })
  } else {
    dateString = format(date, formatStrings[locale.code!].date, { locale })
  }

  return dateString
}

type CalendarProps = {
  fromYear?: number
  toYear?: number
  fromMonth?: Date
  toMonth?: Date
  fromDay?: Date
  toDay?: Date
  fromDate?: Date
  toDate?: Date
  locale?: Locale
}

type Translations = {
  cancel?: string
  apply?: string
  start?: string
  end?: string
  range?: string
}

interface PickerProps extends CalendarProps {
  className?: string
  disabled?: boolean
  disabledDays?: Matcher | Matcher[] | undefined
  required?: boolean
  showTimePicker?: boolean
  placeholder?: string
  enableYearNavigation?: boolean
  disableNavigation?: boolean
  hasError?: boolean
  id?: string
  // Customize the date picker for different languages.
  translations?: Translations
  align?: 'center' | 'end' | 'start'
  'aria-invalid'?: boolean
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-required'?: boolean
  placeholderLabel?: string
}

//#region Single Date Picker
// ============================================================================

interface SingleProps extends Omit<PickerProps, 'translations'> {
  presets?: DatePreset[]
  defaultValue?: Date
  value?: Date
  onChange?: (date: Date | undefined) => void
  translations?: Omit<Translations, 'range'>
  clearable?: boolean
}

const SingleDatePicker = ({
  defaultValue,
  value,
  onChange,
  presets,
  disabled,
  disabledDays,
  disableNavigation,
  className,
  showTimePicker,
  placeholder,
  hasError,
  translations,
  enableYearNavigation = false,
  locale = enUS,
  align = 'center',
  clearable = false,
  ...props
}: SingleProps) => {
  const t = useTranslations()

  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(value ?? defaultValue ?? undefined)
  const [month, setMonth] = useState<Date | undefined>(date)

  const [time, setTime] = useState<TimeValue>(
    value
      ? new Time(value.getHours(), value.getMinutes())
      : defaultValue
        ? new Time(defaultValue.getHours(), defaultValue.getMinutes())
        : new Time(0, 0),
  )

  const initialDate = useMemo(() => {
    return date
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    setDate(value ?? defaultValue ?? undefined)
  }, [value, defaultValue])

  useEffect(() => {
    if (date) {
      setMonth(date)
    }
  }, [date])

  useEffect(() => {
    if (!open) {
      setMonth(date)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onCancel = () => {
    setDate(initialDate)
    setTime(initialDate ? new Time(initialDate.getHours(), initialDate.getMinutes()) : new Time(0, 0))
    setOpen(false)
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onCancel()
    }

    setOpen(open)
  }

  const onDateChange = (date: Date | undefined) => {
    const newDate = date
    if (showTimePicker) {
      if (newDate && !time) {
        setTime(new Time(0, 0))
      }
      if (newDate && time) {
        newDate.setHours(time.hour)
        newDate.setMinutes(time.minute)
      }
    }
    setDate(newDate)
  }

  const onTimeChange = (time: TimeValue | null) => {
    if (time) {
      setTime(time)
    }


    if (!date) {
      return
    }

    const newDate = new Date(date.getTime())

    if (!time) {
      newDate.setHours(0)
      newDate.setMinutes(0)
    } else {
      newDate.setHours(time.hour)
      newDate.setMinutes(time.minute)
    }

    setDate(newDate)
  }

  const formattedDate = useMemo(() => {
    if (!date) {
      return null
    }

    return formatDate(date, locale, showTimePicker)
  }, [date, locale, showTimePicker])

  const onApply = () => {
    setOpen(false)
    onChange?.(date)
  }

  const onClear = () => {
    setDate(undefined)
    setTime(new Time(0, 0))
    setOpen(false)
    onChange?.(undefined)
  }

  useEffect(() => {
    setDate(value ?? defaultValue ?? undefined)
    setTime(
      value
        ? new Time(value.getHours(), value.getMinutes())
        : defaultValue
          ? new Time(defaultValue.getHours(), defaultValue.getMinutes())
          : new Time(0, 0),
    )
  }, [value, defaultValue])

  return (
    <Popover
      open={open}
      onOpenChange={onOpenChange}
    >
      <Trigger
        placeholder={placeholder || t('common.components.date_picker.select_date_placeholder')}
        disabled={disabled}
        className={className}
        hasError={hasError}
        aria-required={props.required || props['aria-required']}
        aria-invalid={props['aria-invalid']}
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
      >
        {formattedDate}
      </Trigger>
      <CalendarPopover align={align}>
        <div className="flex">
          <div className="flex flex-col sm:flex-row sm:items-start">
            {presets && presets.length > 0 && (
              <div
                className={cn(
                  'relative flex h-14 w-full items-center sm:h-full sm:w-40',
                  'border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-800',
                  'overflow-auto',
                )}
              >
                <div className="absolute px-2 pr-2 sm:inset-0 sm:left-0 sm:py-2">
                  <PresetContainer
                    currentValue={date}
                    presets={presets}
                    onSelect={onDateChange}
                  />
                </div>
              </div>
            )}
            <div>
              <CalendarPrimitive
                mode="single"
                month={month}
                onMonthChange={setMonth}
                selected={date}
                onSelect={onDateChange}
                disabled={disabledDays}
                locale={locale}
                enableYearNavigation={enableYearNavigation}
                disableNavigation={disableNavigation}
                initialFocus
                {...props}
              />
              {showTimePicker && (
                <div className="border-t border-gray-200 p-3 dark:border-gray-800">
                  <TimeInput
                    aria-label="Time"
                    onChange={onTimeChange}
                    isDisabled={!date}
                    value={time}
                    isRequired={props.required}
                    hourCycle={24}
                  />
                </div>
              )}
              <div className="flex items-center gap-x-2 border-t border-gray-200 p-3 dark:border-gray-800">
                <Button
                  variant="outline"
                  className="h-8 w-full"
                  type="button"
                  onClick={() => {
                    clearable ? onClear() : onCancel()
                  }}
                >
                  {clearable ? t('buttons.clear') : (translations?.cancel ?? t('buttons.cancel'))}
                </Button>
                <Button
                  variant="default"
                  className="h-8 w-full"
                  type="button"
                  onClick={onApply}
                >
                  {translations?.apply ?? t('buttons.confirm')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CalendarPopover>
    </Popover>
  )
}

interface RangeProps extends PickerProps {
  presets?: DateRangePreset[]
  defaultValue?: DateRange
  value?: DateRange
  onChange?: (dateRange: DateRange | undefined) => void
  clearable?: boolean
}

const RangeDatePicker = ({
  defaultValue,
  value,
  onChange,
  presets,
  disabled,
  disableNavigation,
  disabledDays,
  enableYearNavigation = false,
  locale = enUS,
  showTimePicker,
  placeholder,
  placeholderLabel,
  hasError,
  translations,
  align = 'center',
  className,
  clearable = false,
  ...props
}: RangeProps) => {
  const t = useTranslations()

  const [open, setOpen] = useState(false)
  const [range, setRange] = useState<DateRange | undefined>(value ?? defaultValue ?? undefined)
  const [month, setMonth] = useState<Date | undefined>(range?.from)

  const [isTimeInvalid, setIsTimeInvalid] = useState(false)

  const [startTime, setStartTime] = useState<TimeValue>(
    value?.from
      ? new Time(value.from.getHours(), value.from.getMinutes())
      : defaultValue?.from
        ? new Time(defaultValue.from.getHours(), defaultValue.from.getMinutes())
        : new Time(0, 0),
  )
  const [endTime, setEndTime] = useState<TimeValue>(
    value?.to
      ? new Time(value.to.getHours(), value.to.getMinutes())
      : defaultValue?.to
        ? new Time(defaultValue.to.getHours(), defaultValue.to.getMinutes())
        : new Time(0, 0),
  )

  const initialRange = useMemo(() => {
    return range
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    setRange(value ?? defaultValue ?? undefined)
  }, [value, defaultValue])

  useEffect(() => {
    if (range) {
      setMonth(range.from)
    }
  }, [range])

  useEffect(() => {
    if (!open) {
      setMonth(range?.from)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onRangeChange = (range: DateRange | undefined) => {
    if (isTimeInvalid) {
      setIsTimeInvalid(false)
    }

    const newRange = range
    if (showTimePicker) {
      if (newRange?.from && !startTime) {
        setStartTime(new Time(0, 0))
      }

      if (newRange?.to && !endTime) {
        setEndTime(new Time(0, 0))
      }

      if (newRange?.from && startTime) {
        newRange.from.setHours(startTime.hour)
        newRange.from.setMinutes(startTime.minute)
      }

      if (newRange?.to && endTime) {
        newRange.to.setHours(endTime.hour)
        newRange.to.setMinutes(endTime.minute)
      }
    }

    setRange(newRange)
  }

  const onCancel = () => {
    setRange(initialRange)
    setStartTime(
      initialRange?.from ? new Time(initialRange.from.getHours(), initialRange.from.getMinutes()) : new Time(0, 0),
    )
    setEndTime(initialRange?.to ? new Time(initialRange.to.getHours(), initialRange.to.getMinutes()) : new Time(0, 0))
    setOpen(false)
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onCancel()
    }

    setOpen(open)
  }

  const onTimeChange = (time: TimeValue, pos: 'start' | 'end') => {
    if (isTimeInvalid) {
      setIsTimeInvalid(false)
    }

    switch (pos) {
      case 'start':
        setStartTime(time)
        break
      case 'end':
        setEndTime(time)
        break
    }

    if (!range) {
      return
    }

    if (pos === 'start') {
      if (!range.from) {
        return
      }

      const newDate = new Date(range.from.getTime())

      if (!time) {
        newDate.setHours(0)
        newDate.setMinutes(0)
      } else {
        newDate.setHours(time.hour)
        newDate.setMinutes(time.minute)
      }

      setRange({
        ...range,
        from: newDate,
      })
    }

    if (pos === 'end') {
      if (!range.to) {
        return
      }

      const newDate = new Date(range.to.getTime())

      if (!time) {
        newDate.setHours(0)
        newDate.setMinutes(0)
      } else {
        newDate.setHours(time.hour)
        newDate.setMinutes(time.minute)
      }

      setRange({
        ...range,
        to: newDate,
      })
    }
  }

  useEffect(() => {
    setRange(value ?? defaultValue ?? undefined)

    setStartTime(
      value?.from
        ? new Time(value.from.getHours(), value.from.getMinutes())
        : defaultValue?.from
          ? new Time(defaultValue.from.getHours(), defaultValue.from.getMinutes())
          : new Time(0, 0),
    )
    setEndTime(
      value?.to
        ? new Time(value.to.getHours(), value.to.getMinutes())
        : defaultValue?.to
          ? new Time(defaultValue.to.getHours(), defaultValue.to.getMinutes())
          : new Time(0, 0),
    )
  }, [value, defaultValue])

  const displayRange = useMemo(() => {
    if (!range) {
      return null
    }

    return `${range.from ? formatDate(range.from, locale, showTimePicker) : ''} - ${range.to ? formatDate(range.to, locale, showTimePicker) : ''
      }`
  }, [range, locale, showTimePicker])

  const validateDateTimeRange = useCallback((range?: DateRange) => {
    if (!range) return true
    const fromValue = range.from?.valueOf() ?? 0
    const toValue = range.to?.valueOf() ?? 0
    if (fromValue > toValue) return false
    return true
  }, [])

  const onApply = () => {
    if (!validateDateTimeRange(range)) {
      setIsTimeInvalid(true)
      return
    }
    setOpen(false)
    onChange?.(range)
  }

  const onClear = () => {
    setRange(undefined)
    setStartTime(new Time(0, 0))
    setEndTime(new Time(0, 0))
    setOpen(false)
    onChange?.(undefined)
  }

  return (
    <Popover
      open={open}
      onOpenChange={onOpenChange}
    >
      <Trigger
        placeholder={placeholder || t('common.components.date_picker.select_date_range_placeholder')}
        placeholderLabel={placeholderLabel}
        disabled={disabled}
        className={className}
        hasError={hasError}
        aria-required={props.required || props['aria-required']}
        aria-invalid={props['aria-invalid']}
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
      >
        {displayRange}
      </Trigger>
      <CalendarPopover align={align}>
        <div className="flex">
          <div className="flex flex-col overflow-x-scroll no-scrollbar sm:flex-row sm:items-start">
            {presets && presets.length > 0 && (
              <div
                className={cn(
                  'relative flex h-16 w-full items-center sm:h-full sm:w-40',
                  'border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-800',
                  'overflow-auto',
                )}
              >
                <div className="absolute px-3 sm:inset-0 sm:left-0 sm:p-2">
                  <PresetContainer
                    currentValue={range}
                    presets={presets}
                    onSelect={onRangeChange}
                  />
                </div>
              </div>
            )}
            <div className="overflow-x-scroll no-scrollbar">
              <CalendarPrimitive
                mode="range"
                selected={range}
                onSelect={onRangeChange}
                month={month}
                onMonthChange={setMonth}
                numberOfMonths={2}
                disabled={disabledDays}
                disableNavigation={disableNavigation}
                enableYearNavigation={enableYearNavigation}
                locale={locale}
                initialFocus
                className="overflow-x-scroll no-scrollbar"
                classNames={{
                  months: 'flex flex-row divide-x divide-gray-200 dark:divide-gray-800 overflow-x-scroll no-scrollbar',
                }}
                {...props}
              />
              {showTimePicker && (
                <div className="flex items-center justify-evenly gap-x-3 border-t border-gray-200 p-3 dark:border-gray-800 overflow-x-scroll no-scrollbar">
                  <div className="flex flex-1 items-center gap-x-2">
                    <span className="dark:text-gray-30 text-gray-700 w-12 shrink-0">
                      {translations?.start ?? t('common.components.date_picker.start_label')}:
                    </span>
                    <TimeInput
                      value={startTime}
                      onChange={(v) => v && onTimeChange(v, 'start')}
                      aria-label="Start date time"
                      isDisabled={!range?.from}
                      isRequired={props.required}
                      isInvalid={isTimeInvalid}
                      hourCycle={24}
                    />
                  </div>
                  <IcRoundMinus className="size-4 shrink-0 text-gray-400" />
                  <div className="flex flex-1 items-center gap-x-2">
                    <span className="dark:text-gray-30 text-gray-700 w-12 shrink-0">
                      {translations?.end ?? t('common.components.date_picker.end_label')}:
                    </span>
                    <TimeInput
                      value={endTime}
                      onChange={(v) => v && onTimeChange(v, 'end')}
                      aria-label="End date time"
                      isDisabled={!range?.to}
                      isRequired={props.required}
                      isInvalid={isTimeInvalid}
                      hourCycle={24}
                    />
                  </div>
                </div>
              )}
              <div className="border-t border-gray-200 p-3 sm:flex sm:items-center sm:justify-between dark:border-gray-800">
                <p className="tabular-nums text-gray-900 dark:text-gray-50">
                  {!!displayRange && (
                    <Fragment>
                      <span className="text-gray-700 dark:text-gray-300">
                        {translations?.range ?? t('common.components.date_picker.range_label')}
                      </span>{' '}
                      <span className="font-medium">{displayRange}</span>
                    </Fragment>
                  )}
                </p>
                <div className="mt-2 flex items-center gap-x-2 sm:mt-0">
                  <Button
                    variant="outline"
                    className="h-8 w-full sm:w-fit"
                    type="button"
                    onClick={() => {
                      clearable ? onClear() : onCancel()
                    }}
                  >
                    {clearable ? t('buttons.clear') : (translations?.cancel ?? t('buttons.cancel'))}
                  </Button>
                  <Button
                    variant="default"
                    className="h-8 w-full sm:w-fit"
                    type="button"
                    onClick={onApply}
                  >
                    {translations?.apply ?? t('buttons.confirm')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CalendarPopover>
    </Popover>
  )
}

const validatePresets = (presets: DateRangePreset[] | DatePreset[], rules: PickerProps) => {
  const { toYear, fromYear, fromMonth, toMonth, fromDay, toDay } = rules

  if (presets && presets.length > 0) {
    const fromYearToUse = fromYear
    const toYearToUse = toYear

    presets.forEach((preset) => {
      if ('date' in preset) {
        const presetYear = preset.date.getFullYear()

        if (fromYear && presetYear < fromYear) {
          throw new Error(`Preset ${preset.label} is before fromYear ${fromYearToUse}.`)
        }

        if (toYear && presetYear > toYear) {
          throw new Error(`Preset ${preset.label} is after toYear ${toYearToUse}.`)
        }

        if (fromMonth) {
          const presetMonth = preset.date.getMonth()

          if (presetMonth < fromMonth.getMonth()) {
            throw new Error(`Preset ${preset.label} is before fromMonth ${fromMonth}.`)
          }
        }

        if (toMonth) {
          const presetMonth = preset.date.getMonth()

          if (presetMonth > toMonth.getMonth()) {
            throw new Error(`Preset ${preset.label} is after toMonth ${toMonth}.`)
          }
        }

        if (fromDay) {
          const presetDay = preset.date.getDate()

          if (presetDay < fromDay.getDate()) {
            throw new Error(`Preset ${preset.label} is before fromDay ${fromDay}.`)
          }
        }

        if (toDay) {
          const presetDay = preset.date.getDate()

          if (presetDay > toDay.getDate()) {
            throw new Error(`Preset ${preset.label} is after toDay ${format(toDay, 'MMM dd, yyyy')}.`)
          }
        }
      }

      if ('dateRange' in preset) {
        const presetFromYear = preset.dateRange.from?.getFullYear()
        const presetToYear = preset.dateRange.to?.getFullYear()

        if (presetFromYear && fromYear && presetFromYear < fromYear) {
          throw new Error(`Preset ${preset.label}'s 'from' is before fromYear ${fromYearToUse}.`)
        }

        if (presetToYear && toYear && presetToYear > toYear) {
          throw new Error(`Preset ${preset.label}'s 'to' is after toYear ${toYearToUse}.`)
        }

        if (fromMonth) {
          const presetMonth = preset.dateRange.from?.getMonth()

          if (presetMonth && presetMonth < fromMonth.getMonth()) {
            throw new Error(`Preset ${preset.label}'s 'from' is before fromMonth ${format(fromMonth, 'MMM, yyyy')}.`)
          }
        }

        if (toMonth) {
          const presetMonth = preset.dateRange.to?.getMonth()

          if (presetMonth && presetMonth > toMonth.getMonth()) {
            throw new Error(`Preset ${preset.label}'s 'to' is after toMonth ${format(toMonth, 'MMM, yyyy')}.`)
          }
        }

        if (fromDay) {
          const presetDay = preset.dateRange.from?.getDate()

          if (presetDay && presetDay < fromDay.getDate()) {
            throw new Error(
              `Preset ${preset.dateRange.from}'s 'from' is before fromDay ${format(fromDay, 'MMM dd, yyyy')}.`,
            )
          }
        }

        if (toDay) {
          const presetDay = preset.dateRange.to?.getDate()

          if (presetDay && presetDay > toDay.getDate()) {
            throw new Error(`Preset ${preset.label}'s 'to' is after toDay ${format(toDay, 'MMM dd, yyyy')}.`)
          }
        }
      }
    })
  }
}

//#region Types & Exports
// ============================================================================

type SingleDatePickerProps = {
  presets?: DatePreset[]
  defaultValue?: Date
  value?: Date
  onChange?: (date: Date | undefined) => void
  clearable?: boolean
} & PickerProps

const DatePicker = ({ presets, ...props }: SingleDatePickerProps) => {
  const locale = useCalendarLocale()

  if (presets) {
    validatePresets(presets, props)
  }

  return (
    <SingleDatePicker
      presets={presets}
      locale={locale}
      {...(props as SingleProps)}
    />
  )
}

DatePicker.displayName = 'DatePicker'

type RangeDatePickerProps = {
  presets?: DateRangePreset[]
  defaultValue?: DateRange
  value?: DateRange
  onChange?: (dateRange: DateRange | undefined) => void
} & PickerProps

const DateRangePicker = ({ presets, ...props }: RangeDatePickerProps) => {
  const locale = useCalendarLocale()

  if (presets) {
    validatePresets(presets, props)
  }

  return (
    <RangeDatePicker
      presets={presets}
      locale={locale}
      {...(props as RangeProps)}
    />
  )
}

DateRangePicker.displayName = 'DateRangePicker'

export { DatePicker, type DatePreset, DateRangePicker, type DateRangePreset }
