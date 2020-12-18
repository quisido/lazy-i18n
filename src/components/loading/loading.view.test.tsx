import * as useLoading from './loading.hook';
const MOCK_USE_LOADING = jest.spyOn(useLoading, 'default');

import { render } from '@testing-library/react';
import Loading from '.';

describe('Loading', (): void => {
  beforeEach((): void => {
    MOCK_USE_LOADING.mockReturnValue({
      isFirstDotAnimating: true,
      isSecondDotAnimating: false,
      isThirdDotAnimating: false,
    });
  });

  it('should not crash', (): void => {
    render(<Loading />);
  });
});
