import reduceVariableEntriesToTranslation from './reduce-variable-entries-to-translation';

describe('reduceVariableEntriesToTranslation', (): void => {
  it('should replace keys with values', (): void => {
    expect(
      reduceVariableEntriesToTranslation('my $test string', ['test', 'unit']),
    ).toBe('my unit string');
  });
});
