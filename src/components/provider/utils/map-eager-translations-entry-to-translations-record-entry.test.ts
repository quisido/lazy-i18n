import mapEagerTranslationsEntryToTranslationsRecordEntry from './map-eager-translations-entry-to-translations-record-entry';

const TEST_TRANSLATIONS: Record<string, string> = {
  Test: 'Test',
};

describe('mapEagerTranslationsEntryToTranslationsRecordEntry', (): void => {
  it('should handle default exported translations', (): void => {
    expect(
      mapEagerTranslationsEntryToTranslationsRecordEntry([
        'en_US',
        {
          default: TEST_TRANSLATIONS,
        },
      ]),
    ).toEqual(['en_US', TEST_TRANSLATIONS]);
  });

  it('should handle translations', (): void => {
    expect(
      mapEagerTranslationsEntryToTranslationsRecordEntry([
        'en_US',
        TEST_TRANSLATIONS,
      ]),
    ).toEqual(['en_US', TEST_TRANSLATIONS]);
  });
});
