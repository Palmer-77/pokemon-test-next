import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'

import { Button, FormControl, Input, InputProps, Label, useFormField } from '@/components/ui'
import { cn } from '@/lib/utils'

type BrowseFileButtonProps = {
  disabled?: boolean
}

export const BrowseFileButton = forwardRef<HTMLButtonElement, BrowseFileButtonProps>(({ disabled }, ref) => {
  const t = useTranslations('buttons')
  const { formItemId } = useFormField()

  return (
    <Button
      type="button"
      disabled={disabled}
      ref={ref}
    >
      <Label
        htmlFor={formItemId}
        className="cursor-pointer font-semibold"
      >
        {t('browse')}
      </Label>
    </Button>
  )
})

BrowseFileButton.displayName = 'BrowseFileButton'

export const UploadPreviewField = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField()

  return (
    <Input
      ref={ref}
      readOnly
      className={cn('cursor-pointer', className)}
      onClick={() => document.getElementById(formItemId)?.click()}
      placeholder="File name"
      {...props}
      name={`${formItemId}-input-preview`}
      id={`${formItemId}-input-preview`}
      value={(props.value as unknown as File)?.name || ''}
    />
  )
})

UploadPreviewField.displayName = 'UploadPreviewField'

type UploadFieldProps = Omit<InputProps, 'onChange'> & {
  wrapperClassName?: string
  onChange?: (file?: File) => void
}

export const UploadField = forwardRef<HTMLInputElement, UploadFieldProps>(
  ({ className, wrapperClassName, onChange, onBlur, disabled, name, value, ...props }, ref) => {
    return (
      <div className={cn(wrapperClassName)}>
        <FormControl>
          <Input
            type="file"
            className="lg:max-w-96 file:hidden align-middle [&[value='']]:text-t-placeholder hidden"
            onInput={(e) => {
              onChange?.(e.currentTarget.files?.[0])
              e.currentTarget.value = ''
            }}
            disabled={disabled}
            name={name}
            ref={ref}
            onBlur={onBlur}
            onChange={undefined}
            value={undefined}
            {...props}
          />
        </FormControl>
        <FormControl>
          <UploadPreviewField
            value={value}
            disabled={disabled}
            className={cn("lg:max-w-96 file:hidden align-middle [&[value='']]:text-t-placeholder", className)}
          />
        </FormControl>
        <FormControl>
          <BrowseFileButton disabled={disabled} />
        </FormControl>
      </div>
    )
  },
)

UploadField.displayName = 'UploadField'
