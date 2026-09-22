import Link from "next/link";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { JODAZ_URL } from "@/lib/site";

export default function Footer({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  return (
    <footer>
      <span className="mono">
        © {new Date().getFullYear()} <Link href={`/${lang}`}>VanguardDevs</Link> ·{" "}
        <a href={JODAZ_URL} target="_blank" rel="noopener">
          {dict.footer.founderLink}
        </a>
      </span>
      <span className="mono footer-links">
        <Link href={`/${lang}/privacy`}>{dict.footer.privacyLink}</Link>
        <CookieSettingsButton label={dict.footer.cookieSettings} />
      </span>
    </footer>
  );
}
