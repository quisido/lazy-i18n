import { RenderOptions, render } from '@testing-library/react';
import TranslateFunctionContext from '../../contexts/translate-function';
import I18n from '../../index';
import TranslateFunctionType from '../../types/translate-function';
import { PropsWithChildren, ReactElement } from 'react';

const MOCK_TRANSLATE_FUNCTION = jest.fn();

const RENDER_OPTIONS: RenderOptions = {
  wrapper({ children }: PropsWithChildren<unknown>): ReactElement {
    return (
      <TranslateFunctionContext.Provider value={MOCK_TRANSLATE_FUNCTION}>
        {children}
      </TranslateFunctionContext.Provider>
    );
  },
};

describe('I18n', (): void => {
  beforeEach((): void => {
    MOCK_TRANSLATE_FUNCTION.mockReturnValue('test');
  });

  afterEach((): void => {
    MOCK_TRANSLATE_FUNCTION.mockClear();
  });

  it('should handle render props', (): void => {
    const { getByText } = render(
      <I18n>
        {(translate: TranslateFunctionType): ReactElement => (
          <>{translate('a')}</>
        )}
      </I18n>,
      RENDER_OPTIONS,
    );
    expect((): void => {
      getByText('test');
    }).not.toThrow();
  });

  it('should handle arrays of children', (): void => {
    const { getByText } = render(
      <I18n>{['hello', ' ', 'world']}</I18n>,
      RENDER_OPTIONS,
    );
    expect(MOCK_TRANSLATE_FUNCTION).toHaveBeenCalledTimes(1);
    expect(MOCK_TRANSLATE_FUNCTION).toHaveBeenLastCalledWith('hello world', {});
    expect((): void => {
      getByText('test');
    }).not.toThrow();
  });

  it('should handle primitives', (): void => {
    const { getByText } = render(<I18n>{1234}</I18n>, RENDER_OPTIONS);
    expect(MOCK_TRANSLATE_FUNCTION).toHaveBeenCalledTimes(1);
    expect(MOCK_TRANSLATE_FUNCTION).toHaveBeenLastCalledWith('1234', {});
    expect((): void => {
      getByText('test');
    }).not.toThrow();
  });

  it('should handle loading', (): void => {
    MOCK_TRANSLATE_FUNCTION.mockReturnValue(null);
    render(<I18n>{1234}</I18n>, RENDER_OPTIONS);
  });

  it('should display the key when the translation is missing', (): void => {
    MOCK_TRANSLATE_FUNCTION.mockReturnValue(undefined);
    const { getByText } = render(<I18n>invalid key</I18n>, RENDER_OPTIONS);
    expect((): void => {
      getByText('invalid key');
    }).not.toThrow();
  });

  it('should display the translation when present', (): void => {
    const { getByText } = render(<I18n>valid key</I18n>, RENDER_OPTIONS);
    expect((): void => {
      getByText('test');
    }).not.toThrow();
  });
});
