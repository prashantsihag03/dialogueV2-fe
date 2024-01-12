import { Stack, Typography } from '@mui/material'
import { useAppSelector } from '../../store/hooks'
import { getSideBarPreference } from '../../store/sidebar/selector'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

interface SidebarProps {
  title: string
  headerActions?: React.ReactNode
  children: React.ReactNode
  footerActions?: React.ReactNode
  onBack?: () => void
  showBackbtn?: boolean
  className?: string
}

export const SideBar: React.FC<SidebarProps> = ({
  title,
  headerActions,
  children,
  footerActions,
  onBack,
  showBackbtn,
  className,
}: SidebarProps) => {
  const browser = useAppSelector(getSideBarPreference)

  return (
    <Stack
      width="100%"
      height="100%"
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      padding="4%"
      className={`sidebar ${className ?? ''}`}
    >
      <Stack
        width="100%"
        margin="0.5rem"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          {browser === 'mobile' && showBackbtn !== false ? (
            <ArrowBackIosIcon sx={{ marginRight: '0.5rem' }} onClick={onBack} />
          ) : null}
          <Typography variant="h2">{title}</Typography>
        </Stack>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {headerActions}
        </Stack>
      </Stack>
      {children}
      <Stack
        width="100%"
        paddingTop="0.3rem"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {footerActions}
      </Stack>
    </Stack>
  )
}
