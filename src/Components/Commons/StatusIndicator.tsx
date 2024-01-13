import { CircularProgress, Stack, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

interface StatusIndicatorProps {
  status?: 'error' | 'loading' | 'warn'
  message?: string
  loaderColor?: 'primary' | 'secondary'
}

const getIconByStatus = (
  status: 'error' | 'loading' | 'warn' | undefined,
  loaderColor: 'primary' | 'secondary'
) => {
  if (status === 'error')
    return <ErrorIcon sx={{ fontSize: '4rem', color: 'error.main' }} />
  if (status === 'warn')
    return <ErrorIcon sx={{ fontSize: '4rem', color: 'warning.main' }} />
  return (
    <CircularProgress size={'4rem'} sx={{ color: `${loaderColor}.main` }} />
  )
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  message,
  loaderColor,
}: StatusIndicatorProps) => {
  return (
    <Stack
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
      height={'100%'}
    >
      {getIconByStatus(status, loaderColor ? loaderColor : 'secondary')}
      {message && message.length > 0 ? (
        <Typography variant="body1" marginTop={'0.5rem'}>
          {message}
        </Typography>
      ) : null}
    </Stack>
  )
}

export default StatusIndicator
