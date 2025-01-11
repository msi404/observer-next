import { type JSX, type FC,Fragment} from 'react';

export const Show: FC<{
  children:  JSX.Element;
  when: boolean;
  fallback?: JSX.Element;
}> = ({ children, when, fallback }) => {
  return (
    <Fragment>
      {when && children}
      {!when && fallback}
    </Fragment>
  );
};
