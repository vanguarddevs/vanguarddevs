import InstagramIcon from "@/components/icons/InstagramIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import DotField from "@/components/reactbits/DotField/DotField";
import { SectionBlur } from "@/components/SectionHead";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  primaryCta,
  WHATSAPP_URL,
} from "@/lib/site";

/* DotField canvas colors, relative to the brand tokens in globals.css.
   The contact surface is inverted to dark (--ink), so these are tuned
   against that dark surface rather than the light --paper default:
   - DOT_GRADIENT_FROM: --signal (Voltage Violet), the dot color itself.
   - DOT_GRADIENT_TO: muted slate-lavender easing the gradient toward
     --steel (#6F6A7C).
   - DOT_GLOW: kept slightly lighter than --ink (#16121F) so the cursor
     glow recedes into the dark surface instead of flaring against it. */
const DOT_GRADIENT_FROM = "#5D2DE2";
const DOT_GRADIENT_TO = "#8B77AC";
const DOT_GLOW = "#241E33";

export default function Contact({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const { href, booking } = primaryCta(lang);
  return (
    <section id="contact" aria-label={dict.contact.heading} className="contact">
      <div className="contact-bg" aria-hidden="true">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly
          gradientFrom={DOT_GRADIENT_FROM}
          gradientTo={DOT_GRADIENT_TO}
          glowColor={DOT_GLOW}
        />
      </div>
      <span className="mono">{dict.contact.secLabel}</span>
      <p className="display">
        <a
          className="big"
          href={href}
          target="_blank"
          rel="noopener"
          data-track="contact_cta"
        >
          <SectionBlur>
            {booking ? dict.contact.bookingCta : dict.contact.cta}
          </SectionBlur>{" "}
          <span className="mark" aria-hidden="true" />
        </a>
      </p>
      <div className="row">
        {booking && (
          <a className="btn" href={WHATSAPP_URL} target="_blank" rel="noopener" data-track="contact_whatsapp">
            {dict.contact.cta}
          </a>
        )}
        <a className="btn" href={`mailto:${CONTACT_EMAIL}`} data-track="contact_email">
          {CONTACT_EMAIL}
        </a>
        <a
          className="btn icon"
          href={LINKEDIN_URL}
          target="_blank"
          rel="me noopener noreferrer"
          aria-label={dict.contact.socialLinkedin}
          data-track="contact_linkedin"
        >
          <LinkedInIcon aria-hidden="true" />
        </a>
        <a
          className="btn icon"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="me noopener noreferrer"
          aria-label={dict.contact.socialInstagram}
          data-track="contact_instagram"
        >
          <InstagramIcon aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
