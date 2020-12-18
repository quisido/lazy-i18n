import DefaultExportedTranslations from '../types/default-exported-translations';
import Translations from '../types/translations';

export default function isDefaultExportedTranslations(
  translations: DefaultExportedTranslations | Translations,
): translations is DefaultExportedTranslations {
  return typeof translations.default === 'object';
}
