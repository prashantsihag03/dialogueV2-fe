import VideocamIcon from '@mui/icons-material/Videocam'
import CallEndIcon from '@mui/icons-material/CallEnd'
import { Stack, Typography } from '@mui/material'
import { useAppDispatch } from '../../store/hooks'
import { removeReceivingCall } from '../../store/rtc/slice'
import { OptionsObject, SnackbarKey } from 'notistack'
import React from 'react'

export interface CallPopUpProps extends OptionsObject<'callPopUp'> {
  callId: string
  snackbarId: SnackbarKey
}

const CallPopUp = React.forwardRef<HTMLDivElement, CallPopUpProps>(
  (props, ref) => {
    const dispatch = useAppDispatch()
    const { callId, snackbarId, style } = props

    return (
      <Stack
        component={'div'}
        ref={ref}
        direction="column"
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
        padding={'1rem 1rem'}
        borderRadius={1}
        sx={{ backgroundColor: 'secondary.light' }}
        style={style}
      >
        <Typography variant="subtitle1" width={'100%'} textAlign={'center'}>
          Incoming call
        </Typography>
        <Typography
          variant="body1"
          width={'100%'}
          textAlign={'center'}
          fontWeight={'bold'}
          marginBottom={'1rem'}
        >
          {callId}
        </Typography>
        <Stack
          direction="row"
          justifyContent={'space-around'}
          alignItems={'center'}
          width={'100%'}
        >
          <CallEndIcon
            fontSize="large"
            sx={{
              color: 'primary.dark',
              backgroundColor: 'error.main',
            }}
            onClick={() => {
              dispatch(removeReceivingCall(snackbarId))
              dispatch({
                type: 'socket/reject',
                payload: {
                  userToAnswer: callId,
                },
              })
            }}
          />
          <VideocamIcon
            fontSize="large"
            sx={{
              color: 'primary.dark',
              backgroundColor: 'success.main',
              marginRight: '0.5rem',
            }}
            onClick={() => {
              dispatch(removeReceivingCall(snackbarId))
              dispatch({
                type: 'socket/accept',
                payload: {
                  userToAnswer: callId,
                },
              })
            }}
          />
        </Stack>
      </Stack>
    )
  }
)

CallPopUp.displayName = 'CallPopUp'

export default CallPopUp
