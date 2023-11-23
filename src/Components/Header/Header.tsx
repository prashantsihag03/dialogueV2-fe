/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Box } from '@mui/system'
import Menu from '../Menu'
import logo from '../../assets/allThemedDialogueLogo.svg'
import { DisplayMode } from '../../Theme/types'
import { containerStyles } from './styles'
import { Grow } from '@mui/material'

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
      <Grow appear in mountOnEnter unmountOnExit timeout={500}>
        <img
          src={logo}
          alt="Dialogue Logo"
          style={{ cursor: 'pointer', width: '100px' }}
          onClick={() => {
            window.location.href = window.location.origin
          }}
        />
      </Grow>
      <Menu displayMode={displayMode} toggleDisplayMode={toggleDisplayMode} />
    </Box>
  )
}
