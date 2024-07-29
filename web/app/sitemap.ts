import { MetadataRoute } from "next";


export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${process.env.NEXT_PUBLIC_SITE_URL!}`,
      lastModified: new Date()
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_SITE_URL!}/about`,
      lastModified: new Date()
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_SITE_URL!}/stats`,
      lastModified: new Date(),
      changeFrequency: "always"
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_SITE_URL!}/donate`,
      lastModified: new Date()
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_SITE_URL!}/privacy-policy`,
      lastModified: new Date()
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_SITE_URL!}/credits`,
      lastModified: new Date()
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_SITE_URL!}/terms-of-use`,
      lastModified: new Date()
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_SITE_URL!}/uninstall`,
      lastModified: new Date()
    }
  ]
}