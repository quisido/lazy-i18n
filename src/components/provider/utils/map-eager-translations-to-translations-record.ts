import DefaultExport from '../../../types/default-export';
import isDefaultExport from '../../../utils/is-default-export';

export default function mapEagerTranslationsToTranslationsRecord(
  eagerTranslations:
    | DefaultExport<Record<string, string>>
    | Record<string, string>,
): Record<string, string> {
  if (isDefaultExport(eagerTranslations)) {
    return eagerTranslations.default;
  }
  return eagerTranslations;
}
