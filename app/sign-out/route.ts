import {NextResponse} from 'next/server'

export async function GET() {
  const response = new NextResponse('', {
    status: 302,
    headers: {
      Location: '/',
    },
  })

  response.cookies.delete('hanko')

  return response
}
