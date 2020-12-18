import Translations from '../../../types/translations';
import mapEagerTranslationsToTranslationsRecord from './map-eager-translations-to-translations-record';

const TEST_TRANSLATIONS: Translations = {
  Test: 'Test',
};

describe('mapEagerTranslationsToTranslationsRecord', (): void => {
  it('should handle default exported translations', (): void => {
    expect(
      mapEagerTranslationsToTranslationsRecord({
        default: TEST_TRANSLATIONS,
      }),
    ).toBe(TEST_TRANSLATIONS);
  });

  it('should handle translations', (): void => {
    expect(mapEagerTranslationsToTranslationsRecord(TEST_TRANSLATIONS)).toBe(
      TEST_TRANSLATIONS,
    );
  });
});
