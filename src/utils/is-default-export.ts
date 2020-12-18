import DefaultExport from '../types/default-export';

export default function isDefaultExport<T extends Record<string, unknown>>(
  translations: DefaultExport<T> | T,
): translations is DefaultExport<T> {
  return typeof translations.default === 'object';
}
