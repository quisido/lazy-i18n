import { ReactElement } from 'react';
import Loading from '../../components/loading';
import useTranslate from '../../hooks/use-translate';
import TranslateFunction from '../../types/translate-function';
import Props from './types/props';

export default function I18n({ children, ...vars }: Props): ReactElement {
  const translate: TranslateFunction = useTranslate();

  if (typeof children === 'function') {
    return children(translate);
  }

  const translationKey: string = Array.isArray(children)
    ? children.join('')
    : children.toString();

  const translation: null | string = translate(
    translationKey,
    vars as Record<string, string | number>,
  );

  // If this locale's translations have not yet loaded, display the loading
  //   status indicator.
  if (translation === null) {
    return <Loading />;
  }

  // If this locale's translations are missing, display the translation key.
  if (typeof translation !== 'string') {
    return <>{translationKey}</>;
  }

  // If this locale's translations have loaded and are present, display the
  //   translation.
  return <>{translation}</>;
}
