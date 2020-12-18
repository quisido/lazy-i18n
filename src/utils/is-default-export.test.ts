import translations from '../test-utils/translations.json';
import isDefaultExportedTranslations from './is-default-export';

describe('isDefaultExport', (): void => {
  it('should return true for default exports', (): void => {
    expect(
      isDefaultExportedTranslations({
        default: translations,
      }),
    ).toBe(true);
  });

  it('should return false for non-default exports', (): void => {
    expect(isDefaultExportedTranslations(translations)).toBe(false);
  });
});
