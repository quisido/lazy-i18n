import { act, renderHook } from '@testing-library/react-hooks';
import useLoading from './loading.hook';

describe('useLoading', (): void => {
  beforeEach((): void => {
    jest.useFakeTimers();
  });

  afterEach((): void => {
    jest.useRealTimers();
  });

  describe('effect', (): void => {
    it('should set an interval on mount', (): void => {
      renderHook(useLoading);
      expect(window.setInterval).toHaveBeenCalledTimes(1);
    });

    it('should clear the interval on unmount', (): void => {
      const { unmount } = renderHook(useLoading);
      unmount();
      expect(window.clearInterval).toHaveBeenCalledTimes(1);
    });
  });

  describe('isFirstDotAnimating', (): void => {
    it('should default to true', (): void => {
      const { result } = renderHook(useLoading);
      expect(result.current.isFirstDotAnimating).toBe(true);
    });

    it('should become false', (): void => {
      const { result } = renderHook(useLoading);

      act((): void => {
        jest.runOnlyPendingTimers();
      });

      expect(result.current.isFirstDotAnimating).toBe(false);
    });
  });

  describe('isSecondDotAnimating', (): void => {
    it('should default to false', (): void => {
      const { result } = renderHook(useLoading);
      expect(result.current.isSecondDotAnimating).toBe(false);
    });

    it('should become true', (): void => {
      const { result } = renderHook(useLoading);

      act((): void => {
        jest.runOnlyPendingTimers();
      });

      expect(result.current.isSecondDotAnimating).toBe(true);
    });
  });

  describe('isThirdDotAnimating', (): void => {
    it('should default to false', (): void => {
      const { result } = renderHook(useLoading);
      expect(result.current.isThirdDotAnimating).toBe(false);
    });

    it('should become true', (): void => {
      const { result } = renderHook(useLoading);

      act((): void => {
        jest.runOnlyPendingTimers();
      });
      act((): void => {
        jest.runOnlyPendingTimers();
      });

      expect(result.current.isThirdDotAnimating).toBe(true);
    });
  });
});
