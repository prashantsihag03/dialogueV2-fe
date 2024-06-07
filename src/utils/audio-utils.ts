export const MSG_RECEIVED = '/audio/bell-short.wav'
export const MSG_SENT = '/audio/pop-1.mp3'

type SoundAlertType = typeof MSG_RECEIVED | typeof MSG_SENT

export const playSoundAlert = (soundAlertType: SoundAlertType) => {
  const audio = new Audio(soundAlertType)
  audio.play()
}
