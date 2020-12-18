import translations from '../test-utils/translations.json';
import isDefaultExportedTranslations from './is-default-exported-translations';

describe('isDefaultExportedTranslations', (): void => {
  it('should return true for default exported translations', (): void => {
    expect(
      isDefaultExportedTranslations({
        default: translations,
      }),
    ).toBe(true);
  });

  it('should return false for translations', (): void => {
    expect(isDefaultExportedTranslations(translations)).toBe(false);
  });
});
