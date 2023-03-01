import { Box } from '@mui/system'
import Menu from '../Menu'
import logo from '../../assets/Logo.svg'
import { DisplayMode } from '../../Theme/types'
import { containerStyles } from './styles'

interface IHeader {
  displayMode: DisplayMode
  toggleDisplayMode: () => void
}

export const Header: React.FC<IHeader> = ({
  displayMode,
  toggleDisplayMode,
}: IHeader) => {
  return (
    <Box sx={containerStyles}>
      <img src={logo} alt="YourChats Logo" style={{ cursor: 'pointer' }} />
      <Menu displayMode={displayMode} toggleDisplayMode={toggleDisplayMode} />
    </Box>
  )
}
