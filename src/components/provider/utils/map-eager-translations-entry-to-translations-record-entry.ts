import DefaultExport from '../../../types/default-export';
import mapEagerTranslationsToTranslationsRecord from './map-eager-translations-to-translations-record';

export default function mapEagerTranslationsEntryToTranslationsRecordEntry([
  locale,
  eagerTranslations,
]: [string, DefaultExport<Record<string, string>> | Record<string, string>]): [
  string,
  Record<string, string>,
] {
  return [locale, mapEagerTranslationsToTranslationsRecord(eagerTranslations)];
}
