import Translations from '../../../types/translations';
import TranslationsProp from '../../../types/translations-prop';

export default function isEagerTranslationsEntry(
  entry: [string, TranslationsProp | undefined],
): entry is [string, Translations] {
  const [, translationsProp] = entry;
  return typeof translationsProp === 'object';
}
