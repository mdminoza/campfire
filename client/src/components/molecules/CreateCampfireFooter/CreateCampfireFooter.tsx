import React from 'react';
import { Container, LabelWrapper, ButtonWrapper, GoButton } from './elements';

type Props = {
  schedule?: string;
  hasInvite?: boolean;
  onClickGo: () => void;
};

const CreateCampfireFooter = ({
  schedule = '',
  hasInvite = false,
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
      <GoButton onClick={onClickGo}>GO</GoButton>
    </ButtonWrapper>
  </Container>
);

export default CreateCampfireFooter;
