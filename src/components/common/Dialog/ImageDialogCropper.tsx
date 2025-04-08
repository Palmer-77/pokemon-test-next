import 'react-advanced-cropper/dist/style.css'

import { useTranslations } from 'next-intl'
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import { CircleStencil, Cropper, CropperRef } from 'react-advanced-cropper'

import { Button } from '@/components/ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import SectionBulletIcon from '~icons/dl/section-bullet'

export type ImageDialogCropperRef = {
  open: (url?: string) => void
  close: () => void
}

const stencilComponent = {
  circle: CircleStencil,
}

type ImageDialogCropperProps = {
  onClose?: () => void
  onCrop?: (croppedImage: File) => void
  onCancel?: () => void
  options?: {
    aspectRatio?: number
    stencil?: keyof typeof stencilComponent
  }
}

export const ImageDialogCropper = forwardRef<ImageDialogCropperRef, ImageDialogCropperProps>(
  ({ onClose, onCrop, onCancel, options = {} }, ref) => {
    const { aspectRatio, stencil } = options

    const t = useTranslations()

    const cropperRef = useRef<CropperRef>(null)

    const [isOpen, setIsOpen] = useState(false)
    const [source, setSource] = useState<string>()

    const handleClose = useCallback(() => {
      setIsOpen(false)
      onClose?.()
      source && URL.revokeObjectURL(source)
      setSource(undefined)
    }, [onClose, source])

    const handleCancel = useCallback(() => {
      setIsOpen(false)
      onCancel?.()
      source && URL.revokeObjectURL(source)
      setSource(undefined)
    }, [onCancel, source])

    const handleCrop = useCallback(() => {
      cropperRef.current?.getCanvas()?.toBlob((blob) => {
        if (!blob) return
        onCrop?.(new File([blob], 'cropped-image.png', { type: 'image/png' }))
      })
      handleClose()
    }, [onCrop, cropperRef, handleClose])

    useImperativeHandle(
      ref,
      () => ({
        open: (url?: string) => {
          setIsOpen(true)
          setTimeout(() => {
            url && setSource(url)
          }, 300)
        },
        close: handleClose,
      }),
      [handleClose],
    )

    return (
      <Dialog
        onOpenChange={handleClose}
        open={isOpen}
      >
        <DialogContent className="p-0 overflow-hidden gap-0 max-w-2xl">
          <DialogHeader className="flex flex-row gap-2 items-center bg-s-foreground py-5 px-4">
            <SectionBulletIcon className="h-6 w-6" />
            <DialogTitle className="!text-h6-bold">Image Cropper</DialogTitle>
            <DialogDescription className="sr-only">Drag the image to crop it</DialogDescription>
          </DialogHeader>
          <div className="text-sm bg-s-primary h-[400px] p-4">
            <Cropper
              ref={cropperRef}
              className="w-full h-full"
              src={source}
              onReady={() => {
                console.log('ready')

                cropperRef.current?.reset()
              }}
              onUpdate={(cropper) => {
                console.log(cropper)
              }}
              stencilProps={{
                aspectRatio,
              }}
              stencilComponent={stencil ? stencilComponent[stencil] : undefined}
            />
          </div>
          <DialogFooter className="bg-s-primary border-t border-b-primary p-4">
            <Button
              onClick={handleCancel}
              variant="destructive"
            >
              {t('buttons.cancel')}
            </Button>
            <Button onClick={handleCrop}>{t('buttons.crop')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
)

ImageDialogCropper.displayName = 'ImageDialogCropper'
