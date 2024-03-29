import { CircularProgress, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

interface ImageRendererProps {
  file: File
  width?: string
  height?: string
  marginRight?: string
  showRemoveIcon?: boolean
  onRemove?: () => void
}

const ImageRenderer: React.FC<ImageRendererProps> = ({
  file,
  width,
  height,
  marginRight,
  showRemoveIcon,
  onRemove,
}: ImageRendererProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    const reader = new FileReader()

    reader.onloadend = () => {
      // Check if the result is a string
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result)
      }
    }

    // Read the content of the file as a data URL
    reader.readAsDataURL(file)
  }, [file])

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width={width ? width : 'auto'}
      height={height ? height : 'auto'}
      position="relative"
      marginRight={marginRight ? marginRight : undefined}
    >
      {imageUrl ? (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            position="absolute"
            top="0"
            sx={{
              backgroundColor: 'transparent',
              zIndex: 2,
            }}
          >
            {showRemoveIcon ? (
              <DeleteIcon
                sx={{
                  fontSize: '2rem',
                  backgroundColor: 'background.paper',
                  borderRadius: '12px',
                }}
                onClick={onRemove ? onRemove : undefined}
                titleAccess="Remove this attachment."
              />
            ) : null}
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            position="absolute"
            top="0"
            sx={{
              backgroundColor: 'transparent',
            }}
          >
            <CircularProgress />
          </Stack>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{
              borderRadius: '12px',
              boxShadow: '0 0 9px 1px #545454',
              width: '100%',
              height: '100%',
              zIndex: 1,
            }}
          />
        </>
      ) : null}
    </Stack>
  )
}

export default ImageRenderer
