// utils/slugify.ts
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // remove non-word chars except spaces and dashes
    .replace(/\s+/g, '-')      // replace spaces with dashes
    .replace(/-+/g, '-');      // replace multiple dashes with one dash
}