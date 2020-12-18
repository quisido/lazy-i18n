import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import DefaultExportedTranslations from '../../types/default-exported-translations';
import TranslateFunction from '../../types/translate-function';
import Translations from '../../types/translations';
import TranslationsProp from '../../types/translations-prop';
import replaceVariables from '../../utils/replace-variables';
import isEagerTranslationsEntry from './utils/is-eager-translations-entry';
import mapEagerTranslationsEntryToTranslationsEntry from './utils/map-eager-translations-entry-to-translations-entry';
import mapEagerTranslationsToTranslations from './utils/map-eager-translations-to-translations';

type ImportTranslations = () =>
  | DefaultExportedTranslations
  | Promise<DefaultExportedTranslations | Translations>
  | Translations;

interface Props {
  fallbackLocale?: string;
  locale: string;
  translationsRecord: Record<string, TranslationsProp | undefined>;
}

export interface State {
  asyncImportEffect: MutableRefObject<
    | DefaultExportedTranslations
    | null
    | Promise<DefaultExportedTranslations | Translations>
    | Translations
  >;
  value: TranslateFunction;
}

export default function useProvider({
  fallbackLocale,
  locale,
  translationsRecord,
}: Props): State {
  const asyncImportEffect: MutableRefObject<
    | DefaultExportedTranslations
    | null
    | Promise<DefaultExportedTranslations | Translations>
    | Translations
  > = useRef(null);

  const [isFallbackNeeded, setIsFallbackNeeded] = useState(false);
  const [translationsMap, setTranslationsMap] = useState(
    (): Map<string, Translations> => {
      const translationsPropEntries: [
        string,
        TranslationsProp | undefined,
      ][] = Object.entries(translationsRecord);

      const translationsEntries: [
        string,
        Translations,
      ][] = translationsPropEntries
        .filter(isEagerTranslationsEntry)
        .map(mapEagerTranslationsEntryToTranslationsEntry);

      return new Map(translationsEntries);
    },
  );

  const importTranslations = useCallback(
    async (locale: string): Promise<void> => {
      const importTranslations: TranslationsProp | undefined =
        translationsRecord[locale];

      // If there are no translations for this language, set an empty map.
      if (!importTranslations) {
        setTranslationsMap(
          (
            oldTranslationsMap: Map<string, Translations>,
          ): Map<string, Translations> => {
            const newTranslationsMap: Map<string, Translations> = new Map(
              oldTranslationsMap,
            );
            newTranslationsMap.set(locale, Object.create(null));
            return newTranslationsMap;
          },
        );
        return;
      }

      // Lazy load the translations for this locale, then update the local
      //   state's translations map.
      // "as ImportTranslations" because this code cannot execute when
      //   translationsRecord[locale] is eager-loaded.
      asyncImportEffect.current = (importTranslations as ImportTranslations)();
      const translations: Translations = mapEagerTranslationsToTranslations(
        await asyncImportEffect.current,
      );

      // If two lazy loads dispatched simultaneously, only process the
      //   first one.
      // if (translationsMap.has(locale)) {
      //   return;
      // }

      setTranslationsMap(
        (
          oldTranslationsMap: Map<string, Translations>,
        ): Map<string, Translations> => {
          const newTranslationsMap: Map<string, Translations> = new Map(
            oldTranslationsMap,
          );
          newTranslationsMap.set(locale, translations);
          return newTranslationsMap;
        },
      );
    },
    [translationsRecord],
  );

  // The translate function is a stateful function that takes a string and
  //   returns a translation based on the current locale.
  // For example, if the locale is 'es', then `translate('cat') === 'gato'`.
  const value: TranslateFunction = useCallback(
    (str: string, vars?: Record<string, number | string>): null | string => {
      const translations: Translations | undefined = translationsMap.get(
        locale,
      );

      // If this language's translations have not yet loaded, return null.
      if (!translations) {
        return null;
      }

      // If the translation for this string exists, return it.
      if (Object.prototype.hasOwnProperty.call(translations, str)) {
        return replaceVariables(translations[str], vars);
      }

      // If the translation for this string does not exist, use the fallback
      //   locale if provided.
      if (fallbackLocale) {
        const fallbackTranslations:
          | Translations
          | undefined = translationsMap.get(fallbackLocale);

        // If the fallback language's translations have not yet loaded, return
        //   null.
        if (!fallbackTranslations) {
          setIsFallbackNeeded(true);
          return null;
        }

        // If the fallback translation for this string exists, return it.
        if (Object.prototype.hasOwnProperty.call(fallbackTranslations, str)) {
          return replaceVariables(fallbackTranslations[str], vars);
        }
      }

      // If the translation for this string does not exist in the target
      //   nor fallback language, just display the string itself.
      return str;
    },
    [fallbackLocale, locale, translationsMap],
  );

  // If translations for this locale have not loaded, load them.
  useEffect((): void => {
    if (translationsMap.has(locale)) {
      return;
    }
    importTranslations(locale);
  }, [importTranslations, locale, translationsMap]);

  // If fallback translations for this locale have not loaded and need to, load
  //   them.
  useEffect((): void => {
    if (!fallbackLocale) {
      return;
    }
    if (!isFallbackNeeded) {
      return;
    }
    if (translationsMap.has(fallbackLocale)) {
      return;
    }
    importTranslations(fallbackLocale);
  }, [fallbackLocale, importTranslations, isFallbackNeeded, translationsMap]);

  return {
    asyncImportEffect,
    value,
  };
}
