export interface PackageResponse {
  id: string
  name: string
  description: string
  version: string
  domain: string
  published_at: string
}

export interface PaginatedResponse {
  items: PackageResponse[]
  total: number
}
