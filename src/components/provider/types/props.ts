import { PropsWithChildren, ReactNode } from 'react';
import TranslationsProp from '../../../types/translations-prop';

// This should extend Record<string, TranslationsProp | undefined>, but
//   TypeScript 4 does not support properties that don't extend their index
//   signature.
interface BaseProps
  extends Record<string, ReactNode | TranslationsProp | string | undefined> {
  fallbackLocale?: string;
  locale: string;
}

type Props = PropsWithChildren<BaseProps>;
export default Props;
