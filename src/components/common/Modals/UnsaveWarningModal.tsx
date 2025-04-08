import { useTranslations } from 'next-intl'
import { useCallback, useMemo, useState } from 'react'

import CharacterWarning from '~icons/dl/character-warning'

import { ModalLayout } from './_Modal'

type UnsaveWarningModalProps = {
  open: boolean
  setIsOpen: (open: boolean) => void
  onDiscard: () => void
}

const UnsaveWarning = ({ open, setIsOpen, onDiscard }: UnsaveWarningModalProps) => {
  const t = useTranslations()

  return (
    <ModalLayout
      hero={<CharacterWarning className="size-48" />}
      open={open}
      setIsOpen={setIsOpen}
      title={t('modals.unsave_warning.title')}
      description={t('modals.unsave_warning.description')}
      cancel={{
        label: t('buttons.not_now'),
      }}
      action={{
        label: t('buttons.discard_changes'),
        action: () => onDiscard(),
      }}
    />
  )
}

export const useUnsaveWarningModal = () => {
  const [openWarningModal, setIsOpenWarningModal] = useState(false)

  const UnsaveWarningModal = useCallback(
    ({ onDiscard }: { onDiscard: () => void }) => {
      return (
        <UnsaveWarning
          open={openWarningModal}
          setIsOpen={setIsOpenWarningModal}
          onDiscard={onDiscard}
        />
      )
    },
    [openWarningModal, setIsOpenWarningModal],
  )

  const showUnsaveWarningModal = useCallback(() => {
    setIsOpenWarningModal(true)
  }, [setIsOpenWarningModal])

  return useMemo(
    () => ({
      showUnsaveWarningModal,
      UnsaveWarningModal,
    }),
    [showUnsaveWarningModal, UnsaveWarningModal],
  )
}
