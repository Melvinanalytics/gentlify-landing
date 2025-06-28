import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and merges CSS class names intelligently
 * Merges Tailwind classes and resolves conflicts (e.g., 'p-4 p-6' → 'p-6')
 * @param inputs - Class names or conditional class objects
 * @returns Merged and deduplicated class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
