import DefaultExportedTranslations from '../types/default-exported-translations';
import Translations from '../types/translations';

type RequiredTranslations = () => DefaultExportedTranslations | Translations;
export default RequiredTranslations;
