/* eslint-disable @typescript-eslint/no-unused-vars */
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
  useGetUserSettingsQuery,
  useSearchUserQuery,
} from '../../store/api/slice'
import UserSearchResult from './UserSearchResult'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getUserConversations } from '../../store/chats/thunk'
import {
  getConversationIdByName,
  getConversationsError,
  getOpenCreateConvoDialog,
  getShowCreateConvoSearchResult,
  isConversationsLoading,
  isCreateConvoEnabled,
} from '../../store/chats/selector'
import {
  setActiveConversation,
  setActiveConversationByName,
  setCreateConvoDialogTransitionEnded,
  setCreateConvoEnabled,
  setShowCreateConvoSearchResult,
} from '../../store/chats/slice'
import isTrue from '../../utils/common-utils'

interface ICreateConversationDialog {
  onBackdropClick: () => void
}

const CreateConversationDialog: React.FC<ICreateConversationDialog> = ({
  onBackdropClick,
}: ICreateConversationDialog) => {
  const appDispatch = useAppDispatch()

  const [searchUserId, setSearchUserId] = useState<string>('')
  const [allowInput, setAllowInput] = useState<boolean>(true)

  const { data: settingsData } = useGetUserSettingsQuery(
    'openExistingConversation'
  )

  const [startConversationValidation, setStartConversationValidation] =
    useState<string>('')
  const [convoValidationColor, setConvoValidationColor] = useState<
    'red' | 'green' | 'skyblue'
  >('red')

  const openCreateConvoDialog = useAppSelector(getOpenCreateConvoDialog)
  const createConvoEnabled = useAppSelector(isCreateConvoEnabled)
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)
  const [search, setSearch] = useState<boolean>(false)

  const showCreateConvoSearchResult = useAppSelector(
    getShowCreateConvoSearchResult
  )

  const [refreshConversation, setRefreshConversation] = useState<boolean>(false)
  const [createConversation, result] = useCreateConversationMutation()
  const isConversationsFetching = useAppSelector(isConversationsLoading)
  const conversationsError = useAppSelector(getConversationsError)
  const { isFetching, isError, currentData, originalArgs } = useSearchUserQuery(
    searchUserId.toLocaleLowerCase(),
    {
      skip: !Boolean(search),
    }
  )

  const cleanState = () => {
    setSearchUserId('')
    setStartConversationValidation('')
    appDispatch(setCreateConvoEnabled(false))
    setSearch(false)
  }

  useEffect(() => {
    if (result && result.isSuccess && searchUserId !== '') {
      setSearchUserId('')
      if (!isConversationsFetching) {
        appDispatch(getUserConversations())
        setRefreshConversation(true)
      }
      setConvoValidationColor('green')
      setStartConversationValidation(
        'Conversation created. Refreshing conversation list ...'
      )
    }
    if (result && result.isError) {
      const errorMsg =
        'data' in result.error
          ? (result.error.data as { error: string }).error
          : 'Conversation may have been created. Check and try again!'
      setConvoValidationColor('red')
      setStartConversationValidation(errorMsg)
      if (isTrue(settingsData?.openExistingConversation)) {
        if (
          errorMsg.toLocaleLowerCase().includes('conversation already exists')
        ) {
          appDispatch(
            setActiveConversationByName(result.originalArgs?.conversationUserId)
          )
          cleanState()
          onBackdropClick()
        }
      }
      setSearchUserId('')
    }
    setAllowInput(true)
  }, [result])

  useEffect(() => {
    if (
      !isConversationsFetching &&
      !conversationsError &&
      refreshConversation
    ) {
      setRefreshConversation(false)
      onBackdropClick()
    }
  }, [isConversationsFetching])

  return (
    <Dialog
      onTransitionEnd={() => {
        appDispatch(setCreateConvoDialogTransitionEnded(true))
      }}
      open={openCreateConvoDialog}
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
        cleanState()
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
          className="create-convo-search-userid"
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
              appDispatch(setCreateConvoEnabled(false))
              appDispatch(setShowCreateConvoSearchResult(true))
            }
          }}
          onChange={(event) => {
            setSearch(false)
            appDispatch(setCreateConvoEnabled(false))
            setSearchUserId(event.target.value)
          }}
        />
        <Popover
          id={'simple-popover'}
          PaperProps={{
            style: { width: anchorEl?.clientWidth },
          }}
          open={showCreateConvoSearchResult}
          anchorEl={anchorEl}
          onClose={() => {
            appDispatch(setShowCreateConvoSearchResult(false))
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
                      id={index === 0 ? 'first' : undefined}
                      name={user.id}
                      onClick={() => {
                        appDispatch(setCreateConvoEnabled(true))
                        setSearch(false)
                        setSearchUserId(user.id)
                        appDispatch(setShowCreateConvoSearchResult(false))
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
          className="create-convo-btn"
          disabled={!createConvoEnabled}
          variant="contained"
          color="secondary"
          sx={{ padding: '0.2em 1em' }}
          onClick={() => {
            // send request to create a new conversation for this user.
            // if request failed, set response message as validation message
            appDispatch(setCreateConvoEnabled(false))
            setAllowInput(false)
            setConvoValidationColor('skyblue')
            setStartConversationValidation('Creating conversation .')
            createConversation({
              isGroup: false,
              conversationUserId: searchUserId,
            })
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateConversationDialog
