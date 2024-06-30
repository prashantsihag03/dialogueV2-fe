import { FilledInputProps, TextField } from '@mui/material'
import { ChangeEvent } from 'react'
import { useAppSelector } from '../../store/hooks'
import { getSideBarPreference } from '../../store/sidebar/selector'

interface ProfileTextFieldProps {
  id?: string
  mode: 'edit' | 'view'
  fieldSize?: 'small' | 'medium'
  fieldValue: unknown
  labelText: string
  textFieldVariant: 'standard' | 'filled' | 'outlined'
  onFieldValueChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  inputFontSize?: string
  isFullWidth?: boolean
  inputTextAlign?: 'left' | 'center' | 'right'
  showLabel?: 'onEdit' | 'always'
  multiline?: boolean
  bgColor?: string
}

const ProfileTextField: React.FC<ProfileTextFieldProps> = ({
  mode,
  fieldSize,
  fieldValue,
  inputFontSize,
  labelText,
  onFieldValueChange,
  textFieldVariant,
  isFullWidth,
  inputTextAlign,
  showLabel,
  id,
  multiline,
  bgColor = 'transparent',
}: ProfileTextFieldProps) => {
  const browser = useAppSelector(getSideBarPreference)
  return (
    <TextField
      className={id ? `${id}-textfield` : undefined}
      fullWidth={isFullWidth ?? true}
      size={fieldSize ?? undefined}
      multiline={multiline ?? false}
      maxRows={5}
      InputProps={
        {
          disableUnderline: true,
          sx: {
            fontSize: inputFontSize
              ? inputFontSize
              : browser === 'mobile'
              ? '0.7rem'
              : '0.8rem',
          },
        } as Partial<FilledInputProps>
      }
      inputProps={{
        readonly: mode === 'edit' ? undefined : 'true',
        style: {
          textAlign: inputTextAlign ?? 'left',
          color: 'primary.main',
        },
      }}
      InputLabelProps={{
        style: {
          fontSize: browser === 'mobile' ? '0.8rem' : '0.9rem',
          color: '#838383',
        },
      }}
      label={
        showLabel === 'onEdit'
          ? mode === 'edit'
            ? labelText
            : undefined
          : labelText
      }
      hiddenLabel={
        showLabel === 'onEdit' ? (mode === 'edit' ? false : true) : false
      }
      aria-label={labelText}
      value={fieldValue}
      onChange={mode === 'edit' ? onFieldValueChange : undefined}
      variant={textFieldVariant}
      sx={{
        marginTop: '0.5em',
        '& .MuiFilledInput-root': {
          borderRadius: '7px',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: bgColor,
          },
          '&:focus': {
            backgroundColor: bgColor,
          },
        },
      }}
    />
  )
}

export default ProfileTextField
