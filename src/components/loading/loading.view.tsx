import { ReactElement } from 'react';
import Dot from '../../components/loading-dot';

export default function I18nLoading(): ReactElement {
  return (
    <>
      <Dot index={0} />
      <Dot index={1} />
      <Dot index={2} />
    </>
  );
}
