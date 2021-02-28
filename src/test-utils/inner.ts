import { MatcherFunction, Nullish } from '@testing-library/react';
import negate from '../test-utils/negate';

export default function inner(text: string): MatcherFunction {
  const hasTextContent = (innerElement: Nullish<Element>): boolean =>
    innerElement.textContent === text;
  const hasNoTextContent = negate(hasTextContent);
  return (_content: string, element: Nullish<Element>): boolean => {
    return (
      hasTextContent(element) &&
      Array.from(element.children).every(hasNoTextContent)
    );
  };
}
