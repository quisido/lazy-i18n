import Translations from '../../../types/translations';
import mapEagerTranslationsEntryToTranslationsEntry from './map-eager-translations-entry-to-translations-entry';

const TEST_TRANSLATIONS: Translations = {
  Test: 'Test',
};

describe('mapEagerTranslationsEntryToTranslationsEntry', (): void => {
  it('should handle default exported translations', (): void => {
    expect(
      mapEagerTranslationsEntryToTranslationsEntry([
        'en_US',
        {
          default: TEST_TRANSLATIONS,
        },
      ]),
    ).toEqual(['en_US', TEST_TRANSLATIONS]);
  });

  it('should handle translations', (): void => {
    expect(
      mapEagerTranslationsEntryToTranslationsEntry([
        'en_US',
        TEST_TRANSLATIONS,
      ]),
    ).toEqual(['en_US', TEST_TRANSLATIONS]);
  });
});
