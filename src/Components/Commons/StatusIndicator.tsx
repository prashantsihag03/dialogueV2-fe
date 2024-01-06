import { CircularProgress, Stack, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

interface StatusIndicatorProps {
  status?: 'error' | 'loading' | 'warn'
  message?: string
}

const getIconByStatus = (status: 'error' | 'loading' | 'warn' | undefined) => {
  if (status === 'error')
    return <ErrorIcon sx={{ fontSize: '4rem', color: 'error.main' }} />
  if (status === 'warn')
    return <ErrorIcon sx={{ fontSize: '4rem', color: 'warning.main' }} />
  return <CircularProgress size={'4rem'} sx={{ color: 'primary.main' }} />
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  message,
}: StatusIndicatorProps) => {
  return (
    <Stack
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
      height={'100%'}
    >
      {getIconByStatus(status)}
      {message && message.length > 0 ? (
        <Typography variant="body1">{message}</Typography>
      ) : null}
    </Stack>
  )
}

export default StatusIndicator
