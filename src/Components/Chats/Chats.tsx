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
import { useAppSelector } from '../../store/hooks'
import { getChatsList } from '../../store/chats/selector'

export const Chats: React.FC = () => {
  const chatsListEleRef = useRef<HTMLDivElement>()
  const chatsData = useAppSelector(getChatsList)

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
        <Typography variant="h2">Messages</Typography>
        <Box sx={actionStyles}>
          <SearchIcon sx={actionIconStyles} />
          <SortIcon sx={actionIconStyles} />
        </Box>
      </Box>
      <Box sx={chatsListStyles} component="div" ref={chatsListEleRef}>
        {chatsData.map((chatInfo) => (
          <ChatQuickView key={chatInfo.name} {...chatInfo} />
        ))}
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
