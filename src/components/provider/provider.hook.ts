import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import DefaultExport from '../../types/default-export';
import TranslateFunction from '../../types/translate-function';
import Translations from '../../types/translations';
import replaceVariables from '../../utils/replace-variables';
import isEagerTranslationsEntry from './utils/is-eager-translations-entry';
import mapEagerTranslationsEntryToTranslationsRecordEntry from './utils/map-eager-translations-entry-to-translations-record-entry';
import mapEagerTranslationsToTranslationsRecord from './utils/map-eager-translations-to-translations-record';

type ImportTranslations = () =>
  | DefaultExport<Record<string, string>>
  | Promise<DefaultExport<Record<string, string>> | Record<string, string>>
  | Record<string, string>;

interface Props<T extends Record<string, Translations | undefined>> {
  fallbackLocale?: keyof T;
  locale: keyof T;
  translations: T;
}

export interface State {
  asyncImportEffect: MutableRefObject<
    | DefaultExport<Record<string, string>>
    | null
    | Promise<DefaultExport<Record<string, string>> | Record<string, string>>
    | Record<string, string>
  >;
  value: TranslateFunction;
}

export default function useProvider<
  T extends Record<string, Translations | undefined>
>({ fallbackLocale, locale, translations }: Props<T>): State {
  const asyncImportEffect: MutableRefObject<
    | DefaultExport<Record<string, string>>
    | null
    | Promise<DefaultExport<Record<string, string>> | Record<string, string>>
    | Record<string, string>
  > = useRef(null);

  const [isFallbackNeeded, setIsFallbackNeeded] = useState(false);
  const [translationsMap, setTranslationsMap] = useState(
    (): Map<keyof T, Record<string, string>> => {
      const translationsEntries: [
        string,
        Translations | undefined,
      ][] = Object.entries(translations);

      const eagerTranslationsRecordEntries: [
        string,
        Record<string, string>,
      ][] = translationsEntries
        .filter(isEagerTranslationsEntry)
        .map(mapEagerTranslationsEntryToTranslationsRecordEntry);

      return new Map(eagerTranslationsRecordEntries);
    },
  );

  const importTranslations = useCallback(
    async (locale: keyof T): Promise<void> => {
      const importTranslations: Translations | undefined = translations[locale];

      // If there are no translations for this language, set an empty map.
      if (!importTranslations) {
        setTranslationsMap(
          (
            oldTranslationsMap: Map<keyof T, Record<string, string>>,
          ): Map<keyof T, Record<string, string>> => {
            const newTranslationsMap: Map<
              keyof T,
              Record<string, string>
            > = new Map(oldTranslationsMap);
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
      const translationsRecord: Record<
        string,
        string
      > = mapEagerTranslationsToTranslationsRecord(
        await asyncImportEffect.current,
      );

      // If two lazy loads dispatched simultaneously, only process the
      //   first one.
      // if (translationsMap.has(locale)) {
      //   return;
      // }

      setTranslationsMap(
        (
          oldTranslationsMap: Map<keyof T, Record<string, string>>,
        ): Map<keyof T, Record<string, string>> => {
          const newTranslationsMap: Map<
            keyof T,
            Record<string, string>
          > = new Map(oldTranslationsMap);
          newTranslationsMap.set(locale, translationsRecord);
          return newTranslationsMap;
        },
      );
    },
    [translations],
  );

  // The translate function is a stateful function that takes a string and
  //   returns a translation based on the current locale.
  // For example, if the locale is 'es', then `translate('cat') === 'gato'`.
  const value: TranslateFunction = useCallback(
    (str: string, vars?: Record<string, number | string>): null | string => {
      const translations:
        | Record<string, string>
        | undefined = translationsMap.get(locale);

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
          | Record<string, string>
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
