import Dot from '../../components/loading-dot';
import * as useLoadingHook from './loading.hook';

const { default: useLoading } = useLoadingHook;

export default function I18nLoading(): JSX.Element {
  const {
    isFirstDotAnimating,
    isSecondDotAnimating,
    isThirdDotAnimating,
  } = useLoading();

  return (
    <>
      <Dot animating={isFirstDotAnimating} />
      <Dot animating={isSecondDotAnimating} />
      <Dot animating={isThirdDotAnimating} />
    </>
  );
}
