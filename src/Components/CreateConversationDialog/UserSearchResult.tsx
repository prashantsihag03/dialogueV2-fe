import { Box, Checkbox, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { setFirstUserSearchResultMounted } from '../../store/chats/slice'

interface UserSearchResultProps {
  name: string
  onClick: () => void
  id?: string
}

const UserSearchResult: React.FC<UserSearchResultProps> = ({
  name,
  onClick,
  id,
}: UserSearchResultProps) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id === 'first') {
      dispatch(setFirstUserSearchResultMounted(true))
    }
  }, [])

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="left"
      width="100%"
      className={id ? `${id}-user-search-result` : undefined}
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
