import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/uninstall',
    },
    sitemap: `https:${process.env.NEXT_PUBLIC_SITE_URL!}sitemap.xml`,
  }
}