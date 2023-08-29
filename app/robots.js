// This file is temporarily set to disallow all bots
// Set to [allow: "/",] when the app goes live
// Also included a spot for generating a sitemap when ready

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: "/api/",
      disallow: "/portal/",
      disallow: "/style/",
      disallow: "/",
    },
    // sitemap: 'https://acme.com/sitemap.xml',
  }
}
