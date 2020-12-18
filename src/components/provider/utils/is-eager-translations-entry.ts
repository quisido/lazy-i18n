import DefaultExport from '../../../types/default-export';
import Translations from '../../../types/translations';

export default function isEagerTranslationsEntry(
  entry: [string, Translations | undefined],
): entry is [
  string,
  DefaultExport<Record<string, string>> | Record<string, string>,
] {
  const [, translationsProp] = entry;
  return typeof translationsProp === 'object';
}
