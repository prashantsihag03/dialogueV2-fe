import { Box, Skeleton } from '@mui/material'
import {
  containerStyles,
  contentContainerStyles,
  contentMainTextStyles,
  profileContainerStyle,
  subContainerStyles,
} from './styles'

export const ChatQuickViewSkeleton: React.FC = () => {
  return (
    <Box
      sx={{
        ...containerStyles,
        '&:hover': { cursor: 'default' },
        '&:after': {
          backgroundColor: 'none',
          transition: 'none',
          display: 'none',
        },
        '&:hover:after': { width: '0' },
      }}
    >
      <Box sx={{ ...subContainerStyles, height: '3rem' }}>
        <Box sx={profileContainerStyle}>
          <Skeleton
            variant="circular"
            animation="wave"
            sx={{ width: '100%', height: '2.5rem' }}
          />
        </Box>
        <Box sx={contentContainerStyles}>
          <Box sx={{ ...contentMainTextStyles, width: '100%' }}>
            <Skeleton variant="text" animation="wave" sx={{ width: '100%' }} />
            <Skeleton variant="text" animation="wave" sx={{ width: '100%' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
