import { Button, FilledInputProps, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { containerStyles } from './styles'
import { useGetProfileQuery } from '../../store/api/slice'
import { ProfileHeader } from './ProfileHeader'
import { ProfileAvatar } from './ProfileAvatar'

export const Profile: React.FC = () => {
  const { isSuccess, data } = useGetProfileQuery()

  return (
    <Box sx={containerStyles}>
      <ProfileHeader />
      {isSuccess && data ? (
        <Stack
          direction="column"
          alignItems="center"
          justifyContent={'space-between'}
          width={'100%'}
          height={'100%'}
        >
          <Stack direction="column" alignItems="center" width={'100%'}>
            <ProfileAvatar
              name={data.fullname}
              lastOnline={data.lastOnlineUTCDateTime}
              profileImgSrc={data.profileImgSrc}
            />
            <Stack direction="column" alignItems="center" width={'100%'}>
              <TextField
                fullWidth
                InputProps={
                  {
                    disableUnderline: true,
                  } as Partial<FilledInputProps>
                }
                label="Bio"
                value="I can do this all day."
                variant="filled"
                disabled
                sx={{
                  marginTop: '1em',
                  '& .MuiFilledInput-root': {
                    borderRadius: '7px',
                  },
                }}
              />
            </Stack>
          </Stack>
          <Stack direction="column" alignItems="center" width={'100%'}>
            <Button variant="text" color="primary">
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
        </Stack>
      ) : null}
    </Box>
  )
}
