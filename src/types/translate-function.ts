type TranslateFunction = (
  str: string,
  vars?: Record<string, number | string>,
) => null | string;

export default TranslateFunction;
