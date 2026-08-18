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
 * The rotating banners at the top of the home page.
 *
 * Right now every `src` points at a placeholder SVG. Once you upload your
 * real banners to `public/hero/` as hero-1.jpg ... hero-5.jpg, change the
 * five ".svg" below to ".jpg" — that's the only edit needed.
 *
 * Export banners at 1712 x 945, or any 16:9 size. See README.md
 * ("Your hero banners") for the full walkthrough.
 */
export const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/hero/hero-1.svg",
    alt: "Bold by Design — a statement print for the woman who stands apart. Black printed three-piece suit with red and yellow motifs. Up to 20% off.",
    href: "/catalog",
  },
  {
    src: "/hero/hero-2.svg",
    alt: "New arrivals: Effortless Elegance — floral prints, timeless appeal. Ivory and purple floral printed suit with matching dupatta. Up to 20% off.",
    href: "/catalog?category=women-unstitched",
  },
  {
    src: "/hero/hero-3.svg",
    alt: "All over printed: Effortless Elegance — floral prints, timeless appeal. Teal green floral printed suit with matching dupatta. Up to 20% off.",
    href: "/catalog?category=women-unstitched",
  },
  {
    src: "/hero/hero-4.svg",
    alt: "All over printed: Effortless Elegance — floral prints, timeless appeal. Cream and maroon floral printed suit with gold detailing. Up to 20% off.",
    href: "/catalog?category=women-unstitched",
  },
  {
    src: "/hero/hero-5.svg",
    alt: "All over printed collection: Effortless Elegance — floral prints, timeless appeal. Deep maroon printed suit with gold leaf motifs. Up to 20% off.",
    href: "/catalog?category=women-unstitched",
  },
];
