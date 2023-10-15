import { Avatar, Typography } from '@mui/material'
import { Box } from '@mui/system'

interface IProfileAvatarProps {
  name: string
  lastOnline: string
  profileImgSrc: string
}

export const ProfileAvatar: React.FC<IProfileAvatarProps> = ({
  name,
  lastOnline,
  profileImgSrc,
}: IProfileAvatarProps) => {
  console.log(name, lastOnline, profileImgSrc)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Avatar
        alt={`${name}'s Profile Picture`}
        src={`${profileImgSrc}`}
        sx={{
          width: '12vw',
          maxWidth: '400px',
          height: '12vw',
        }}
      />
      <Typography variant="body1" fontSize="1.5rem" sx={{ marginTop: '0.5em' }}>
        {name}
      </Typography>
      <Typography variant="subtitle1">Last online {lastOnline}</Typography>
    </Box>
  )
}
