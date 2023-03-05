import { Box } from '@mui/system'
import Menu from '../Menu'
import logo from '../../assets/Logo.svg'
import { DisplayMode } from '../../Theme/types'
import { containerStyles } from './styles'
import { Zoom } from '@mui/material'

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
      <Zoom in>
        <img src={logo} alt="YourChats Logo" style={{ cursor: 'pointer' }} />
      </Zoom>
      <Menu displayMode={displayMode} toggleDisplayMode={toggleDisplayMode} />
    </Box>
  )
}
