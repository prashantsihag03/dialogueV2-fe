import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Popover,
  Slide,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  useCreateConversationMutation,
  useSearchUserQuery,
} from '../../store/api/slice'

interface ICreateConversationDialog {
  open: boolean
  onBackdropClick: () => void
}

const CreateConversationDialog: React.FC<ICreateConversationDialog> = ({
  open,
  onBackdropClick,
}: ICreateConversationDialog) => {
  const [searchUserId, setSearchUserId] = useState<string>('')
  const [startConversationValidation, setStartConversationValidation] =
    useState<string>('')
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
      console.log(result)
      setStartConversationValidation('Successfully created')
      setAllowInput(true)
      setSearchUserId('')
    }
  }, [result])

  return (
    <Dialog
      open={open}
      keepMounted={false}
      TransitionComponent={Slide}
      fullWidth
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: 'background.default',
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
            color="error"
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
          label="Enter user id"
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
          <DialogContent>
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
                  <ListItem
                    key={index}
                    sx={{
                      borderRadius: 0.8,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemText
                      sx={{ '&:hover': { cursor: 'pointer' } }}
                      onClick={() => {
                        setAllowStart(true)
                        setSearchUserId(user.id)
                        setShowUserResult(false)
                      }}
                    >
                      {user.id}
                    </ListItemText>
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
