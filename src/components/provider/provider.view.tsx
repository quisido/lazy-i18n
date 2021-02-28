import { ComponentType, ReactElement, ReactNode, memo } from 'react';
import Loading from '../../components/loading';
import LoadingComponentContext from '../../contexts/loading-component';
import LoadingStringContext from '../../contexts/loading-string';
import TranslateFunctionContext from '../../contexts/translate-function';
import Translations from '../../types/translations';
import useProvider from './provider.hook';

interface Props<T extends Record<string, Translations | undefined>> {
  LoadingComponent?: ComponentType<unknown>;
  children?: ReactNode;
  onLoadError?(locale: keyof T, err: unknown): void;
  fallbackLocale?: keyof T;
  loadingString?: string;
  locale: keyof T;
  translations: T;
}

function I18nProvider<T extends Record<string, Translations | undefined>>({
  LoadingComponent,
  children,
  onLoadError,
  fallbackLocale,
  loadingString,
  locale,
  translations: translationsRecord,
}: Props<T>): ReactElement {
  const { translate } = useProvider({
    fallbackLocale,
    locale,
    onLoadError,
    translationsRecord,
  });

  return (
    <LoadingComponentContext.Provider value={LoadingComponent || Loading}>
      <LoadingStringContext.Provider value={loadingString || '...'}>
        <TranslateFunctionContext.Provider value={translate}>
          {children}
        </TranslateFunctionContext.Provider>
      </LoadingStringContext.Provider>
    </LoadingComponentContext.Provider>
  );
}

export default memo(I18nProvider);
