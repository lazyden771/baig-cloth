export interface HeroSlide {
  /** Path to the image inside the `public` folder, e.g. "/hero/hero-1.jpg". */
  src: string;
  /**
   * Describes the photo for screen readers and Google. These banners have
   * their headline printed into the artwork, so repeat that wording here —
   * search engines cannot read text that lives inside an image.
   */
  alt: string;
  /** Optional short label shown in a bar under the photo. Banners rarely need one. */
  caption?: string;
  /** Optional link — where clicking the slide takes the customer. */
  href?: string;
}

/**
 * Your five banners, written out and ready — but NOT switched on yet, because
 * the image files aren't in `public/hero/` at the time of writing.
 *
 * ONCE hero-1.jpg ... hero-5.jpg ARE UPLOADED, make this one edit at the
 * bottom of this file:
 *
 *     export const HERO_SLIDES: HeroSlide[] = [];
 *
 * becomes
 *
 *     export const HERO_SLIDES: HeroSlide[] = UPLOADED_BANNERS;
 *
 * That's the whole switch-on. See README.md ("Your hero banners").
 */
export const UPLOADED_BANNERS: HeroSlide[] = [
  {
    src: "/hero/hero-1.jpg",
    alt: "New arrivals: Effortless Elegance — floral prints, timeless appeal. Ivory and purple floral printed suit with matching purple dupatta. Up to 20% off.",
    href: "/catalog?category=women-unstitched",
  },
  {
    src: "/hero/hero-2.jpg",
    alt: "All over printed: Effortless Elegance — floral prints, timeless appeal. Teal green floral printed suit with matching dupatta. Up to 20% off.",
    href: "/catalog?category=women-unstitched",
  },
  {
    src: "/hero/hero-3.jpg",
    alt: "All over printed: Effortless Elegance — floral prints, timeless appeal. Cream and maroon floral printed suit with matching dupatta. Up to 20% off.",
    href: "/catalog?category=women-unstitched",
  },
  {
    src: "/hero/hero-4.jpg",
    alt: "All over printed collection: Effortless Elegance — floral prints, timeless appeal. Deep maroon printed suit with gold leaf motifs. Up to 20% off.",
    href: "/catalog?category=women-unstitched",
  },
  {
    src: "/hero/hero-5.jpg",
    alt: "Bold by Design — a statement print for the woman who stands apart. Black printed suit with red and yellow motifs. Up to 20% off.",
    href: "/catalog",
  },
];

/**
 * The banners the site actually shows. Empty on purpose: with no slides the
 * home page falls back to the plain logo hero, so customers never see
 * placeholder artwork or "SAMPLE BANNER" text on the live site.
 *
 * Set this to UPLOADED_BANNERS once the real images are in public/hero/.
 */
export const HERO_SLIDES: HeroSlide[] = UPLOADED_BANNERS;
