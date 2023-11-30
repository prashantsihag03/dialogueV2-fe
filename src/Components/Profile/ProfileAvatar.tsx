import { Avatar, Stack, Typography } from '@mui/material'
import { ChangeEvent } from 'react'
import ProfileTextField from './ProfileTextField'

interface IProfileAvatarProps {
  userId: string
  name: string
  newName: string
  edit: boolean
  onNameChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  lastOnline: string
  profileImgSrc: string
}

export const ProfileAvatar: React.FC<IProfileAvatarProps> = ({
  userId,
  name,
  newName,
  edit,
  onNameChange,
  lastOnline,
  profileImgSrc,
}: IProfileAvatarProps) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      className="profile-avatar"
    >
      <Avatar
        className="profile-avatar"
        alt={`${name}'s Profile Picture`}
        src={`${profileImgSrc}`}
        sx={{
          width: '12vw',
          maxWidth: '400px',
          height: '12vw',
        }}
      />
      <ProfileTextField
        id="profile-fullname"
        showLabel="onEdit"
        inputTextAlign="center"
        fieldValue={edit ? newName : name}
        fieldSize={edit ? 'small' : 'medium'}
        inputFontSize={edit ? '1rem' : '1.5rem'}
        labelText="Full name"
        mode={edit ? 'edit' : 'view'}
        onFieldValueChange={onNameChange}
        textFieldVariant={edit ? 'outlined' : 'standard'}
      />
      {lastOnline.length > 0 ? (
        <Typography variant="subtitle1">Last online {lastOnline}</Typography>
      ) : null}
      <Typography className="profile-userid" variant="subtitle1">
        userid: {userId}
      </Typography>
    </Stack>
  )
}
