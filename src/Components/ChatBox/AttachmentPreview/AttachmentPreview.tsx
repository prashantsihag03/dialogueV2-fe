import { Stack, SxProps, Theme, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
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
  title?: string
}

const IconStyle: SxProps<Theme> = {
  position: 'absolute',
  top: '45%',
  fontSize: '3rem',
  backgroundColor: 'background.paper',
}

const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({
  conversationId,
  title,
}: AttachmentPreviewProps) => {
  const dispatch = useAppDispatch()
  const [attachCarouselIndex, setAttachCarouselIndex] = useState<number>(0)
  const [minimizedPreview, setMinimizedPreview] = useState<boolean>(false)
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
      height={minimizedPreview ? '30%' : '100%'}
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
        {minimizedPreview ? (
          <ExpandLessIcon
            onClick={() => {
              setMinimizedPreview(false)
            }}
          />
        ) : (
          <ExpandMoreIcon
            onClick={() => {
              setMinimizedPreview(true)
            }}
          />
        )}
        {!minimizedPreview ? (
          <Typography
            variant="h2"
            fontSize="1.2rem"
            sx={{
              color: 'text.secondary',
              paddingLeft: '1rem',
              fontWeight: 'normal',
            }}
          >
            {title ? title : 'Preview'}
          </Typography>
        ) : null}
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
          width="80%"
          height="70%"
        >
          {minimizedPreview ? (
            attachments.map((attachment, index) => (
              <ImageRenderer
                key={index}
                file={attachment}
                height="100%"
                marginRight="2rem"
                showRemoveIcon={true}
                onRemove={() => {
                  dispatch(
                    removeAttachment({
                      convoId: conversationId,
                      indexToRemove: attachCarouselIndex,
                    })
                  )
                }}
              />
            ))
          ) : (
            <ImageRenderer
              file={attachments[attachCarouselIndex]}
              width="70%"
              showRemoveIcon={true}
              onRemove={() => {
                dispatch(
                  removeAttachment({
                    convoId: conversationId,
                    indexToRemove: attachCarouselIndex,
                  })
                )
              }}
            />
          )}
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
        {/* <SendIcon
          onClick={() => {
            if (loggedProfileData == null) return

            const localMessage: OngoingMessageValue = {
              conversationId: activeConversation.conversationId,
              message: '',
              messageId: '',
              senderId: loggedProfileData?.id,
              timeStamp: 0,
              localMessageId: uuidv4(),
              status: 'pending',
            }

            appDispatch(addOngoingMessage(localMessage))
            sendMessage({
              conversationId: localMessage.conversationId,
              localMessageId: localMessage.localMessageId,
              messageId: localMessage.messageId,
              senderUserId: localMessage.senderId,
              source: 'outgoing',
              text: localMessage.message,
              timestamp: localMessage.timeStamp + '',
              img: attachments[attachCarouselIndex],
            })
            appDispatch(setShowLatestMsgInView(true))
          }}
          titleAccess="Send this attachment only"
        /> */}
        {!minimizedPreview ? (
          <Typography
            variant="body1"
            sx={{
              padding: '1rem',
              fontSize: '1.2rem',
            }}
          >
            {attachCarouselIndex + 1}/{attachments.length}
          </Typography>
        ) : null}
      </Stack>
    </Stack>
  )
}

export default AttachmentPreview
