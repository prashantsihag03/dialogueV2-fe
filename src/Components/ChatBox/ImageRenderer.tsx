import { Box, CircularProgress, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface ImageRendererProps {
  file: File
  width?: string
  height?: string
  marginRight?: string
  showBackLight?: boolean
}

const ImageRenderer: React.FC<ImageRendererProps> = ({
  file,
  width,
  height,
  marginRight,
  showBackLight,
}: ImageRendererProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    try {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result)
        }
      }

      if (file != null) {
        reader.readAsDataURL(file)
      }
    } catch (e) {
      console.error(
        'Error encountered while loading image with file as : ',
        file,
        e
      )
    }
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
          {showBackLight === true ? (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
              position="absolute"
              borderRadius={100}
              top="0"
              sx={{
                backgroundColor: 'transparent',
                zIndex: 1,
              }}
            >
              <Box
                width="30px"
                height="30px"
                borderRadius={100}
                sx={{
                  boxShadow: 'rgba(211, 211, 211, 0.61) 0px 0px 900px 100px',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                }}
              ></Box>
            </Stack>
          ) : null}
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
              width: '100%',
              height: '100%',
              zIndex: 1,
              objectFit: 'contain',
            }}
          />
        </>
      ) : null}
    </Stack>
  )
}

export default ImageRenderer
