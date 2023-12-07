import ErrorIcon from '@mui/icons-material/Error'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import {
  CircularProgress,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  IUserSettings,
  useGetUserSettingsQuery,
  useUpdateUserSettingMutation,
} from '../../store/api/slice'
import React from 'react'
import isTrue from '../../utils/common-utils'

interface SwitchSettingProps {
  settingKey: keyof IUserSettings
  settingKeyDisplayName: string
  icon: React.ReactNode
  note?: string
}

const SwitchSetting: React.FC<SwitchSettingProps> = ({
  settingKey,
  settingKeyDisplayName,
  icon,
  note,
}: SwitchSettingProps) => {
  const [updateUserSettings, result] = useUpdateUserSettingMutation()
  const { isFetching, isError, data } = useGetUserSettingsQuery(settingKey)

  return (
    <Stack
      component="li"
      direction="column"
      width="100%"
      sx={{
        marginBottom: '1rem',
      }}
    >
      <Stack component="li" direction="row" justifyContent={'space-between'}>
        <Stack
          component="li"
          direction="row"
          justifyContent={'flex-start'}
          alignItems="center"
        >
          {icon}
          <Typography variant="body2">{settingKeyDisplayName}</Typography>
          <Tooltip title={note ? note : null}>
            <InfoOutlinedIcon sx={{ fontSize: '1.5rem' }} />
          </Tooltip>
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
            defaultChecked={isTrue(data[settingKey])}
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
