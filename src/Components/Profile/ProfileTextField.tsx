import { FilledInputProps, TextField } from '@mui/material'
import { ChangeEvent } from 'react'

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
}: ProfileTextFieldProps) => {
  return (
    <TextField
      className={id ? `${id}-textfield` : undefined}
      fullWidth={isFullWidth ?? true}
      size={fieldSize ?? undefined}
      InputProps={
        {
          disableUnderline: true,
          sx: {
            fontSize: inputFontSize ?? '0.8rem',
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
          fontSize: '0.9rem',
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
        },
      }}
    />
  )
}

export default ProfileTextField
