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
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis. Velit ut tortor pretium viverra suspendisse potenti. '
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="outgoing"
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis. Velit ut tortor pretium viverra suspendisse potenti. '
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="incoming"
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis. Velit ut tortor pretium viverra suspendisse potenti. '
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="outgoing"
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis. Velit ut tortor pretium viverra suspendisse potenti. '
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="incoming"
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis. Velit ut tortor pretium viverra suspendisse potenti. '
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="outgoing"
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis. Velit ut tortor pretium viverra suspendisse potenti. '
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="incoming"
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis. Velit ut tortor pretium viverra suspendisse potenti. '
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="outgoing"
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis. Velit ut tortor pretium viverra suspendisse potenti. '
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="outgoing"
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis. Velit ut tortor pretium viverra suspendisse potenti. '
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="incoming"
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis. Velit ut tortor pretium viverra suspendisse potenti. '
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="incoming"
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis. Velit ut tortor pretium viverra suspendisse potenti. '
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="incoming"
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis. Velit ut tortor pretium viverra suspendisse potenti. '
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="outgoing"
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis. Velit ut tortor pretium viverra suspendisse potenti. '
          }
        />
        <Message
          name={name}
          timeStamp={'9:13'}
          source="incoming"
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis. Velit ut tortor pretium viverra suspendisse potenti. '
          }
        />
      </Box>
      <Box sx={{ width: '100%', paddingTop: '2rem' }}>
        <MessageInputBox />
      </Box>
    </Box>
  )
}
