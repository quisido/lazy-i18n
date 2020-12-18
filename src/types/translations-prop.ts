import DefaultExportedTranslations from '../types/default-exported-translations';
import DynamicImportedTranslations from '../types/dynamic-imported-translations';
import RequiredTranslations from '../types/required-translations';
import Translations from '../types/translations';

type TranslationsProp =
  | DefaultExportedTranslations
  | DynamicImportedTranslations
  | RequiredTranslations
  | Translations;
export default TranslationsProp;
