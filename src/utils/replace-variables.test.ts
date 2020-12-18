import replaceVariables from './replace-variables';

describe('replaceVariables', (): void => {
  it('should replace variables', (): void => {
    expect(
      replaceVariables('my $one $two $three string', {
        one: 1,
        two: 'two',
        three: 3,
      }),
    ).toBe('my 1 two 3 string');
  });

  it('should ignore empty variables', (): void => {
    expect(replaceVariables('my string')).toBe('my string');
  });
});
