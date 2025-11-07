// utils/generateSlugs.js
// Run this to generate slugs for your existing videos

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/--+/g, '-')      // Replace multiple hyphens with single hyphen
    .trim();
}

// Example usage:
const videos = [
  { title: "Greater Kalesh (2025) Full Movie" },
  { title: "Tu Haan Kar Ya Naa Kar Part 1 (2025) Full Movie" },
  { title: "Dark Nuns (2025) Full Movie" }
];

videos.forEach(video => {
  const slug = generateSlug(video.title);
  console.log(`Title: ${video.title}`);
  console.log(`Slug: ${slug}`);
  console.log(`URL: /video/${slug}`);
  console.log('---');
});

// Output example:
// Title: Greater Kalesh (2025) Full Movie
// Slug: greater-kalesh-2025-full-movie
// URL: /video/greater-kalesh-2025-full-movie

export { generateSlug };