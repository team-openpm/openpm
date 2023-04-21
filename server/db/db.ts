import 'server-only'

import {Kysely, PostgresDialect} from 'kysely'
import {Pool} from 'pg'

import {assertString} from '@/lib/assert'

import {DB} from './types'

assertString(process.env.DATABASE_URL, 'DATABASE_URL is not set')

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
})
