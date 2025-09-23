import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to conditionally join class names with proper Tailwind merging
 * Combines clsx for conditional classes and tailwind-merge for proper Tailwind conflict resolution
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Utility to create consistent CSS class combinations with proper Tailwind merging
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
 * Now using tailwind-merge for proper conflict resolution
 */
export function mergeTailwindClasses(base: string, override?: string): string {
  return cn(base, override)
}