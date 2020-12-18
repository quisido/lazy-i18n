import DefaultExportedTranslations from '../../../types/default-exported-translations';
import Translations from '../../../types/translations';
import mapEagerTranslationsToTranslations from './map-eager-translations-to-translations';

export default function mapEagerTranslationsEntryToTranslationsEntry([
  locale,
  eagerTranslations,
]: [string, DefaultExportedTranslations | Translations]): [
  string,
  Translations,
] {
  return [locale, mapEagerTranslationsToTranslations(eagerTranslations)];
}
