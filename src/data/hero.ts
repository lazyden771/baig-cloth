export interface HeroSlide {
  /** Path to the image inside the `public` folder, e.g. "/hero/hero-1.jpg". */
  src: string;
  /** Describes the photo — read aloud by screen readers, and used by Google Images. */
  alt: string;
  /** Optional short label shown in the bar under the photo. */
  caption?: string;
  /** Optional link — where clicking the slide takes the customer. */
  href?: string;
}

/**
 * The rotating photos in the home page hero.
 *
 * To use your own: put the image files in `public/hero/`, then list them
 * here — one block per photo, in the order you want them shown. Remove any
 * slides you don't need. If this list is empty the hero falls back to the
 * plain logo layout, so the site never breaks.
 *
 * See README.md ("Your hero photos") for step-by-step instructions.
 */
export const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/hero/hero-1.svg",
    alt: "Sample image — replace with a photo of embroidered unstitched lawn fabric.",
    caption: "Women's Unstitched",
    href: "/catalog?category=women-unstitched",
  },
  {
    src: "/hero/hero-2.svg",
    alt: "Sample image — replace with a photo of a stitched formal suit.",
    caption: "Women's Stitched",
    href: "/catalog?category=women-stitched",
  },
  {
    src: "/hero/hero-3.svg",
    alt: "Sample image — replace with a photo of men's shalwar qameez fabric.",
    caption: "Men's Unstitched",
    href: "/catalog?category=men-unstitched",
  },
  {
    src: "/hero/hero-4.svg",
    alt: "Sample image — replace with a photo of fancy or party wear.",
    caption: "Fancy & Party Wear",
    href: "/catalog",
  },
];
