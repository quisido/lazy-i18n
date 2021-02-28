import { RenderResult, act, renderHook } from '@testing-library/react-hooks';
import useProvider, { State } from './provider.hook';

type Locale = 'en_US' | 'es_ES';

const MOCK_EN_US = jest.fn();
const MOCK_ES_ES = jest.fn();
const EN_US: Locale = 'en_US';
const ES_ES: Locale = 'es_ES';

const TEST_TRANSLATIONS = {
  [EN_US]: MOCK_EN_US,
  [ES_ES]: MOCK_ES_ES,
};

const asyncImportEffect = async (
  result: RenderResult<State>,
): Promise<void> => {
  await act(
    async (): Promise<void> => {
      await result.current.asyncImportEffect.current;
    },
  );
};

describe('useProvider', (): void => {
  beforeEach((): void => {
    MOCK_EN_US.mockReturnValue({
      English: 'English',
    });
    MOCK_ES_ES.mockReturnValue({
      Spanish: 'Espanol',
    });
  });

  afterEach((): void => {
    MOCK_EN_US.mockClear();
    MOCK_ES_ES.mockClear();
  });

  it('should use an empty translations map when no translations exist for a locale', async (): Promise<void> => {
    const { result } = renderHook(useProvider, {
      initialProps: {
        locale: EN_US,
        translations: {
          [EN_US]: undefined,
          [ES_ES]: MOCK_ES_ES,
        },
      },
    });
    await asyncImportEffect(result);

    expect(result.current.value('Test')).toBe('Test');
  });

  it('should handle eager-loaded translations', async (): Promise<void> => {
    const { result } = renderHook(useProvider, {
      initialProps: {
        locale: ES_ES,
        translations: {
          [ES_ES]: {
            Spanish: 'Espanol',
          },
        },
      },
    });
    await asyncImportEffect(result);

    expect(result.current.value('Spanish')).toBe('Espanol');
  });

  describe('import translations effect', (): void => {
    it('should import new translations', async (): Promise<void> => {
      const { rerender, result } = renderHook(useProvider, {
        initialProps: {
          locale: EN_US as Locale,
          translations: TEST_TRANSLATIONS,
        },
      });
      await asyncImportEffect(result);

      expect(MOCK_EN_US).toHaveBeenCalledTimes(1);
      expect(MOCK_ES_ES).not.toHaveBeenCalled();

      rerender({
        locale: ES_ES,
        translations: TEST_TRANSLATIONS,
      });
      await asyncImportEffect(result);

      expect(MOCK_EN_US).toHaveBeenCalledTimes(1);
      expect(MOCK_ES_ES).toHaveBeenCalledTimes(1);
    });

    it('should not import translations that already exist', async (): Promise<void> => {
      const { rerender, result } = renderHook(useProvider, {
        initialProps: {
          locale: EN_US as Locale,
          translations: TEST_TRANSLATIONS,
        },
      });
      await asyncImportEffect(result);

      rerender({
        locale: ES_ES,
        translations: TEST_TRANSLATIONS,
      });
      await asyncImportEffect(result);

      rerender({
        locale: EN_US,
        translations: TEST_TRANSLATIONS,
      });

      expect(MOCK_EN_US).toHaveBeenCalledTimes(1);
    });
  });

  describe('import fallback translations effect', (): void => {
    it('should do nothing if a fallback is not needed', async (): Promise<void> => {
      const { result } = renderHook(useProvider, {
        initialProps: {
          fallbackLocale: EN_US,
          locale: ES_ES,
          translations: TEST_TRANSLATIONS,
        },
      });
      await asyncImportEffect(result);

      act((): void => {
        result.current.value('Spanish');
      });

      expect(MOCK_EN_US).not.toHaveBeenCalled();
    });

    it('should do nothing if there is no fallback locale', async (): Promise<void> => {
      const { result } = renderHook(useProvider, {
        initialProps: {
          locale: ES_ES,
          translations: TEST_TRANSLATIONS,
        },
      });
      await asyncImportEffect(result);

      act((): void => {
        result.current.value('Test');
      });

      expect(MOCK_EN_US).not.toHaveBeenCalled();
    });

    it('should do nothing if the fallback already loaded', async (): Promise<void> => {
      const { rerender, result } = renderHook(useProvider, {
        initialProps: {
          fallbackLocale: EN_US,
          locale: EN_US as Locale,
          translations: TEST_TRANSLATIONS,
        },
      });
      await asyncImportEffect(result);

      rerender({
        fallbackLocale: EN_US,
        locale: ES_ES,
        translations: TEST_TRANSLATIONS,
      });
      await asyncImportEffect(result);

      act((): void => {
        result.current.value('Test');
      });

      expect(MOCK_EN_US).toHaveBeenCalledTimes(1);
    });

    it('should import the fallback locale when needed', async (): Promise<void> => {
      const { result } = renderHook(useProvider, {
        initialProps: {
          fallbackLocale: EN_US,
          locale: ES_ES,
          translations: TEST_TRANSLATIONS,
        },
      });
      await asyncImportEffect(result);

      act((): void => {
        result.current.value('test');
      });
      await asyncImportEffect(result);

      expect(MOCK_EN_US).toHaveBeenCalledTimes(1);
    });
  });

  describe('value', (): void => {
    it('should return null if the language has not loaded yet', async (): Promise<void> => {
      const { result } = renderHook(useProvider, {
        initialProps: {
          fallbackLocale: EN_US,
          locale: ES_ES,
          translations: TEST_TRANSLATIONS,
        },
      });

      expect(result.current.value('Spanish')).toBeNull();

      await asyncImportEffect(result);
    });

    it('should return translations if they exist', async (): Promise<void> => {
      const { result } = renderHook(useProvider, {
        initialProps: {
          fallbackLocale: EN_US,
          locale: ES_ES,
          translations: TEST_TRANSLATIONS,
        },
      });
      await asyncImportEffect(result);

      expect(result.current.value('Spanish')).toBe('Espanol');
    });

    it('should import the fallback if needed', async (): Promise<void> => {
      const { result } = renderHook(useProvider, {
        initialProps: {
          fallbackLocale: EN_US,
          locale: ES_ES,
          translations: TEST_TRANSLATIONS,
        },
      });
      await asyncImportEffect(result);

      act((): void => {
        expect(result.current.value('English')).toBeNull();
      });
      await asyncImportEffect(result);

      expect(MOCK_EN_US).toHaveBeenCalledTimes(1);
    });

    it('should return the fallback translation if present', async (): Promise<void> => {
      const { result } = renderHook(useProvider, {
        initialProps: {
          fallbackLocale: ES_ES,
          locale: EN_US,
          translations: TEST_TRANSLATIONS,
        },
      });
      await asyncImportEffect(result);

      act((): void => {
        result.current.value('Spanish');
      });
      await asyncImportEffect(result);

      expect(result.current.value('Spanish')).toBe('Espanol');
    });

    it('should return the untranslated string if not present', async (): Promise<void> => {
      const { result } = renderHook(useProvider, {
        initialProps: {
          locale: ES_ES,
          translations: TEST_TRANSLATIONS,
        },
      });
      await asyncImportEffect(result);

      expect(result.current.value('English')).toBe('English');
    });
  });
});
