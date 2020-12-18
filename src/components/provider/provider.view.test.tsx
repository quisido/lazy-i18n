import * as useProvider from './provider.hook';
const MOCK_USE_PROVIDER = jest.spyOn(useProvider, 'default');

import { render } from '@testing-library/react';
import { PropsWithChildren, ReactElement, useContext } from 'react';
import TranslateFunctionContext from '../../contexts/translate-function';
import { I18nProvider } from '../../index';
import TranslateFunctionType from '../../types/translate-function';

const TEST_VALUE: TranslateFunctionType = (): string => 'test';

describe('Provider', (): void => {
  beforeEach((): void => {
    MOCK_USE_PROVIDER.mockReturnValue({
      asyncImportEffect: {
        current: null,
      },
      value: TEST_VALUE,
    });
  });

  afterEach((): void => {
    MOCK_USE_PROVIDER.mockClear();
  });

  it('should set the translate function context', (): void => {
    let contextValue: TranslateFunctionType | undefined;
    function TestComponent(): null {
      contextValue = useContext(TranslateFunctionContext);
      return null;
    }

    render(<TestComponent />, {
      wrapper({ children }: PropsWithChildren<unknown>): ReactElement {
        return <I18nProvider locale="en_US">{children}</I18nProvider>;
      },
    });

    expect(contextValue).toBe(TEST_VALUE);
  });
});
