import { ReactElement, ReactNode, memo } from 'react';
import TranslateFunctionContext from '../../contexts/translate-function';
import Translations from '../../types/translations';
import * as useProviderHook from './provider.hook';

const { default: useProvider } = useProviderHook;

interface Props<T extends Record<string, Translations | undefined>> {
  children?: ReactNode;
  fallbackLocale?: keyof T;
  locale: keyof T;
  translations: T;
}

function I18nProvider<T extends Record<string, Translations | undefined>>({
  children,
  fallbackLocale,
  locale,
  translations,
}: Props<T>): ReactElement {
  const { value } = useProvider({
    fallbackLocale,
    locale,
    translations,
  });

  return (
    <TranslateFunctionContext.Provider value={value}>
      {children}
    </TranslateFunctionContext.Provider>
  );
}

export default memo(I18nProvider);
