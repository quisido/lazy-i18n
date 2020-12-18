import reduceVariableEntriesToTranslation from '../utils/reduce-variable-entries-to-translation';

export default function replaceVariables(
  translation: string,
  vars: Record<string, number | string> = Object.create(null),
): string {
  return Object.entries(vars).reduce(
    reduceVariableEntriesToTranslation,
    translation,
  );
}
