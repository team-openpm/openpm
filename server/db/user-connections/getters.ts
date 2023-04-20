import {db} from '../db'

export function getConnectionsByUserId(userId: string) {
  return db
    .selectFrom('user_connections')
    .selectAll()
    .where('user_id', '=', userId)
    .execute()
}
