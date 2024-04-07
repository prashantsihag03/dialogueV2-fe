import { List } from '@mui/material'
import SwitchSetting from './SwitchSetting'
import KeyboardIcon from '@mui/icons-material/Keyboard'
import TourIcon from '@mui/icons-material/Tour'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser'
import ViewCompactAltIcon from '@mui/icons-material/ViewCompactAlt'
import SideBar from '../Sidebar'
import { getSideBarPreference } from '../../store/sidebar/selector'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getActiveConversation } from '../../store/chats/selector'
import { setActiveSideBar } from '../../store/sidebar/slice'

const Setting: React.FC = () => {
  const appDispatch = useAppDispatch()
  const browser = useAppSelector(getSideBarPreference)
  const activeConversation = useAppSelector(getActiveConversation)

  return (
    <SideBar
      className="setting-sidebar"
      title="Settings"
      onBack={() => {
        if (activeConversation != null && browser === 'mobile') {
          appDispatch(setActiveSideBar('none'))
          return
        }
        appDispatch(setActiveSideBar('chats'))
      }}
    >
      <List sx={{ width: '100%', padding: '1rem 0' }} dense>
        <SwitchSetting
          settingKey="enterSendsMessage"
          settingKeyDisplayName="Enter sends message"
          note="Enter key will send the typed message."
          icon={<KeyboardIcon fontSize="medium" />}
        />
        <SwitchSetting
          settingKey="greetMeEverytime"
          settingKeyDisplayName="Greet me"
          icon={<TourIcon fontSize="medium" />}
          note="Greetings will be offered next time site reloads."
        />
        <SwitchSetting
          settingKey="openExistingConversation"
          settingKeyDisplayName="Open Existing Conversation"
          icon={<OpenInBrowserIcon fontSize="medium" />}
          note="When creating new conversations, if conversation already exists, open it. This only applies to one on one conversations."
        />
        <SwitchSetting
          settingKey="compactConversationView"
          settingKeyDisplayName="Use Compact Chat View"
          icon={<ViewCompactAltIcon fontSize="medium" />}
          note="Displays conversation with a compact view."
        />
      </List>
    </SideBar>
  )
}

export default Setting
