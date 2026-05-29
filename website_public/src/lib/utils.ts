import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Base path for GitHub Pages deployment.
 * Must match the `basePath` in next.config.ts
 */
export const BASE_PATH = "/amedia-studio";

/**
 * Prefix a path with the base path for static assets.
 * Use this for `<img>`, `<video>`, `<source>` tags that don't auto-handle basePath.
 * Next.js `<Image>` component also requires manual basePath prefix per docs.
 */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
