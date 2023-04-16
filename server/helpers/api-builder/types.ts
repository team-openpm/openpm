import {z} from 'zod'

export interface ApiBuilderPathArgsWithParams {
  params?: {
    [key: string]: any
  }
}

export type ApiBuilderHandler<TRequestParams, TRequestArgs> = (
  request: Request,
  args: TRequestArgs & {
    data: TRequestParams
  },
) => Response | Promise<Response>

export interface ApiBuilderOptions {
  schema: z.ZodType
}

export const optionalDateSchema = z
  .string()
  .nullable()
  .transform((value) => (value === '' ? null : value))
  .pipe(z.coerce.date().nullable().default(null))
