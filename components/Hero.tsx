import DotField from "@/components/reactbits/DotField/DotField";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { primaryCta } from "@/lib/site";

/* DotField canvas colors, relative to the brand tokens in globals.css.
   The hero surface is inverted to dark (--ink), so these are tuned
   against that dark surface rather than the light --paper default:
   - DOT_GRADIENT_FROM: --signal (Voltage Violet), the dot color itself.
   - DOT_GRADIENT_TO: muted slate-lavender easing the gradient toward
     --steel (#6F6A7C).
   - DOT_GLOW: kept slightly lighter than --ink (#16121F) so the cursor
     glow recedes into the dark surface instead of flaring against it. */
const DOT_GRADIENT_FROM = "#5D2DE2";
const DOT_GRADIENT_TO = "#8B77AC";
const DOT_GLOW = "#241E33";

export default function Hero({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const cta = primaryCta(lang);
  return (
    <section className="hero" aria-label={dict.hero.ariaLabel}>
      <div className="hero-bg" aria-hidden="true">
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
      <img className="hero-logo" src="/icon.svg" alt="VanguardDevs" width={64} height={64} />
      <h1 className="display">
        {dict.hero.headlineStart}{" "}
        <span className="line-word">{dict.hero.headlineAccent}</span>{" "}
        <span className="mark" aria-hidden="true" />
      </h1>
      <div className="hero-foot">
        <div>
          <p>{dict.hero.sub}</p>
          <div className="hero-ctas">
            <a className="btn solid" href={cta.href} target="_blank" rel="noopener" data-track="hero_cta">
              <span className="mark" aria-hidden="true" />
              {cta.booking ? dict.contact.bookingCta : dict.hero.ctaPrimary}
            </a>
            <a className="btn" href="#cases" data-track="hero_cases">
              {dict.hero.ctaSecondary}
            </a>
          </div>
          <span className="mono hero-trust">{dict.hero.trustLine}</span>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <svg
            className="hero-scroll-arrow"
            viewBox="0 0 16 9"
            width="16"
            height="9"
            fill="none"
          >
            <path
              d="M1 1L8 8L15 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
