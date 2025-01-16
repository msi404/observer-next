import { type JSX, type FC,Fragment, type ReactNode} from 'react';

export const Show: FC<{
  children: JSX.Element | ReactNode | string;
  when: boolean | string | number;
  fallback?: JSX.Element | string |null;
}> = ({ children, when, fallback }) => {
  return (
    <Fragment>
      {when && children}
      {!when && fallback}
    </Fragment>
  );
};
