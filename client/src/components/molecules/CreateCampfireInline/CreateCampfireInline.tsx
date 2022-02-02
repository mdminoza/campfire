import React from 'react';
import { Col, Grid } from 'antd';
import styled from 'styled-components';
import { TextInput } from '../../atoms/TextInput';
import { Button } from '../../atoms/Button';
import { StyledRow, Wrapper, TextInputWrapper } from './elements';
import { Avatar } from '../../atoms/Avatar';

const { useBreakpoint } = Grid;

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

const campfireMobileBtnStyle = {
  backgroundColor: '#000000',
  borderRadius: 5,
  color: '#ffffff',
  fontWeight: 700,
};

const InputWrapper = styled.div`
  height: 45px;
`;

const CreateCampfireInline = ({
  profileUrl,
  topicValue,
  onChangeTopic,
  descriptionValue,
  onChangeDescription,
  onClickCreate,
}: Props): React.ReactElement => {
  const screens = useBreakpoint();

  const { md, lg, xl } = screens;

  return (
    <Wrapper>
      <StyledRow gutter={[8, 8]}>
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
        {!md && !lg && !xl ? (
          <>
            <Col xs={24} sm={24} md={16}>
              <InputWrapper>
                <TextInput
                  onChange={onChangeDescription}
                  value={descriptionValue}
                  placeholder="CREATE DESCRIPTION"
                />
              </InputWrapper>
            </Col>
            <Col xs={24} sm={24} md={16}>
              <InputWrapper>
                <Button
                  disabled={!topicValue || !descriptionValue}
                  onClick={onClickCreate}
                  style={campfireMobileBtnStyle}>
                  CREATE A CAMPFIRE
                </Button>
              </InputWrapper>
            </Col>
          </>
        ) : (
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
        )}
      </StyledRow>
    </Wrapper>
  );
};

export default CreateCampfireInline;
