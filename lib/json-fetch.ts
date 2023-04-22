interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: any
}

interface FetchError {
  type: string
  message: string
}

export async function jsonFetch<R>(
  url: string,
  {method, data}: FetchOptions = {},
): Promise<{
  error: FetchError | undefined
  response: R
}> {
  const response = await fetch(url, {
    method,
    headers: {
      ...(data ? {'Content-Type': 'application/json'} : {}),
    },
    body: data ? JSON.stringify(data) : undefined,
  })

  let error: FetchError | undefined

  if (!response.ok) {
    error = {
      type: 'unknown',
      message: 'Something went wrong',
    }

    try {
      const json = await response.json()
      error = json.error
    } catch (error) {
      console.error(error)
    }
  }

  const jsonResponse = (await response.json()) as R

  return {
    error,
    response: jsonResponse,
  }
}
