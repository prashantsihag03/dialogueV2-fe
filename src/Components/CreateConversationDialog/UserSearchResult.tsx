import { Box, Checkbox, Stack } from '@mui/material'
import React from 'react'

interface UserSearchResultProps {
  name: string
  onClick: () => void
}

const UserSearchResult: React.FC<UserSearchResultProps> = ({
  name,
  onClick,
}: UserSearchResultProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="left"
      width="100%"
    >
      <Checkbox disabled />
      <Box
        onClick={onClick}
        borderRadius={0.8}
        sx={{
          width: '100%',
          padding: '1rem',
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'action.hover',
          },
        }}
      >
        {name}
      </Box>
    </Stack>
  )
}

export default UserSearchResult
