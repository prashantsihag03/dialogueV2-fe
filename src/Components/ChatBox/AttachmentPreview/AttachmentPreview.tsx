import { Stack, SxProps, Theme, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { getInputMessageAttachmentsByConvoId } from '../../../store/inputMessages/selector'
import {
  removeAllAttachments,
  removeAttachment,
} from '../../../store/inputMessages/slice'
import ImageRenderer from '../ImageRenderer'

interface AttachmentPreviewProps {
  conversationId: string
  addAttachmentHandler: () => void
  title?: string
}

const IconStyle: SxProps<Theme> = {
  position: 'absolute',
  top: '49%',
  fontSize: '3rem',
  backgroundColor: 'background.paper',
}

const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({
  conversationId,
  addAttachmentHandler,
}: AttachmentPreviewProps) => {
  const dispatch = useAppDispatch()
  const [attachCarouselIndex, setAttachCarouselIndex] = useState<number>(0)
  const attachments = useAppSelector(
    getInputMessageAttachmentsByConvoId(conversationId)
  )

  const goLeftOnCarousel = () => {
    if (attachCarouselIndex > 0) {
      setAttachCarouselIndex((prevIndex) => prevIndex - 1)
    }
  }

  const goRightOnCarousel = () => {
    if (attachCarouselIndex < attachments.length - 1) {
      setAttachCarouselIndex((prevIndex) => prevIndex + 1)
    }
  }

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height={'100%'}
      position="absolute"
      bottom="0%"
      zIndex={attachments.length > 0 ? 100 : -100}
      sx={{
        backgroundColor: 'background.default',
        transition: 'all 0.5 ease-in-out',
      }}
    >
      {attachments.length > 1 ? (
        <>
          <ArrowLeftIcon
            sx={{ ...IconStyle, left: '2%', zIndex: 2 }}
            onClick={goLeftOnCarousel}
          />
          <ArrowRightIcon
            sx={{
              ...IconStyle,
              right: '2%',
              zIndex: 2,
            }}
            onClick={goRightOnCarousel}
          />
        </>
      ) : null}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        position="absolute"
        top="0%"
        right="0%"
      >
        <CloseIcon
          onClick={() => {
            setAttachCarouselIndex(0)
            dispatch(removeAllAttachments(conversationId))
          }}
          titleAccess="Close and discard all selected attachments."
        />
      </Stack>
      {attachments.length > 0 ? (
        <Stack
          key={attachCarouselIndex}
          direction="row"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="70%"
          sx={{
            backgroundColor: 'background.default',
            overflowX: 'hidden',
          }}
        >
          <ImageRenderer
            file={attachments[attachCarouselIndex]}
            width="90%"
            height="100%"
            showRemoveIcon={true}
            showBackLight={true}
            onRemove={() => {
              const indexToRemove = attachCarouselIndex
              goLeftOnCarousel()
              dispatch(
                removeAttachment({
                  convoId: conversationId,
                  indexToRemove: indexToRemove,
                })
              )
            }}
          />
        </Stack>
      ) : null}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        width="100%"
        sx={{
          position: 'absolute',
          bottom: '0%',
          right: '0%',
        }}
      >
        <DeleteIcon
          sx={{
            fontSize: '2rem',
            backgroundColor: 'transparent',
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
          onClick={() => {
            const indexToRemove = attachCarouselIndex
            goLeftOnCarousel()
            dispatch(
              removeAttachment({
                convoId: conversationId,
                indexToRemove: indexToRemove,
              })
            )
          }}
          titleAccess="Remove this attachment."
        />
        <Typography
          variant="body1"
          sx={{
            padding: '1rem',
            fontSize: '1.2rem',
          }}
        >
          {attachCarouselIndex + 1}/{attachments.length}
        </Typography>
        <AddIcon
          sx={{
            fontSize: '2rem',
            backgroundColor: 'transparent',
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
          onClick={addAttachmentHandler}
          titleAccess="Remove this attachment."
        />
      </Stack>
    </Stack>
  )
}

export default AttachmentPreview
