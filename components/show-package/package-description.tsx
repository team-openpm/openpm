import Link from 'next/link'

import {cleanDescription} from '@/lib/description'

export const PackageDescription = ({
  packageId,
  description,
  maxLength,
  showMore = true,
}: {
  packageId: string
  description: string
  showMore?: boolean
  maxLength?: number
}) => {
  const cleanedDescription = cleanDescription(description)
  const willTruncate = maxLength ? cleanedDescription.length > maxLength : false
  const truncatedDescription = willTruncate
    ? cleanedDescription.substring(0, maxLength) + '...'
    : cleanedDescription

  return (
    <div className="prose prose-sm">
      {truncatedDescription}

      {willTruncate && showMore && (
        <Link
          prefetch={false}
          href={`/packages/${packageId}/description`}
          className="mx-1 text-blue-500"
        >
          read more
        </Link>
      )}
    </div>
  )
}
