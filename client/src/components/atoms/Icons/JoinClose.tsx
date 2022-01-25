import React, { PureComponent } from 'react';

type State = {};

type Props = {
  [key: string]: string | number | Object | Function;
};

export default class extends PureComponent<Props, State> {
  render = (): React.ReactElement => (
    <svg
      width="35"
      height="35"
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...this.props}>
      <path
        d="M31.2465 28.759L44.2891 41.8016L41.8249 44.2658L28.7823 31.2233L15.7998 44.2057L13.3355 41.7415L26.318 28.759L13.3355 15.7765L15.7998 13.3122L28.7823 26.2947L41.8249 13.2521L44.2891 15.7164L31.2465 28.759Z"
        fill="white"
      />
    </svg>
  );
}
