import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useAppDispatch } from '../../store/hooks'
import { setGreet, setRunGuidedTour } from '../../store/config/slice'

interface TourBeginDialogProps {
  open: boolean
}

const TourBeginDialog: React.FC<TourBeginDialogProps> = ({
  open,
}: TourBeginDialogProps) => {
  const dispatch = useAppDispatch()
  const isMobile = useMediaQuery('(max-width:600px)')

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
      onClose={(e, reason) => {
        if (reason === 'backdropClick') return
        dispatch(setGreet(false))
      }}
    >
      <DialogTitle sx={{ color: 'secondary.main' }}>
        <b>Greetings,</b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2" component="p">
            Thank you for taking the time to explore Dialogue.
          </Typography>
          <br />
          <Typography variant="body2" component="p">
            Dialogue is more than just a chat application; it&apos;s a personal
            project crafted with the intention to upskill and showcase my
            proficiency in a variety of tools and technologies.
          </Typography>
          {!isMobile ? (
            <>
              <br />
              <Typography variant="body2" component="p">
                Would you be interested in a brief tour of the application?
                It&apos;s an opportunity to witness firsthand the dedication and
                innovation behind this self-upskilling endeavor.
              </Typography>
            </>
          ) : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {!isMobile ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              dispatch(setGreet(false))
              dispatch(setRunGuidedTour(true))
            }}
          >
            Start Tour
          </Button>
        ) : null}
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            dispatch(setGreet(false))
            dispatch(setRunGuidedTour(false))
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TourBeginDialog
