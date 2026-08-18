import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HERO_SLIDES, type HeroSlide } from "../data/hero";
import { SHOP } from "../config/shop";

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD_PX = 40;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * The rotating banners at the top of the home page. Slides come from
 * src/data/hero.ts. Advances on its own every few seconds, and pauses while
 * the customer is hovering, using the arrows, or has the tab in the
 * background. Honours the "reduce motion" accessibility setting by not
 * auto-advancing at all — the arrows and dots still work.
 */
export function HeroCarousel() {
  const slides = HERO_SLIDES;
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  const autoplay = count > 1 && !interacting && !tabHidden && !reducedMotion;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [autoplay, count]);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  function onTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    setInteracting(true);
  }

  function onTouchEnd(event: React.TouchEvent) {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    setInteracting(false);
    if (startX === null || endX === undefined) return;
    const delta = endX - startX;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    go(delta < 0 ? index + 1 : index - 1);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") go(index + 1);
    else if (event.key === "ArrowLeft") go(index - 1);
    else return;
    event.preventDefault();
  }

  if (count === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${SHOP.name} featured fabric`}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={() => setInteracting(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
      // min-w-0: as a grid item this would otherwise be sized by the full
      // width of all slides side by side, pushing the page off screen.
      className="w-full min-w-0"
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-paper">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className="w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              inert={i !== index ? true : undefined}
            >
              <Slide slide={slide} eager={i === 0} />
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <ArrowButton direction="prev" onClick={() => go(index - 1)} />
          <div className="flex items-center gap-1">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show slide ${i + 1}${slide.caption ? `: ${slide.caption}` : ""}`}
                aria-current={i === index}
                className="flex h-11 w-6 items-center justify-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === index ? "w-5 bg-navy" : "w-2 bg-line"
                  }`}
                />
              </button>
            ))}
          </div>
          <ArrowButton direction="next" onClick={() => go(index + 1)} />
        </div>
      )}
    </div>
  );
}

function Slide({ slide, eager }: { slide: HeroSlide; eager: boolean }) {
  const body = (
    <>
      <img
        src={slide.src}
        alt={slide.alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        className="aspect-[16/9] w-full object-cover"
      />
      {slide.caption && (
        <div className="flex items-center justify-between gap-3 border-t border-line bg-surface px-4 py-3">
          <span className="text-sm font-extrabold">{slide.caption}</span>
          {slide.href && (
            <span className="inline-flex items-center gap-1 text-sm font-bold text-navy">
              Browse
              <span aria-hidden="true">→</span>
            </span>
          )}
        </div>
      )}
    </>
  );

  if (!slide.href) return <div>{body}</div>;

  return (
    <Link to={slide.href} className="group block">
      {body}
    </Link>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous slide" : "Next slide"}
      className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface text-ink-soft transition-colors hover:text-ink"
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={isPrev ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}
