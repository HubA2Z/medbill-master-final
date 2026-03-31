import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // Keep your backend logic private
    },
    sitemap: 'https://www.enhancebilling.com/sitemap.xml',
  }
}
