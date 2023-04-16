import {NextResponse} from 'next/server'

export const error = (message: string, type = 'invalid_request', status = 400) => {
  return NextResponse.json(
    {
      error: {message, type},
    },
    {
      status,
    },
  )
}
