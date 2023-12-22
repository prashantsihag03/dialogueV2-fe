import { MoreVert } from '@mui/icons-material'
import { Menu } from '@mui/material'
import { useState } from 'react'

interface VerticalDotMenuProps {
  children: React.ReactNode
}

const VerticalDotMenu: React.FC<VerticalDotMenuProps> = ({
  children,
}: VerticalDotMenuProps) => {
  const [optionMenuAnchorEl, setOptionMenuAnchorEl] =
    useState<SVGSVGElement | null>(null)

  const closeOptionMenu = () => {
    setOptionMenuAnchorEl(null)
  }

  const handleConvoOptionClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setOptionMenuAnchorEl(event.currentTarget)
  }

  return (
    <>
      <MoreVert
        sx={{ marginLeft: '1.2rem' }}
        fontSize="small"
        titleAccess="options for currently active conversation"
        className="conversation-box-conversation-options-icon"
        onClick={handleConvoOptionClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={optionMenuAnchorEl}
        open={optionMenuAnchorEl ? true : false}
        onClose={closeOptionMenu}
        MenuListProps={{
          variant: 'menu',
          onClick: () => {
            closeOptionMenu()
          },
          'aria-labelledby': 'basic-button',
        }}
      >
        {children}
      </Menu>
    </>
  )
}

export default VerticalDotMenu
