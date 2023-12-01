import TourIcon from '@mui/icons-material/Tour'
import ErrorIcon from '@mui/icons-material/Error'
import { CircularProgress, Stack, Switch, Typography } from '@mui/material'
import {
  IUserSettings,
  useGetUserSettingsQuery,
  useUpdateUserSettingMutation,
} from '../../store/api/slice'

interface SwitchSettingProps {
  settingKey: keyof IUserSettings
  settingKeyDisplayName: string
}

const SwitchSetting: React.FC<SwitchSettingProps> = ({
  settingKey,
  settingKeyDisplayName,
}: SwitchSettingProps) => {
  const [updateUserSettings, result] = useUpdateUserSettingMutation()
  const { isFetching, isError, data } = useGetUserSettingsQuery(settingKey)

  if (data != null) console.log('Get query data checked is: ', data[settingKey])

  return (
    <Stack component="li" direction="column" width="100%">
      <Stack component="li" direction="row" justifyContent={'space-between'}>
        <Stack
          component="li"
          direction="row"
          justifyContent={'flex-start'}
          alignItems="center"
        >
          <TourIcon fontSize="medium" />
          <Typography variant="body2">{settingKeyDisplayName}</Typography>
        </Stack>
        {isFetching ? <CircularProgress /> : null}
        {isError && !isFetching ? <ErrorIcon fontSize="medium" /> : null}
        {data && !isFetching ? (
          <Switch
            edge="end"
            size="small"
            inputProps={{
              'aria-labelledby': 'switch-list-label-wifi',
            }}
            disabled={result.isLoading}
            defaultChecked={data[settingKey] === 'true'}
            onChange={(e, checked) => {
              updateUserSettings({
                key: settingKey,
                value: checked,
              })
            }}
          />
        ) : null}
      </Stack>
      <Typography
        variant="subtitle1"
        component="div"
        sx={{ paddingLeft: '1.5rem' }}
      >
        {result.isError ? 'Error updating setting!' : null}
      </Typography>
    </Stack>
  )
}

export default SwitchSetting
