import { useTranslations } from 'next-intl'
import { useCallback, useMemo, useState } from 'react'

import CharacterWarning from '~icons/dl/character-warning'

import { ModalLayout } from './_Modal'

type ConfirmSaveModalProps = {
  open: boolean
  setIsOpen: (open: boolean) => void
  onConfirm: () => void
}

const ConfirmSave = ({ open, setIsOpen, onConfirm }: ConfirmSaveModalProps) => {
  const t = useTranslations()

  return (
    <ModalLayout
      hero={<CharacterWarning className="size-48" />}
      open={open}
      setIsOpen={setIsOpen}
      title={t('modals.confirm.title')}
      description={t('modals.confirm.description')}
      cancel={{
        label: t('buttons.not_now'),
      }}
      action={{
        label: t('buttons.confirm'),
        action: () => onConfirm(),
      }}
    />
  )
}

export const useConfirmSaveModal = () => {
  const [openConfirmSaveModal, setIsOpenConfirmSaveModal] = useState(false)

  const ConfirmSaveModal = useCallback(
    ({ onConfirm }: { onConfirm: () => void }) => {
      return (
        <ConfirmSave
          open={openConfirmSaveModal}
          setIsOpen={setIsOpenConfirmSaveModal}
          onConfirm={onConfirm}
        />
      )
    },
    [openConfirmSaveModal, setIsOpenConfirmSaveModal],
  )

  const showConfirmSaveModal = useCallback(() => {
    setIsOpenConfirmSaveModal(true)
  }, [setIsOpenConfirmSaveModal])

  return useMemo(
    () => ({
      showConfirmSaveModal,
      ConfirmSaveModal,
    }),
    [showConfirmSaveModal, ConfirmSaveModal],
  )
}
