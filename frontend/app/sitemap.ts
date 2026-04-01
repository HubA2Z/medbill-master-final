import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.enhancebilling.com'
  
  // Add all your tool routes here
  const routes = [
    '',
    '/call-note-builder',
    '/icd-10-search',
    '/revenue-audit',
    '/tools',
    '/billing-specialist-guide',
    '/billing-specialist-guide/salary',
    '/billing-specialist-guide/certification',
    '/billing-specialist-guide/resume-tips',
    '/hipaa',
    '/about',
    '/terms',
    '/privacy',
    // Add new features here as you build them
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
