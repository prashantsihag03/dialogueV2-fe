import { Button, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { containerStyles } from './styles'
import {
  UpdateProfileBody,
  useClearConversationMutation,
  useDeleteConversationMutation,
  useGetProfileQuery,
  useUpdateMyProfileMutation,
} from '../../store/api/slice'
import { ProfileHeader } from './ProfileHeader'
import { ProfileAvatar } from './ProfileAvatar'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  getActiveProfileUser,
  isEditingMyProfile,
} from '../../store/profile/selector'
import { useEffect, useState } from 'react'
import ProfileTextField from './ProfileTextField'
import {
  getActiveConversation,
  getConversations,
} from '../../store/chats/selector'
import { setActiveConversation } from '../../store/chats/slice'
import { removeOngoingMessages } from '../../store/onGoingMessages/slice'
import { getUserConversations } from '../../store/chats/thunk'
import { setEditingMyProfile } from '../../store/profile/slice'

export const Profile: React.FC = () => {
  const appDispatch = useAppDispatch()
  const conversations = useAppSelector(getConversations)
  const activeProfileUser = useAppSelector(getActiveProfileUser)
  const activeConversation = useAppSelector(getActiveConversation)
  const isEditEnabled = useAppSelector(isEditingMyProfile)

  const [newBioValue, setNewBioValue] = useState<string>('')
  const [newNameValue, setNewNameValue] = useState<string>('')
  const [newEmailValue, setNewEmailValue] = useState<string>('')
  const [newProfileImg, setNewProfileImg] = useState<File | null>(null)

  const [updateMyProfile] = useUpdateMyProfileMutation()
  const [clearConversation, clearConvoResult] = useClearConversationMutation()
  const [deleteConversation, deleteConvoResult] =
    useDeleteConversationMutation()

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

  useEffect(() => {
    if (deleteConvoResult.isSuccess) {
      const convoId = getConversationId()
      if (convoId != null) {
        // remove this convo if its active.
        if (activeConversation?.conversationId === convoId) {
          appDispatch(setActiveConversation(undefined))
        }
        // remove all ongoing messages for this conversation
        appDispatch(removeOngoingMessages(convoId))
      }
      // remove the profile of this user as well.
      appDispatch(getUserConversations())
    }
  }, [deleteConvoResult])

  return (
    <Box sx={containerStyles} className="profile-sidebar">
      <ProfileHeader
        showEdit={Boolean(activeProfileUser?.isLoggedInUser)}
        editing={isEditEnabled}
        onEditClick={() => {
          setNewBioValue(data?.bio || '')
          setNewNameValue(data?.fullname || '')
          setNewEmailValue(data?.email || '')
          appDispatch(setEditingMyProfile(true))
        }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onConfirmClick={() => {
          appDispatch(setEditingMyProfile(false))
          const newUpdatedProfile: UpdateProfileBody = {
            bio: newBioValue,
            email: newEmailValue,
            fullname: newNameValue,
            id: '',
          }
          if (newProfileImg != null) {
            newUpdatedProfile.profileImg = newProfileImg
          }
          updateMyProfile(newUpdatedProfile)
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
          <Stack
            direction="column"
            alignItems="center"
            width="100%"
            className="profile-fields"
          >
            <ProfileAvatar
              userId={data.id}
              edit={isEditEnabled}
              newName={newNameValue}
              onNameChange={(event) => {
                setNewNameValue(event.target.value)
              }}
              name={data.fullname}
              lastOnline={data.lastOnlineUTCDateTime}
              profileImgSrc={data.profileImg}
              onProfileImgChange={(newImg: File) => {
                setNewProfileImg(newImg)
              }}
            />
            <Stack direction="column" alignItems="center" width={'100%'}>
              <ProfileTextField
                id="profile-bio"
                fieldValue={isEditEnabled ? newBioValue : data.bio}
                mode={isEditEnabled ? 'edit' : 'view'}
                labelText="Bio"
                multiline={true}
                onFieldValueChange={(event) => {
                  setNewBioValue(event.target.value)
                }}
                textFieldVariant={isEditEnabled ? 'outlined' : 'filled'}
              />
              {activeProfileUser?.isLoggedInUser ? (
                <>
                  <ProfileTextField
                    id="profile-email"
                    fieldValue={isEditEnabled ? newEmailValue : data.email}
                    mode={isEditEnabled ? 'edit' : 'view'}
                    labelText="Email"
                    onFieldValueChange={(event) => {
                      setNewEmailValue(event.target.value)
                    }}
                    textFieldVariant={isEditEnabled ? 'outlined' : 'filled'}
                  />
                </>
              ) : null}
            </Stack>
          </Stack>
          {!activeProfileUser?.isLoggedInUser ? (
            <Stack
              direction="column"
              alignItems="center"
              width={'100%'}
              className="other-profile-options"
            >
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
                Clear Conversation
              </Button>
              <Button
                variant="text"
                color="primary"
                disabled={getConversationId() == null ? true : false}
                onClick={() => {
                  const convoId = getConversationId()
                  if (convoId == null) return
                  deleteConversation(convoId)
                }}
              >
                Delete Conversation
              </Button>
              <Button variant="text" color="error">
                Block {data.fullname}
              </Button>
              <Button variant="text" color="error">
                Report {data.fullname}
              </Button>
            </Stack>
          ) : (
            <Stack
              direction="column"
              alignItems="center"
              width={'100%'}
              className="other-profile-options"
            >
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
