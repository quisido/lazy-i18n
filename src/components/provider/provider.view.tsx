import { ReactElement, memo } from 'react';
import TranslateFunctionContext from '../../contexts/translate-function';
import TranslationsProp from '../../types/translations-prop';
import * as useProviderHook from './provider.hook';
import Props from './types/props';

const { default: useProvider } = useProviderHook;

function I18nProvider({
  children,
  fallbackLocale,
  locale,
  ...translationsRecord
}: Props): ReactElement {
  const { value } = useProvider({
    fallbackLocale,
    locale,
    translationsRecord: translationsRecord as Record<
      string,
      TranslationsProp | undefined
    >,
  });

  return (
    <TranslateFunctionContext.Provider value={value}>
      {children}
    </TranslateFunctionContext.Provider>
  );
}

export default memo(I18nProvider);
