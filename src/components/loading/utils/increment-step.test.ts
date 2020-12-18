import incrementStep from './increment-step';

describe('incrementStep', (): void => {
  it('should increment from 0 to 8', (): void => {
    expect(incrementStep(0)).toBe(1);
    expect(incrementStep(1)).toBe(2);
    expect(incrementStep(2)).toBe(3);
    expect(incrementStep(3)).toBe(4);
    expect(incrementStep(4)).toBe(5);
    expect(incrementStep(5)).toBe(6);
    expect(incrementStep(6)).toBe(7);
    expect(incrementStep(7)).toBe(8);
    expect(incrementStep(8)).toBe(0);
  });
});
