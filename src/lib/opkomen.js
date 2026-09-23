// Blokken in een hoofdstuk schuiven zacht omhoog in beeld als je ernaartoe scrolt.
// Alleen wat bij het laden nog onder het scherm staat: wat je meteen ziet, flitst niet.
// Zonder JavaScript of bij 'minder beweging' krijgt niets de klasse en staat alles er gewoon.

const BLOKKEN = [
  'aside.kort', 'aside.noot', 'aside.verhaal',
  'section.vraagje', 'figure', '.weeg', '.cijfers > li', '.tabel-scroll',
].join(', ');
const TUSSENPOOS = 80; // ms tussen blokken die tegelijk in beeld komen

export function laatOpkomen(wortel = document.querySelector('main')) {
  if (!wortel || !('IntersectionObserver' in window)) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const blokken = Array.from(wortel.querySelectorAll(BLOKKEN))
    // een figuur in een figuur beweegt al mee met zijn ouder
    .filter((el) => !el.parentElement?.closest(BLOKKEN))
    .filter((el) => el.getBoundingClientRect().top > window.innerHeight);

  const kijker = new IntersectionObserver((treffers) => {
    treffers.filter((t) => t.isIntersecting).forEach((t, i) => {
      const el = /** @type {HTMLElement} */ (t.target);
      kijker.unobserve(el);
      el.style.animationDelay = `${i * TUSSENPOOS}ms`;
      el.classList.add('opgekomen');
      // daarna weer een gewoon blok: eigen hover-overgangen en transforms werken dan ongestoord
      const klaar = (e) => {
        if (e.target !== el) return; // een animatie ín het blok telt niet
        el.removeEventListener('animationend', klaar);
        el.classList.remove('opkomen', 'opgekomen');
        el.style.animationDelay = '';
      };
      el.addEventListener('animationend', klaar);
    });
  }, { rootMargin: '0px 0px -8% 0px' });

  blokken.forEach((el) => {
    el.classList.add('opkomen');
    kijker.observe(el);
  });
}
