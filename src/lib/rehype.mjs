/**
 * Twee kleine nabewerkingen op de HTML uit markdown:
 * 1. tabellen in een scrollbak zetten, zodat ze op een telefoon niet de pagina oprekken;
 * 2. de kopjes van hoofdstuk 1 het anker van hun kamer geven (#voordeur, #ramen, …),
 *    zodat de plattegrond ernaartoe kan linken.
 */
import { visit } from 'unist-util-visit';
import { KAMERS } from '../data/kamers.js';

function tekstVan(node) {
  if (node.type === 'text') return node.value;
  return (node.children ?? []).map(tekstVan).join('');
}

export function rehypeTabelScroll() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table' || !parent || parent.properties?.className?.includes('tabel-scroll')) return;
      parent.children[index] = { type: 'element', tagName: 'div', properties: { className: ['tabel-scroll'] }, children: [node] };
    });
  };
}

export function rehypeKamerAnkers() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'h2') return;
      const kop = tekstVan(node).trim();
      const kamer = KAMERS.find((k) => kop.startsWith(k.naam));
      if (kamer) node.properties = { ...node.properties, id: kamer.id };
    });
  };
}
