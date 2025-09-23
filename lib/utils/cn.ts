/**
 * Utility function to conditionally join class names
 * Similar to clsx but simplified for this project's needs
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim()
    .replace(/\s+/g, ' ')
}

/**
 * Utility to create consistent CSS class combinations
 */
export function createVariantClasses<T extends Record<string, string>>(
  base: string,
  variants: T
): T {
  return Object.entries(variants).reduce((acc, [key, value]) => {
    acc[key as keyof T] = cn(base, value) as T[keyof T]
    return acc
  }, {} as T)
}

/**
 * Utility to merge Tailwind classes, giving precedence to later classes
 */
export function mergeTailwindClasses(base: string, override?: string): string {
  if (!override) return base

  // Simple merge - for more complex merging, consider using tailwind-merge
  return cn(base, override)
}