import Link from 'next/link'

export const PackageDescription = ({
  packageId,
  description,
  maxLength,
}: {
  packageId: string
  description: string
  maxLength?: number
}) => {
  const cleanedDescription = cleanDescription(description)
  const shouldTruncate = maxLength ? cleanedDescription.length > maxLength : false
  const truncatedDescription = shouldTruncate
    ? cleanedDescription.substring(0, maxLength) + '...'
    : cleanedDescription

  return (
    <div className="prose prose-sm">
      {truncatedDescription}

      {shouldTruncate && (
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

/**
 * Removes markdown specific characters
 *
 * @param description - The input string to be cleaned.
 * @returns The cleaned description string
 */

function cleanDescription(description: string): string {
  // - Strip `#` `*`, `_` and `[]()` from description
  // Strip html tags

  return description
    .replace(/[`#*_]/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/<[^>]*>/g, '')
}
