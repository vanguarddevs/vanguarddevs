import SectionHead from "@/components/SectionHead";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

/* "What we do": the packages. Split out of Process so the roadmap can sit
   elsewhere on the page. Prices are not shown on the cards (owner's call,
   2026-09); PackageItem.price only feeds the chat prompt. The Venezuela
   special-price note is local segmentation and renders on /es only. */
export default function Services({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <section id="services" aria-label={dict.nav.services}>
      <SectionHead heading={dict.services.heading} />
      <div className="packages">
        {dict.services.packages.map((pkg) => (
          <div className="pkg" key={pkg.title}>
            <span className="mark" aria-hidden="true" />
            <div>
              <h3>{pkg.title}</h3>
              <p>{pkg.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="next">
        <span className="mono">{dict.services.packagesIntro}</span>
        {lang === "es" && (
          <p className="venezuela-note">
            {dict.services.venezuelaIntro}{" "}
            <a href="#contact" className="venezuela-cta" data-track="venezuela_note">
              {dict.services.venezuelaCta}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
