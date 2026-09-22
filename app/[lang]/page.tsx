import Cases from "@/components/Cases";
import ChatWidget from "@/components/ChatWidget";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Services from "@/components/Services";
import { getDictionary } from "@/lib/dictionaries";
import { siteUrl, type Locale } from "@/lib/i18n";
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  JODAZ_URL,
  LINKEDIN_URL,
  WHATSAPP_URL,
} from "@/lib/site";

// wa.me/<digits> → E.164 for schema.org telephone/contactPoint.
const WHATSAPP_E164 = `+${WHATSAPP_URL.replace(/^https:\/\/wa\.me\//, "")}`;

function jsonLd(lang: Locale) {
  const dict = getDictionary(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#organization`,
        name: "VanguardDevs",
        url: siteUrl,
        // The generated OG image lives at a hashed /[lang]/opengraph-image/0
        // URL, so the static manifest icon is the stable choice for both.
        logo: `${siteUrl}/web-app-manifest-512x512.png`,
        image: `${siteUrl}/web-app-manifest-512x512.png`,
        email: CONTACT_EMAIL,
        telephone: WHATSAPP_E164,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: CONTACT_EMAIL,
          telephone: WHATSAPP_E164,
          availableLanguage: ["es", "en"],
        },
        description: dict.meta.description,
        slogan: `${dict.hero.headlineStart} ${dict.hero.headlineAccent}`,
        sameAs: [INSTAGRAM_URL, LINKEDIN_URL],
        knowsAbout: [
          "MVP development",
          "Multi-tenant SaaS",
          "Fintech",
          "Insurtech",
          "Ecommerce",
          "Embedded infrastructure",
          "Partner APIs",
        ],
        founder: { "@id": `${siteUrl}/#founder` },
        employee: { "@id": `${siteUrl}/#founder` },
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Place", name: "Latin America" },
        ],
        knowsLanguage: ["es", "en"],
        makesOffer: dict.services.packages.map((pkg) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: pkg.title,
          },
        })),
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#founder`,
        name: "Jesus O.",
        jobTitle: dict.about.photoLabel,
        description: dict.about.bio,
        url: JODAZ_URL,
        sameAs: [LINKEDIN_URL, JODAZ_URL],
        worksFor: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "VanguardDevs",
        inLanguage: lang,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/${lang}`,
        url: `${siteUrl}/${lang}`,
        name: dict.meta.title,
        description: dict.meta.description,
        inLanguage: lang,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang)) }}
      />
      <Header dict={dict} lang={lang} />
      <main>
        <Hero dict={dict} lang={lang} />
        <Services dict={dict} lang={lang} />
        <Cases dict={dict} />
        <Process dict={dict} />
        <Contact dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
      {/* Landing only, never in the layout. No key = no widget, not a broken one. */}
      {process.env.GEMINI_API_KEY && <ChatWidget lang={lang} dict={dict.chat} />}
    </>
  );
}
