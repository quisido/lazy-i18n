export default function reduceVariableEntriesToTranslation(
  translation: string,
  [key, value]: [string, number | string],
): string {
  return translation.replace(`$${key}`, value.toString());
}
