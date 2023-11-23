import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Popover,
  Slide,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  useCreateConversationMutation,
  useSearchUserQuery,
} from '../../store/api/slice'
import UserSearchResult from './UserSearchResult'
import { useAppDispatch } from '../../store/hooks'
import { getUserConversations } from '../../store/chats/thunk'

interface ICreateConversationDialog {
  open: boolean
  onBackdropClick: () => void
}

const CreateConversationDialog: React.FC<ICreateConversationDialog> = ({
  open,
  onBackdropClick,
}: ICreateConversationDialog) => {
  const appDispatch = useAppDispatch()
  const [searchUserId, setSearchUserId] = useState<string>('')
  const [startConversationValidation, setStartConversationValidation] =
    useState<string>('')
  const [convoValidationColor, setConvoValidationColor] = useState<
    'red' | 'green' | 'blue'
  >('red')
  const [allowStart, setAllowStart] = useState<boolean>(false)
  const [showUserResult, setShowUserResult] = useState<boolean>(false)
  const [allowInput, setAllowInput] = useState<boolean>(true)
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)
  const [search, setSearch] = useState<boolean>(false)
  const [createConversation, result] = useCreateConversationMutation()
  const { isFetching, isError, currentData, originalArgs } = useSearchUserQuery(
    searchUserId.toLocaleLowerCase(),
    {
      skip: !Boolean(search),
    }
  )

  useEffect(() => {
    if (result && result.isSuccess) {
      appDispatch(getUserConversations())
      setConvoValidationColor('green')
      setStartConversationValidation('Successfully created')
      setSearchUserId('')
      onBackdropClick()
    }
    if (result && result.isError) {
      setConvoValidationColor('red')
      setStartConversationValidation(
        'Error. Conversation may have been created. Check and try again!'
      )
      setSearchUserId('')
    }
    setAllowInput(true)
  }, [
    result,
    setConvoValidationColor,
    setStartConversationValidation,
    setSearchUserId,
    setAllowInput,
    onBackdropClick,
    appDispatch,
  ])

  return (
    <Dialog
      open={open}
      keepMounted={false}
      TransitionComponent={Slide}
      fullWidth
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: 'background.paper',
        },
      }}
      onClose={(e, reason) => {
        if (reason === 'backdropClick') {
          onBackdropClick()
        }
        setSearchUserId('')
        setStartConversationValidation('')
        setAllowStart(false)
        setSearch(false)
      }}
    >
      <DialogTitle>
        <b>Start a new conversation</b>
      </DialogTitle>
      <DialogContent>
        {startConversationValidation ? (
          <DialogContentText
            variant="body2"
            sx={{ marginBottom: '1em' }}
            color={convoValidationColor}
          >
            {startConversationValidation}
          </DialogContentText>
        ) : null}
        <TextField
          ref={(node) => {
            setAnchorEl(node)
          }}
          disabled={!allowInput}
          fullWidth
          margin="none"
          id="userSearchbar"
          label="Search user by userid"
          type="search"
          variant="standard"
          onKeyDown={(e) => {
            if (e.code.toString() === 'Enter') {
              setSearch(true)
              setAllowStart(false)
              setShowUserResult(true)
            }
          }}
          onChange={(event) => {
            setSearch(false)
            setAllowStart(false)
            setSearchUserId(event.target.value)
          }}
        />
        <Popover
          id={'simple-popover'}
          PaperProps={{
            style: { width: anchorEl?.clientWidth },
          }}
          open={showUserResult}
          anchorEl={anchorEl}
          onClose={() => {
            setShowUserResult(false)
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <DialogContent
            sx={{
              padding: '0',
              margin: '0',
            }}
          >
            {isFetching ? <DialogContentText>Loading</DialogContentText> : null}
            {isError ? (
              <DialogContentText>
                Something went wrong. Please try again later!
              </DialogContentText>
            ) : null}
            {!isFetching && currentData && currentData.length < 1 ? (
              <DialogContentText>
                No user exists with this userid.
              </DialogContentText>
            ) : null}
            {!isFetching &&
            currentData &&
            currentData.length > 0 &&
            searchUserId === originalArgs ? (
              <List dense>
                {currentData.map((user, index) => (
                  <ListItem key={index} dense>
                    <UserSearchResult
                      name={user.id}
                      onClick={() => {
                        setAllowStart(true)
                        setSearchUserId(user.id)
                        setShowUserResult(false)
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : null}
          </DialogContent>
        </Popover>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!allowStart}
          variant="contained"
          color="secondary"
          sx={{ padding: '0.2em 1em' }}
          onClick={() => {
            // send request to create a new conversation for this user.
            // if request failed, set response message as validation message
            setAllowStart(false)
            setAllowInput(false)
            setConvoValidationColor('blue')
            setStartConversationValidation('Creating conversation ... ')
            createConversation({
              isGroup: false,
              conversationUserId: searchUserId,
            })
          }}
        >
          Start
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateConversationDialog
