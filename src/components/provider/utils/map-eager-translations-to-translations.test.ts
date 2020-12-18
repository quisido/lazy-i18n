import Translations from '../../../types/translations';
import mapEagerTranslationsToTranslations from './map-eager-translations-to-translations';

const TEST_TRANSLATIONS: Translations = {
  Test: 'Test',
};

describe('mapEagerTranslationsToTranslations', (): void => {
  it('should handle default exported translations', (): void => {
    expect(
      mapEagerTranslationsToTranslations({
        default: TEST_TRANSLATIONS,
      }),
    ).toBe(TEST_TRANSLATIONS);
  });

  it('should handle translations', (): void => {
    expect(mapEagerTranslationsToTranslations(TEST_TRANSLATIONS)).toBe(
      TEST_TRANSLATIONS,
    );
  });
});
