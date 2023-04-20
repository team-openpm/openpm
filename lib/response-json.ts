export async function safeJson(response: Response) {
  try {
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}
