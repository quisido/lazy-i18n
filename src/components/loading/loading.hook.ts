import { useEffect, useState } from 'react';
import incrementStep from './utils/increment-step';

interface State {
  isFirstDotAnimating: boolean;
  isSecondDotAnimating: boolean;
  isThirdDotAnimating: boolean;
}

export default function useLoading(): State {
  const [step, setStep] = useState(0);

  // Animate with JavaScript so as not to pollute the global CSS.
  useEffect((): VoidFunction => {
    const interval: number = window.setInterval((): void => {
      setStep(incrementStep);
    }, 125);

    return (): void => {
      window.clearInterval(interval);
    };
  }, []);

  return {
    isFirstDotAnimating: step === 0,
    isSecondDotAnimating: step === 1,
    isThirdDotAnimating: step === 2,
  };
}
