/* eslint-disable react/display-name */
import { Fragment } from 'react';

export const WithLayout =
  <P extends object>(WrapperComponent: React.ComponentType) =>
  (props: P) => {
    return (
      <Fragment>
        <WrapperComponent {...props} />
      </Fragment>
    );
  };
