import { ReactElement } from 'react';
import TranslateFunction from '../../../types/translate-function';

type Children =
  | number
  | string
  | (number | string)[]
  | ((translate: TranslateFunction) => ReactElement);

// This should be Record<string, number | string>, but TypeScript 4 does not
//   support the concept where a property does not match its index signature.
export default interface Props
  extends Record<string, Children | number | string> {
  children: Children;
}
