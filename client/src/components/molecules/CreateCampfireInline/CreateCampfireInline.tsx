import React from 'react';
import { Col } from 'antd';
import { TextInput } from '../../atoms/TextInput';
import { Button } from '../../atoms/Button';
import { StyledRow, Wrapper, TextInputWrapper } from './elements';
import { Avatar } from '../../atoms/Avatar';

type Props = {
  profileUrl: string;
  onChangeTopic: (value: string) => void;
  topicValue: string;
  onChangeDescription: (value: string) => void;
  descriptionValue: string;
  onClickCreate: () => void;
};

const campfireBtnStyle = {
  backgroundColor: '#000000',
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
  color: '#ffffff',
  width: 'auto',
  fontWeight: 700,
};

const CreateCampfireInline = ({
  profileUrl,
  topicValue,
  onChangeTopic,
  descriptionValue,
  onChangeDescription,
  onClickCreate,
}: Props): React.ReactElement => (
  <Wrapper>
    <StyledRow gutter={[8, 0]}>
      <Col xs={24} sm={24} md={8}>
        <TextInputWrapper>
          <TextInput
            nameClass="topic-input"
            placeholder="CREATE TOPIC"
            addonBefore={<Avatar src={profileUrl} />}
            onChange={onChangeTopic}
            value={topicValue}
            maxLength={24}
          />
        </TextInputWrapper>
      </Col>
      <Col xs={24} sm={24} md={16}>
        <TextInput
          onChange={onChangeDescription}
          value={descriptionValue}
          placeholder="CREATE DESCRIPTION"
          addonAfter={
            <Button
              disabled={!topicValue || !descriptionValue}
              style={campfireBtnStyle}
              onClick={onClickCreate}>
              CREATE A CAMPFIRE
            </Button>
          }
        />
      </Col>
    </StyledRow>
  </Wrapper>
);

export default CreateCampfireInline;
