export const getParams = (request: Request) => {
  const uri = new URL(request.url)
  return uri.searchParams
}
