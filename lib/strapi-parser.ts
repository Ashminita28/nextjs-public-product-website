// lib/strapi-parser.ts

import { RichTextNode } from './types/shared-types';

export function parseRichText(nodes?: RichTextNode[] | null): string {
  if (!nodes) return '';

  return nodes
    .map((node) => node.children?.map((child) => child.text).join('') || '')
    .join('\n');
}
