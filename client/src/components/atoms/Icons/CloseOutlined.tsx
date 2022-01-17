import React, { PureComponent } from 'react';

type State = {};

type Props = {
  [key: string]: string | number | Object | Function;
};

export default class extends PureComponent<Props, State> {
  render = (): React.ReactElement => (
    <svg
      width="10"
      height="10"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...this.props}>
      <path
        d="M4.72764 7.06045L0.352446 0.412588H4.5575L7.19477 4.73917L9.85634 0.412588H14.0614L9.63758 7.06045L14.268 14H10.0508L7.19477 9.34528L4.32658 14H0.121533L4.72764 7.06045Z"
        fill="#A7A7A7"
      />
    </svg>
  );
}
