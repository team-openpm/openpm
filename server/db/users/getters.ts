import {db} from '../db'

export async function getUserById(userId: string) {
  const user = await db
    .selectFrom('users')
    .selectAll()
    .where('id', '=', userId)
    .executeTakeFirst()

  if (!user) {
    return null
  }

  return {
    id: user.id,
    emails: user.emails as string[],
  }
}
