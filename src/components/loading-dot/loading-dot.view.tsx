import { CSSProperties, ReactElement, useMemo } from 'react';

interface Props {
  animating: boolean;
}

const DEFAULT_STYLE: CSSProperties = {
  position: 'relative',
  transitionDelay: `0s`,
  transitionDuration: '0.125s',
  transitionProperty: 'top',
  transitionTimingFunction: 'ease-in-out',
};

const mapAnimatingToTop = (animating: boolean): number | string => {
  if (animating) {
    return '-0.125em';
  }
  return 0;
};

export default function I18nLoadingDot({ animating }: Props): ReactElement {
  const style: CSSProperties = useMemo(
    (): CSSProperties => ({
      ...DEFAULT_STYLE,
      top: mapAnimatingToTop(animating),
    }),
    [animating],
  );

  return <span style={style}>.</span>;
}
