import { Button, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { containerStyles } from './styles'
import {
  useClearConversationMutation,
  useGetProfileQuery,
  useUpdateMyProfileMutation,
} from '../../store/api/slice'
import { ProfileHeader } from './ProfileHeader'
import { ProfileAvatar } from './ProfileAvatar'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getActiveProfileUser } from '../../store/profile/selector'
import { useEffect, useState } from 'react'
import ProfileTextField from './ProfileTextField'
import {
  getActiveConversation,
  getConversations,
} from '../../store/chats/selector'
import { setActiveConversation } from '../../store/chats/slice'
import { removeOngoingMessages } from '../../store/onGoingMessages/slice'
import { getUserConversations } from '../../store/chats/thunk'

export const Profile: React.FC = () => {
  const appDispatch = useAppDispatch()
  const activeProfileUser = useAppSelector(getActiveProfileUser)
  const activeConversation = useAppSelector(getActiveConversation)
  const [edit, setEdit] = useState<boolean>(false)
  const [updateMyProfile] = useUpdateMyProfileMutation()
  const [newBioValue, setNewBioValue] = useState<string>('')
  const [newNameValue, setNewNameValue] = useState<string>('')
  const [newEmailValue, setNewEmailValue] = useState<string>('')
  const conversations = useAppSelector(getConversations)
  const [clearConversation, clearConvoResult] = useClearConversationMutation()
  const { isFetching, isSuccess, data } = useGetProfileQuery(
    Boolean(activeProfileUser?.isLoggedInUser)
      ? undefined
      : activeProfileUser?.id,
    {
      skip: Boolean(activeProfileUser?.isLoggedInUser)
        ? false
        : !Boolean(activeProfileUser?.id),
    }
  )

  const getConversationId = () => {
    if (activeProfileUser?.isLoggedInUser) {
      return undefined
    }

    const conv = conversations.find(
      (convo) => convo.conversationName === activeProfileUser?.id
    )

    return conv?.conversationId
  }

  useEffect(() => {
    console.log(clearConvoResult)
    if (clearConvoResult.isSuccess) {
      const convoId = getConversationId()
      if (convoId != null) {
        if (activeConversation?.conversationId === convoId) {
          appDispatch(setActiveConversation(undefined))
        }
        appDispatch(removeOngoingMessages(convoId))
      }
      appDispatch(getUserConversations())
    }
  }, [clearConvoResult])

  return (
    <Box sx={containerStyles}>
      <ProfileHeader
        showEdit={Boolean(activeProfileUser?.isLoggedInUser)}
        editing={edit}
        onEditClick={() => {
          setNewBioValue(data?.bio || '')
          setNewNameValue(data?.fullname || '')
          setNewEmailValue(data?.email || '')
          setEdit(!edit)
        }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onConfirmClick={() => {
          setEdit(false)
          updateMyProfile({
            bio: newBioValue,
            email: newEmailValue,
            fullname: newNameValue,
            id: '',
            lastOnlineUTCDateTime: '',
            profileImgSrc: '',
          })
        }}
      />
      {!isFetching && isSuccess && data ? (
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          height="100%"
        >
          <Stack direction="column" alignItems="center" width="100%">
            <ProfileAvatar
              userId={data.id}
              edit={edit}
              newName={newNameValue}
              onNameChange={(event) => {
                setNewNameValue(event.target.value)
              }}
              name={data.fullname}
              lastOnline={data.lastOnlineUTCDateTime}
              profileImgSrc={data.profileImgSrc}
            />
            <Stack direction="column" alignItems="center" width={'100%'}>
              <ProfileTextField
                fieldValue={edit ? newBioValue : data.bio}
                mode={edit ? 'edit' : 'view'}
                labelText="Bio"
                onFieldValueChange={(event) => {
                  setNewBioValue(event.target.value)
                }}
                textFieldVariant={edit ? 'outlined' : 'filled'}
              />
              {activeProfileUser?.isLoggedInUser ? (
                <>
                  <ProfileTextField
                    fieldValue={edit ? newEmailValue : data.email}
                    mode={edit ? 'edit' : 'view'}
                    labelText="Email"
                    onFieldValueChange={(event) => {
                      setNewEmailValue(event.target.value)
                    }}
                    textFieldVariant={edit ? 'outlined' : 'filled'}
                  />
                </>
              ) : null}
            </Stack>
          </Stack>
          {!activeProfileUser?.isLoggedInUser ? (
            <Stack direction="column" alignItems="center" width={'100%'}>
              <Button
                variant="text"
                color="primary"
                disabled={getConversationId() == null ? true : false}
                onClick={() => {
                  const convoId = getConversationId()
                  if (convoId == null) return
                  clearConversation(convoId)
                }}
              >
                Clear Chat
              </Button>
              <Button variant="text" color="primary">
                Delete Chat
              </Button>
              <Button variant="text" color="error">
                Block {data.fullname}
              </Button>
              <Button variant="text" color="error">
                Report {data.fullname}
              </Button>
            </Stack>
          ) : (
            <Stack direction="column" alignItems="center" width={'100%'}>
              <Button variant="text" color="primary" href="/logout">
                Log out
              </Button>
              <Button variant="text" color="error">
                Delete Account
              </Button>
            </Stack>
          )}
        </Stack>
      ) : null}
    </Box>
  )
}
