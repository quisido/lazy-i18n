import translations from '../../../test-utils/translations.json';
import isEagerTranslationsEntry from './is-eager-translations-entry';

describe('isEagerTranslationsEntry', (): void => {
  it('should return true for translations', (): void => {
    expect(isEagerTranslationsEntry(['en', translations])).toBe(true);
  });

  it('should return true for default exported translations', (): void => {
    expect(isEagerTranslationsEntry(['en', { default: translations }])).toBe(
      true,
    );
  });

  it('should return false for required translations', (): void => {
    expect(
      isEagerTranslationsEntry([
        'en',
        () => require('../../../test-utils/translations.json'),
      ]),
    ).toBe(false);
  });

  it('should return false for dynamic imported translations', (): void => {
    expect(
      isEagerTranslationsEntry([
        'en',
        () => import('../../../test-utils/translations.json'),
      ]),
    ).toBe(false);
  });
});
