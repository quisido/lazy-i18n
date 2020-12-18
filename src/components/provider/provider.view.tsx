import { ReactElement, memo } from 'react';
import TranslateFunctionContext from '../../contexts/translate-function';
import * as useProviderHook from './provider.hook';
import Props from './types/props';

const { default: useProvider } = useProviderHook;

function I18nProvider({
  children,
  fallbackLocale,
  locale,
  ...translationsRecord
}: Props): ReactElement {
  const { value } = useProvider({ fallbackLocale, locale, translationsRecord });

  return (
    <TranslateFunctionContext.Provider value={value}>
      {children}
    </TranslateFunctionContext.Provider>
  );
}

export default memo(I18nProvider);
