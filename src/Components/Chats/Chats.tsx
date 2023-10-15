import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'
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
import { useCallback, useRef } from 'react'
import { useGetChatsQuery } from '../../store/api/slice'
import { ChatsSkeleton } from './ChatsSkeleton'

export const Chats: React.FC = () => {
  const chatsListEleRef = useRef<HTMLDivElement>()
  const { isLoading, isFetching, isSuccess, isError, data } = useGetChatsQuery()

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
    <Box sx={containerStyles}>
      <Box sx={headingStyles}>
        <Typography variant="h2">Conversations</Typography>
        <Box sx={actionStyles}>
          <SearchIcon sx={actionIconStyles} />
          <SortIcon sx={actionIconStyles} />
        </Box>
      </Box>
      <Box sx={chatsListStyles} component="div" ref={chatsListEleRef}>
        {isLoading || isFetching ? <ChatsSkeleton /> : null}
        {isError && !isLoading ? (
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
        {isSuccess && data?.length > 0
          ? data.map((chatInfo) => (
              <ChatQuickView key={chatInfo.conversationId} {...chatInfo} />
            ))
          : null}
        {isSuccess && data?.length === 0 ? (
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
  )
}
