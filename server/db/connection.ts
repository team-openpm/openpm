import 'server-only'

import {Pool} from '@neondatabase/serverless'
import {Kysely, PostgresDialect} from 'kysely'

import {DB} from './types'

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
})
