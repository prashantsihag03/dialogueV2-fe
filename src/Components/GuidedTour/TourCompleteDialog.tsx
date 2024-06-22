import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from '@mui/material'
import { useAppDispatch } from '../../store/hooks'
import { setShowGuidedTourFinishedDialog } from '../../store/config/slice'
import { useUpdateUserSettingMutation } from '../../store/api/slice'

const TourCompleteDialog: React.FC<{ open: boolean }> = ({
  open,
}: {
  open: boolean
}) => {
  const dispatch = useAppDispatch()
  const [updateUserSetting] = useUpdateUserSettingMutation()

  return (
    <Dialog
      open={open}
      keepMounted={false}
      TransitionComponent={Slide}
      transitionDuration={200}
      fullWidth
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <DialogTitle sx={{ color: 'secondary.main' }}>
        <b>Tour Finished</b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body1" component="p">
            Thank you for finishing the tour. I hope you liked it. You can go
            through the guided tour again by enabling the &quot;Greet Me&quot;
            setting.
          </Typography>
          <br />
          <Typography variant="body1" component="p">
            Please feel free to leave any feedback as a message to my userid:{' '}
            <i>prashant</i>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          sx={{ padding: '0.2em 1em' }}
          onClick={() => {
            dispatch(setShowGuidedTourFinishedDialog(false))
            updateUserSetting({
              key: 'greetMeEverytime',
              value: false,
            })
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TourCompleteDialog
