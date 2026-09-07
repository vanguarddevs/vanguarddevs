import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { primaryCta } from "@/lib/site";

export default function Header({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const cta = primaryCta(lang);
  const links = [
    ["#services", dict.nav.services],
    ["#cases", dict.nav.cases],
    ["#process", dict.nav.process],
  ] as const;

  return (
    <header>
      <Link className="logo" href={`/${lang}`}>
        <img className="logo-icon" src="/icon.svg" alt="" width={22} height={22} />
        VanguardDevs
      </Link>
      <nav aria-label={dict.nav.ariaMain}>
        {links.map(([href, label]) => (
          // Prefixed with /${lang} (not a bare "#hash") so the links still
          // resolve correctly from other pages under [lang] (e.g. /privacy).
          <a key={href} href={`/${lang}${href}`}>
            {label}
          </a>
        ))}
        {/* CSS-only mobile menu: <details> needs no client JS; the panel
            stays open after an anchor tap (accepted trade-off) */}
        <details className="menu">
          <summary aria-label={dict.nav.menuLabel}>
            <span className="menu-icon" aria-hidden="true" />
          </summary>
          <div className="menu-panel">
            {links.map(([href, label]) => (
              <a key={href} href={`/${lang}${href}`}>
                {label}
              </a>
            ))}
            <a className="cta" href={cta.href} target="_blank" rel="noopener" data-track="header_menu_cta">
              {cta.booking ? dict.contact.bookingCta : dict.nav.cta}
            </a>
            <div className="lang-toggle" role="group" aria-label={dict.nav.ariaLang}>
              <Link href="/es" aria-current={lang === "es" ? "true" : undefined} hrefLang="es" data-track="lang_es">
                ES
              </Link>
              <Link href="/en" aria-current={lang === "en" ? "true" : undefined} hrefLang="en" data-track="lang_en">
                EN
              </Link>
            </div>
          </div>
        </details>
      </nav>
      <div className="header-actions">
        <a className="cta" href={cta.href} target="_blank" rel="noopener" data-track="header_cta">
          {cta.booking ? dict.contact.bookingCta : dict.nav.cta}
        </a>
        <div className="lang-toggle" role="group" aria-label={dict.nav.ariaLang}>
          <Link href="/es" aria-current={lang === "es" ? "true" : undefined} hrefLang="es" data-track="lang_es">
            ES
          </Link>
          <Link href="/en" aria-current={lang === "en" ? "true" : undefined} hrefLang="en" data-track="lang_en">
            EN
          </Link>
        </div>
      </div>
    </header>
  );
}
