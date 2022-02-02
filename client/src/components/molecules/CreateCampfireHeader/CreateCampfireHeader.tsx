import React from 'react';
import { Col } from 'antd';
import {
  CheckBoxWrapper,
  CheckboxContainer,
  InfoTitle,
  InfoTitleType,
  InfoSubtitle,
  CheckboxLabelWrapper,
  TopicWrapper,
  CampfireHeaderRow,
} from './elements';
import { Checkbox } from '../../atoms/Checkbox';

type Props = {
  topic: string;
  description: string;
  type?: string;
  checked: boolean;
  onChangeCheckbox: () => void;
};

const CreateCampfireHeader = ({
  topic,
  description,
  checked,
  onChangeCheckbox,
  type = '',
}: Props): React.ReactElement => (
  <CampfireHeaderRow gutter={[6, 8]}>
    <Col xs={24} sm={24} md={12}>
      <CheckBoxWrapper>
        <CheckboxContainer>
          <Checkbox checked={checked} onChange={onChangeCheckbox} />
        </CheckboxContainer>
        <CheckboxLabelWrapper>
          <InfoTitle>
            Campfire is{' '}
            <InfoTitleType className={type}>
              {checked ? 'PUBLIC' : 'HIDDEN'}
            </InfoTitleType>
          </InfoTitle>
          <InfoSubtitle>
            {checked
              ? 'Uncheck to hide from public campfire list'
              : 'Check to show in public campfire list'}
          </InfoSubtitle>
        </CheckboxLabelWrapper>
      </CheckBoxWrapper>
    </Col>
    <Col className="campfire-header-2" xs={24} sm={24} md={12}>
      <TopicWrapper>
        <span className="topic-label">{topic.toUpperCase()}</span>
        <span className="description-label">{description.toUpperCase()}</span>
      </TopicWrapper>
    </Col>
  </CampfireHeaderRow>
);

export default CreateCampfireHeader;
