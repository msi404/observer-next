import { type JSX, type FC,Fragment, type ReactNode} from 'react';

export const Show: FC<{
  children: JSX.Element | ReactNode;
  when: boolean;
  fallback?: JSX.Element | null;
}> = ({ children, when, fallback }) => {
  return (
    <Fragment>
      {when && children}
      {!when && fallback}
    </Fragment>
  );
};
