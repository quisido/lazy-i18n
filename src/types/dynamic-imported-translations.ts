import DefaultExportedTranslations from '../types/default-exported-translations';
import Translations from '../types/translations';

export default interface DynamicImportedTranslations {
  (): Promise<DefaultExportedTranslations | Translations>;
}
