import {
  Box,
  FilledInputProps,
  Popover,
  TextField,
  Typography,
} from '@mui/material'
// import { Box } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { actionIconStyles } from './styles'
import { ChatQuickView } from '../ChatQuickView/ChatQuickView'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useCallback, useRef, useState } from 'react'
import { ChatsSkeleton } from './ChatsSkeleton'
import CreateConversationDialog from '../CreateConversationDialog/CreateConversationDialog'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  getConversationFilteredList,
  getConversationSort,
  getConversations,
  getConversationsError,
  isConversationsLoading,
} from '../../store/chats/selector'
import {
  filterConversationList,
  setOpenCreateConvoDialog,
  sortConversations,
} from '../../store/chats/slice'
import SideBar from '../Sidebar'

export const Chats: React.FC = () => {
  const chatsListEleRef = useRef<HTMLDivElement>()
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null)
  const [search, setSearch] = useState<string>('')
  const [searching, setSearching] = useState<boolean>(false)
  const appDispatch = useAppDispatch()
  const sort = useAppSelector(getConversationSort)
  const data = useAppSelector(getConversations)
  const isFetching = useAppSelector(isConversationsLoading)
  const error = useAppSelector(getConversationsError)
  const conversationFilteredList = useAppSelector(getConversationFilteredList)

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
    <SideBar
      title="Conversations"
      showBackbtn={false}
      headerActions={
        <>
          <CreateConversationDialog
            onBackdropClick={() => {
              appDispatch(setOpenCreateConvoDialog(false))
            }}
          />
          <AddOutlinedIcon
            className="create-conversation-icon"
            sx={actionIconStyles}
            onClick={() => {
              appDispatch(setOpenCreateConvoDialog(true))
            }}
          />
          <SearchIcon
            className="search-in-list-conversation"
            sx={actionIconStyles}
            onClick={(event) => {
              setAnchorEl(event.currentTarget)
            }}
          />
          <Popover
            id={Boolean(anchorEl) ? 'simple-popover' : undefined}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => {
              setAnchorEl(null)
            }}
            sx={{
              backgroundColor: 'transparent',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <TextField
              InputProps={
                {
                  disableUnderline: true,
                  sx: {
                    fontSize: '0.8rem',
                  },
                } as Partial<FilledInputProps>
              }
              sx={{ margin: '0.5rem 0.5rem' }}
              size="small"
              InputLabelProps={{
                style: {
                  fontSize: '0.9rem',
                  color: '#838383',
                },
              }}
              variant="outlined"
              label="Find conversation"
              value={search}
              onChange={(event) => {
                setSearching(false)
                setSearch(event.target.value)
              }}
              onKeyDown={(e) => {
                if (e.code.toString() === 'Enter') {
                  setSearching(true)
                  appDispatch(filterConversationList(search))
                }
              }}
            />
          </Popover>
          <SortIcon
            className="sort-conversation-joyride"
            onClick={() => {
              if (sort === 'asc') appDispatch(sortConversations('desc'))
              else appDispatch(sortConversations('asc'))
            }}
            sx={{
              ...actionIconStyles,
              transform: sort === 'asc' ? 'scaleX(-1) scaleY(-1)' : undefined,
            }}
          />
        </>
      }
      footerActions={
        <>
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
        </>
      }
    >
      <Box
        width="100%"
        height="100%"
        padding="3% 0%"
        sx={{ overflowX: 'auto' }}
        component="div"
        ref={chatsListEleRef}
      >
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
            Error
          </Typography>
        ) : null}
        {data && data.length > 0 && !searching
          ? data.map((chatInfo, index: number) => (
              <ChatQuickView
                key={chatInfo.conversationId}
                {...chatInfo}
                className={
                  index === 0
                    ? 'first-conversation-quickview-joyride'
                    : undefined
                }
              />
            ))
          : null}
        {data && data.length === 0 && !searching ? (
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
            You have no conversations.
          </Typography>
        ) : null}
        {searching && conversationFilteredList.length > 0
          ? conversationFilteredList.map((chatInfo) => (
              <ChatQuickView key={chatInfo.conversationId} {...chatInfo} />
            ))
          : null}
        {searching && conversationFilteredList.length === 0 ? (
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
            No conversation matches search criteria.
          </Typography>
        ) : null}
      </Box>
    </SideBar>
  )
}
