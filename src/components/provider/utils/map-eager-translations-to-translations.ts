import DefaultExportedTranslations from '../../../types/default-exported-translations';
import Translations from '../../../types/translations';
import isDefaultExportedTranslations from '../../../utils/is-default-exported-translations';

export default function mapEagerTranslationsToTranslations(
  eagerTranslations: DefaultExportedTranslations | Translations,
): Translations {
  if (isDefaultExportedTranslations(eagerTranslations)) {
    return eagerTranslations.default;
  }
  return eagerTranslations;
}
