import { Box, Divider } from '@mui/material'
import { Header } from './Header/Header'
import {
  chatBoxHeadingContainerStyle,
  containerStyle,
  messages,
} from './styles'
import MessageInputBox from './MessageInputBox'
import Message from '../Message'
import { useAppSelector } from '../../store/hooks'
import { getActiveChatName } from '../../store/chats/selector'

export const ChatBox: React.FC = () => {
  const name = useAppSelector(getActiveChatName)
  return (
    <Box sx={containerStyle}>
      <Box sx={chatBoxHeadingContainerStyle}>
        <Header name={name} online={true} />
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
