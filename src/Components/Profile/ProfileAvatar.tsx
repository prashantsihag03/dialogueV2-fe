import { Avatar, Box, Stack, Typography } from '@mui/material'
import { ChangeEvent, useRef, useState } from 'react'
import ProfileTextField from './ProfileTextField'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import Dropzone from 'react-dropzone'

interface IProfileAvatarProps {
  userId: string
  name: string
  newName: string
  edit: boolean
  onNameChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  onProfileImgChange: (newImg: File) => void
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
  onProfileImgChange,
}: IProfileAvatarProps) => {
  const dropzoneRef = useRef<HTMLInputElement | null>(null)
  const [profilePicture, setProfilePicture] = useState<string | null>(null)

  const handleOpenFilePicker = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.click()
    }
  }

  const getProfileImgToRender = (): string | undefined => {
    if (profilePicture) {
      return profilePicture
    }
    if (profileImgSrc) {
      return `data:image;base64,${profileImgSrc}`
    }
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      className="profile-avatar"
    >
      <Dropzone
        onDrop={(acceptedFiles) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            // Check if the result is a string
            if (typeof reader.result === 'string') {
              setProfilePicture(reader.result)
              onProfileImgChange(acceptedFiles[0])
            }
          }
          reader.readAsDataURL(acceptedFiles[0])
        }}
        noClick={false}
        noDrag={true}
        multiple={false}
        accept={{ 'image/jpeg': ['.jpeg'], 'image/png': ['.png'] }}
        maxSize={409600}
      >
        {({ getRootProps, getInputProps }) => (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            position="relative"
            {...getRootProps()}
          >
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '0',
                backgroundColor: 'background.paper',
                opacity: 0.5,
                zIndex: edit ? 1 : -1,
              }}
            ></Box>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              width="100%"
              height="30%"
              bottom="0"
              zIndex={edit ? 2 : -1}
              sx={{
                backgroundColor: 'background.paper',
                opacity: 0.7,
              }}
            >
              <input {...getInputProps()} ref={dropzoneRef} />
              <AddAPhotoIcon onClick={handleOpenFilePicker} />
            </Stack>
            <Avatar
              className="profile-avatar"
              alt={`${name}'s Profile Picture`}
              src={getProfileImgToRender()}
              sx={{
                width: '12vw',
                maxWidth: '400px',
                height: '12vw',
              }}
            />
          </Stack>
        )}
      </Dropzone>

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
