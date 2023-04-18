/**
 * Removes markdown specific characters
 *
 * @param description - The input string to be cleaned.
 * @returns The cleaned description string
 */

export function cleanDescription(description: string): string {
  // - Strip `#` `*`, `_` and `[]()` from description
  // Strip html tags

  return description
    .replace(/[`#*_]/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/<[^>]*>/g, '')
}
