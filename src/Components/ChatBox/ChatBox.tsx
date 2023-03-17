import { Box, Divider } from '@mui/material'
import { Header, IActiveChatHeader } from './Header/Header'
import { containerStyle, messages } from './styles'
import MessageInputBox from './MessageInputBox'
import Message from '../Message'

export type IChatBox = IActiveChatHeader

export const ChatBox: React.FC<IChatBox> = ({
  name = 'Steve Rogers',
  online,
}: IChatBox) => {
  return (
    <Box sx={containerStyle}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Header name={name} online={online} />
        <Divider color="primary" sx={{ width: '100%' }} />
      </Box>
      <Box sx={messages}>
        <Message
          name={name}
          timeStamp={'9:13'}
          source="incoming"
          text={
            'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.'
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="outgoing"
          text={
            'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.'
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="incoming"
          text={
            'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.'
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="outgoing"
          text={
            'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.'
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="incoming"
          text={
            'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.'
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="outgoing"
          text={
            'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.'
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="incoming"
          text={
            'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.'
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="outgoing"
          text={
            'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.'
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="outgoing"
          text={
            'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.'
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="incoming"
          text={
            'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.'
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="incoming"
          text={
            'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.'
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="incoming"
          text={
            'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.'
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="outgoing"
          text={
            'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.'
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="incoming"
          text={
            'No. I told you. Did you even listen to what vision said. If we do this, then we are no better than the bad guys.'
          }
        />
      </Box>
      <Box sx={{ width: '100%', paddingTop: '2rem' }}>
        <MessageInputBox />
      </Box>
    </Box>
  )
}
