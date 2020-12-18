import { render } from '@testing-library/react';
import LoadingDot from '.';

describe('LoadingDot', (): void => {
  it('should have a 0 top when not animating', (): void => {
    const { getByText } = render(<LoadingDot animating={false} />);
    const dot: HTMLSpanElement = getByText('.');
    const top: number = parseFloat(dot.style.top);
    expect(top).toBe(0);
  });

  it('should have a negative top when animating', (): void => {
    const { getByText } = render(<LoadingDot animating={true} />);
    const dot: HTMLSpanElement = getByText('.');
    const top: number = parseFloat(dot.style.top);
    expect(top).toBeLessThan(0);
  });
});
