import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  // Both routes are SSG, so build time is the honest lastModified.
  const lastModified = new Date();
  const pages = locales.map((lang) => ({
    url: `${siteUrl}/${lang}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: lang === "es" ? 1 : 0.9,
    alternates: {
      languages: {
        es: `${siteUrl}/es`,
        en: `${siteUrl}/en`,
        "x-default": `${siteUrl}/es`,
      },
    },
  }));

  const privacyPages = locales.map((lang) => ({
    url: `${siteUrl}/${lang}/privacy`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.3,
    alternates: {
      languages: {
        es: `${siteUrl}/es/privacy`,
        en: `${siteUrl}/en/privacy`,
        "x-default": `${siteUrl}/es/privacy`,
      },
    },
  }));

  return [...pages, ...privacyPages];
}
