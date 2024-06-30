import ErrorIcon from '@mui/icons-material/Error'
import { Skeleton, Stack, Switch, Typography } from '@mui/material'
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
      <Stack
        component="li"
        direction="row"
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack
          component="li"
          direction="row"
          justifyContent={'flex-start'}
          alignItems="center"
        >
          {icon}
          <Typography variant="body2">
            {settingKeyDisplayName}
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ padding: '0', lineHeight: 1 }}
            >
              {note ? note : null}
              {result.isError ? 'Error updating setting!' : null}
            </Typography>
          </Typography>
        </Stack>
        {isFetching ? (
          <Skeleton variant="rounded" width={'2em'} height={'1em'} />
        ) : null}
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
    </Stack>
  )
}

export default SwitchSetting
