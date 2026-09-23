/**
 * Tekening en legenda wijzen naar elkaar: ga je met de muis of met tab over een plek,
 * dan licht hij op beide plekken op. Gebruikt door de plattegrond (kamers) en het fort (delen).
 */
export function koppelLegenda(fig, attribuut) {
  const legendaAttribuut = `${attribuut}-legenda`;
  const kies = (naam, id) => fig.querySelector(`[data-${naam}="${id}"]`);

  const licht = (id, aan) => {
    kies(attribuut, id)?.classList.toggle('licht-op', aan);
    kies(legendaAttribuut, id)?.classList.toggle('licht-op', aan);
    // merkteken op de hele tekening: daarmee kan de css al het andere laten wegzakken,
    // zodat de plek waar je op wijst er echt uitspringt
    fig.classList.toggle('iets-licht-op', aan);
  };

  fig.querySelectorAll(`[data-${attribuut}], [data-${legendaAttribuut}]`).forEach((el) => {
    const id = el.getAttribute(`data-${attribuut}`) ?? el.getAttribute(`data-${legendaAttribuut}`);
    el.addEventListener('mouseenter', () => licht(id, true));
    el.addEventListener('mouseleave', () => licht(id, false));
    el.addEventListener('focusin', () => licht(id, true));
    el.addEventListener('focusout', () => licht(id, false));
  });
}
