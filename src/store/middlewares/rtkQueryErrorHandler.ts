import { isRejectedWithValue } from '@reduxjs/toolkit'

const rtkQueryErrorMiddleware = () => (next: any) => (action: any) => {
  if (isRejectedWithValue(action)) {
    const responsePayload = action.payload
    if (responsePayload?.originalStatus === 401) {
      console.log(
        'Api rejected with unauthorized. Redirecting to register page ...'
      )
      window.location.href = '/register'
    }
  }
  return next(action)
}

export default rtkQueryErrorMiddleware
