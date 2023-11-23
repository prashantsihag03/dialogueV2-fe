import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import {
  actionIconStyles,
  actionStyles,
  bottomMenuStyles,
  chatsListStyles,
  containerStyles,
  headingStyles,
} from './styles'
import { ChatQuickView } from '../ChatQuickView/ChatQuickView'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useCallback, useRef, useState } from 'react'
import { ChatsSkeleton } from './ChatsSkeleton'
import CreateConversationDialog from '../CreateConversationDialog/CreateConversationDialog'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  getConversationSort,
  getConversations,
  getConversationsError,
  isConversationsLoading,
} from '../../store/chats/selector'
import { sortConversations } from '../../store/chats/slice'

export const Chats: React.FC = () => {
  const chatsListEleRef = useRef<HTMLDivElement>()
  const appDispatch = useAppDispatch()
  const [openCreateConvoDialog, setOpenCreateConvoDialog] =
    useState<boolean>(false)
  const sort = useAppSelector(getConversationSort)
  const data = useAppSelector(getConversations)
  const isFetching = useAppSelector(isConversationsLoading)
  const error = useAppSelector(getConversationsError)

  const scrollClickHandler = useCallback(
    (toTop: boolean) => {
      if (chatsListEleRef && chatsListEleRef.current) {
        chatsListEleRef.current.scrollTo({
          top: toTop ? 0 : chatsListEleRef.current.scrollHeight,
          behavior: 'smooth',
        })
      }
    },
    [chatsListEleRef]
  )

  return (
    <>
      <Box sx={containerStyles}>
        <Box sx={headingStyles}>
          <Typography variant="h2">Conversations</Typography>
          <Box sx={actionStyles}>
            <CreateConversationDialog
              open={openCreateConvoDialog}
              onBackdropClick={() => {
                setOpenCreateConvoDialog(false)
              }}
            />
            <AddOutlinedIcon
              sx={actionIconStyles}
              onClick={() => {
                setOpenCreateConvoDialog(true)
              }}
            />
            <SearchIcon sx={actionIconStyles} />
            <SortIcon
              onClick={() => {
                if (sort === 'asc') appDispatch(sortConversations('desc'))
                else appDispatch(sortConversations('asc'))
              }}
              sx={{
                ...actionIconStyles,
                transform: sort === 'asc' ? 'scaleX(-1) scaleY(-1)' : undefined,
              }}
            />
          </Box>
        </Box>
        <Box sx={chatsListStyles} component="div" ref={chatsListEleRef}>
          {isFetching ? <ChatsSkeleton /> : null}
          {error && !isFetching ? (
            <Typography
              variant="body2"
              component={'p'}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              No conversation to show
            </Typography>
          ) : null}
          {data && data.length > 0
            ? data.map((chatInfo) => (
                <ChatQuickView key={chatInfo.conversationId} {...chatInfo} />
              ))
            : null}
          {data && data.length === 0 ? (
            <Typography
              variant="body2"
              component={'p'}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              No conversation to show
            </Typography>
          ) : null}
        </Box>
        <Box sx={bottomMenuStyles}>
          <KeyboardArrowDownIcon
            onClick={() => {
              scrollClickHandler(false)
            }}
          />
          <KeyboardArrowUpIcon
            onClick={() => {
              scrollClickHandler(true)
            }}
          />
        </Box>
      </Box>
    </>
  )
}
