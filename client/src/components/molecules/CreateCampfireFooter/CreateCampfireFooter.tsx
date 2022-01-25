import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Container,
  LabelWrapper,
  ButtonWrapper,
  GoButton,
  LoaderWrapper,
} from './elements';
import { theme } from '../../../constants';

type Props = {
  schedule?: string;
  hasInvite?: boolean;
  onClickGo: () => void;
  isLoading?: boolean;
};

const loaderStyle = {
  fontSize: 23,
  color: theme.colors.mainWhite,
};

const CreateCampfireFooter = ({
  schedule = '',
  hasInvite = false,
  isLoading = false,
  onClickGo,
}: Props): React.ReactElement => (
  <Container>
    <LabelWrapper>
      <span className="start-label">START CAMPFIRE</span>
      <span className="schedule-label">{schedule}</span>
    </LabelWrapper>
    <ButtonWrapper>
      {hasInvite && (
        <span className="invitation-label">
          INVITATIONS WILL BE SENT AFTER CAMPFIRE CREATION IS COMPLETED
        </span>
      )}

      {isLoading ? (
        <LoaderWrapper>
          <LoadingOutlined style={loaderStyle} />
        </LoaderWrapper>
      ) : (
        <GoButton onClick={onClickGo}>GO</GoButton>
      )}
    </ButtonWrapper>
  </Container>
);

export default CreateCampfireFooter;
