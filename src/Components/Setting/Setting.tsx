import { Box, List, Stack, Switch, Typography } from '@mui/material'
import TourIcon from '@mui/icons-material/Tour'
import { containerStyles, headingStyles } from './styles'

const Setting: React.FC = () => {
  return (
    <Box sx={containerStyles} className="setting-sidebar">
      <Box sx={headingStyles}>
        <Typography variant="h2">Settings</Typography>
      </Box>
      <List sx={{ width: '100%', padding: '3% 0%' }} dense>
        <Stack component="li" direction="column" width="100%">
          <Stack
            component="li"
            direction="row"
            justifyContent={'space-between'}
          >
            <Stack
              component="li"
              direction="row"
              justifyContent={'flex-start'}
              alignItems="center"
            >
              <TourIcon fontSize="medium" />
              <Typography variant="body2">Greet me everytime</Typography>
            </Stack>
            <Switch
              edge="end"
              size="small"
              inputProps={{
                'aria-labelledby': 'switch-list-label-wifi',
              }}
              checked={false}
            />
          </Stack>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ paddingLeft: '1.5rem' }}
          >
            Page refresh required for change to take effect.
          </Typography>
        </Stack>
      </List>
    </Box>
  )
}

export default Setting
