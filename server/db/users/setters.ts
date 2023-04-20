import {db} from '../db'

export const setUser = async ({
  id,
  emails,
  signInDate,
}: {
  id: string
  emails: string[]
  signInDate: Date
}) => {
  // Insert or update the user's emails and last sign in time
  await db
    .insertInto('users')
    .values({
      id: id,
      emails: JSON.stringify(emails),
      last_sign_in_at: signInDate,
    })
    .onConflict((oc) =>
      oc.column('id').doUpdateSet({
        emails: JSON.stringify(emails),
        last_sign_in_at: signInDate,
      }),
    )
    .execute()
}
