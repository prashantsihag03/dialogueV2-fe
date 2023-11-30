import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CheckSharpIcon from '@mui/icons-material/CheckSharp'
import { actionIconStyles, actionStyles, headerContainerStyles } from './styles'

interface ProfileHeaderProps {
  showEdit: boolean
  editing: boolean
  onEditClick: () => void
  onConfirmClick: () => void
}
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  showEdit,
  editing,
  onEditClick,
  onConfirmClick,
}: ProfileHeaderProps) => {
  return (
    <Box sx={headerContainerStyles}>
      <Typography variant="h2">Profile</Typography>
      {showEdit ? (
        <Box sx={actionStyles}>
          {editing ? (
            <CheckSharpIcon
              sx={actionIconStyles}
              onClick={onConfirmClick}
              className="profile-save"
            />
          ) : (
            <EditOutlinedIcon
              sx={actionIconStyles}
              onClick={onEditClick}
              className="profile-edit"
            />
          )}
        </Box>
      ) : null}
    </Box>
  )
}
