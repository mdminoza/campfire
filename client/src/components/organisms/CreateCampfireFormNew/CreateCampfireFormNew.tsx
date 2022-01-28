import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import moment, { Moment } from 'moment';
import { Input, Modal } from 'antd';
import { CreateCampfireNewSchema } from './validation';

import { CreateCampfireInline } from '../../molecules/CreateCampfireInline';
import { CreateCampfireSchedule } from '../../molecules/CreateCampfireSchedule';
import { CreateCampfireSideBar } from '../../molecules/CreateCampfireSideBar';
import { CreateCampfireFooter } from '../../molecules/CreateCampfireFooter';
import { CreateCampfireHeader } from '../../molecules/CreateCampfireHeader';
import { CreateCampfireInviteList } from '../../molecules/CreateCampfireInviteList';
import { CloseOutlined } from '../../atoms/Icons';

const Container = styled.div`
  @media (min-width: 1200px) {
    margin: 0 100px;
  }

  .ant-modal {
    width: calc(100vw - 230px);
  }

  .ant-modal-content {
    border-radius: 4px;
  }

  .ant-modal-body {
    padding: 0;
  }

  margin: 0 40px;
`;

const MainBodyWrapper = styled.div`
  display: flex;
  height: 430px;
  background-color: white;
  border-radius: 4px 4px 0 0;
`;

const HeaderWrapper = styled.div`
  padding: 21px 25px 22px;
  border-bottom: 1px solid #c0c0c0;
`;

const BodyWrapper = styled.div``;

const FooterWrapper = styled.div``;

const SideBarWrapper = styled.div`
  padding: 25px;
  border-right: 1px solid #c0c0c0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InviteWrapper = styled.div`
  display: flex;
`;

const InviteListsWrapper = styled.div`
  flex: 1;
  padding: 20px 15px 0 24px;
  border-right: 1px solid #c0c0c0;
  height: 344px;
`;

const InviteEmailWrapper = styled.div`
  flex: 1;
  background-color: #f4f4f4;
  margin: 18px;
  border-radius: 4px;
  padding: 12px 14px 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .invite-frnds-label {
    color: black;
    font-weight: bold;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  bottom: 30px;
`;

const SelectAllBtn = styled.button`
  background-color: white;
  border: none;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  color: black;
  padding: 4px 20px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 4px;
  &:active {
    background-color: #f5f5f5;
  }
`;

const PendingLabel = styled.span`
  background-color: #f55819;
  padding: 4px 18px;
  border-radius: 4px;
  color: #ffffff;
  font-weight: bold;
  letter-spacing: 1px;
`;

const EmailPendingLabel = styled.span`
  background-color: #f55819;
  padding: 4px 30px;
  border-radius: 4px;
  color: #ffffff;
  font-weight: bold;
  letter-spacing: 1px;
`;

const EmailLabelWrapper = styled.div`
  position: absolute;
  top: 392px;
  right: 60px;
`;

const BtnIcon = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding-left: 0;
  padding-right: 0;
`;

const InputWrapper = styled.div`
  .ant-input-affix-wrapper-lg {
    border-bottom: 1px solid #9e9e9e;
    border-radius: 0;
    padding-left: 2px;
    height: 42px;
    padding: 0 0 0 2px;
    &::hover {
      border-bottom: 1px solid #9e9e9e;
    }
  }
  .ant-input-prefix {
    margin-right: 20px;
  }
  .last-input {
    margin-bottom: 0;
    border-bottom: none;
    &::hover {
      border-bottom: none;
    }
  }
  .ant-input-lg {
    font-size: 16px;
  }
`;

const EmptyDiv = styled.div`
  height: 27.1375px;
`;

type Props = {
  onSubmit: (values: any) => void;
  onClickCreate: () => void;
  toggle: boolean;
  isLoading?: boolean;
  isLoadingInvite?: boolean;
  members: any[];
  selectedMembers: any[];
  onClickInviteUser: (id: string) => void;
  onClickSelectAll: () => void;
  profileUrl?: string;
};

const CreateCampfireFormNew = ({
  onSubmit,
  onClickCreate,
  toggle,
  isLoading = false,
  isLoadingInvite = false,
  members,
  selectedMembers,
  onClickInviteUser,
  onClickSelectAll,
  profileUrl = 'https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
}: Props): React.ReactElement => {
  const formRef = useRef<any>(null);
  const [selected, setSelected] = useState('schedule');
  const [activeHour, setActiveHour] = useState(1);
  const [activeMinute, setActiveMinute] = useState(0);
  const [dateValue, setDateValue] = useState(moment());

  const now = moment();
  const strDate = now.format('hh:mm A');
  const hourNow = strDate.split(':')[0];

  useEffect(() => {
    setActiveHour(+hourNow);
    setActiveMinute(now.minutes());
  }, []);

  const onSelect = (value: string) => {
    setSelected(value);
  };

  useEffect(() => {
    if (formRef && toggle === false) {
      setActiveHour(+hourNow);
      setActiveMinute(now.minutes());
      setDateValue(moment());
      setSelected('schedule');
      formRef?.current?.resetForm();
    }
  }, [formRef, toggle]);

  useEffect(() => {
    if (formRef) {
      formRef?.current?.setFieldValue('invited', selectedMembers);
      if (selectedMembers.length > 0) {
        formRef?.current?.setFieldValue('openTo', 'Invite Only');
      } else {
        formRef?.current?.setFieldValue('openTo', 'Everyone');
      }
    }
  }, [formRef, selectedMembers]);

  return (
    <Formik
      initialValues={{
        topic: '',
        description: '',
        hidden: true,
        scheduleToStart: new Date(),
        hour: +hourNow || '12',
        minutes: `${
          now.minutes() >= 0 && now.minutes() < 10
            ? `0${now.minutes()}`
            : now.minutes()
        }`,
        period: now.hour() >= 12 ? 'pm' : 'am',
        openTo: 'Everyone',
        invited: [],
        duration: '01:00',
        hasSchedule: false,
        email1: '',
        email2: '',
        email3: '',
        email4: '',
        email5: '',
        email6: '',
      }}
      validationSchema={CreateCampfireNewSchema}
      onSubmit={onSubmit}
      innerRef={formRef}>
      {({ values, handleChange, handleSubmit, setFieldValue }) => {
        const transformDate =
          values.scheduleToStart &&
          moment(values.scheduleToStart).format('MMMM DD YYYY').toUpperCase();

        const handleHour = (val: number) => {
          setActiveHour(val);
          setFieldValue('hour', `${val}`);
        };

        const handleMinutes = (val: number) => {
          setActiveMinute(val);
          setFieldValue('minutes', `${val >= 0 && val < 10 ? `0${val}` : val}`);
        };

        const onClickSchedule = () => {
          setFieldValue('hasSchedule', !values.hasSchedule);
        };

        const emails = [
          values.email1,
          values.email2,
          values.email3,
          values.email4,
          values.email5,
          values.email6,
        ];

        const pendingEmails = emails.filter((email) => email).length;

        return (
          <Container>
            <>
              <Modal
                width={1150}
                centered
                visible={toggle}
                closable={false}
                footer={null}
                bodyStyle={{
                  padding: 0,
                }}
                className="cf-create-form"
                wrapClassName="cf-create-form-wrapper"
                maskClosable
                onCancel={onClickCreate}>
                <>
                  <MainBodyWrapper>
                    <SideBarWrapper>
                      <CreateCampfireSideBar
                        selected={selected}
                        onClickItem={onSelect}
                        invited={pendingEmails + selectedMembers.length}
                      />
                    </SideBarWrapper>
                    <Content>
                      <HeaderWrapper>
                        <CreateCampfireHeader
                          onChangeCheckbox={() => {
                            setFieldValue('hidden', !values.hidden);
                          }}
                          topic={values.topic}
                          description={values.description}
                          checked={!values.hidden}
                          type={!values.hidden ? '' : 'hidden-type'}
                        />
                      </HeaderWrapper>
                      <BodyWrapper>
                        {selected === 'schedule' ? (
                          <CreateCampfireSchedule
                            activeHour={activeHour}
                            onClickHour={handleHour}
                            activeMinute={activeMinute}
                            onClickMinute={handleMinutes}
                            activePeriod={values.period}
                            onClickPeriod={handleChange('period')}
                            valueDate={dateValue}
                            onSelectDate={(val: Moment) => {
                              setFieldValue('scheduleToStart', val);
                              setDateValue(val);
                            }}
                            hasSchedule={values.hasSchedule}
                            onClickSchedule={onClickSchedule}
                          />
                        ) : (
                          <InviteWrapper>
                            <InviteListsWrapper>
                              <CreateCampfireInviteList
                                users={members}
                                onClick={onClickInviteUser}
                                isLoading={isLoadingInvite}
                              />
                              <BtnWrapper>
                                <SelectAllBtn onClick={onClickSelectAll}>
                                  SELECT ALL
                                </SelectAllBtn>
                                {selectedMembers.length > 0 && (
                                  <PendingLabel>
                                    {selectedMembers.length} INVITATION
                                    {selectedMembers.length > 1 ? 'S' : ''}{' '}
                                    PENDING
                                  </PendingLabel>
                                )}
                              </BtnWrapper>
                            </InviteListsWrapper>
                            <InviteEmailWrapper>
                              <span className="invite-frnds-label">
                                Invite friends by email:
                              </span>
                              <InputWrapper>
                                <Input
                                  bordered={false}
                                  prefix={
                                    values.email1 ? (
                                      <BtnIcon
                                        onClick={() =>
                                          setFieldValue('email1', '')
                                        }>
                                        <CloseOutlined />
                                      </BtnIcon>
                                    ) : (
                                      <EmptyDiv />
                                    )
                                  }
                                  size="large"
                                  value={values.email1}
                                  onChange={handleChange('email1')}
                                />
                                <Input
                                  bordered={false}
                                  prefix={
                                    values.email2 ? (
                                      <BtnIcon
                                        onClick={() =>
                                          setFieldValue('email2', '')
                                        }>
                                        <CloseOutlined />
                                      </BtnIcon>
                                    ) : (
                                      <EmptyDiv />
                                    )
                                  }
                                  size="large"
                                  value={values.email2}
                                  onChange={handleChange('email2')}
                                />
                                <Input
                                  bordered={false}
                                  prefix={
                                    values.email3 ? (
                                      <BtnIcon
                                        onClick={() =>
                                          setFieldValue('email3', '')
                                        }>
                                        <CloseOutlined />
                                      </BtnIcon>
                                    ) : (
                                      <EmptyDiv />
                                    )
                                  }
                                  size="large"
                                  value={values.email3}
                                  onChange={handleChange('email3')}
                                />
                                <Input
                                  bordered={false}
                                  prefix={
                                    values.email4 ? (
                                      <BtnIcon
                                        onClick={() =>
                                          setFieldValue('email4', '')
                                        }>
                                        <CloseOutlined />
                                      </BtnIcon>
                                    ) : (
                                      <EmptyDiv />
                                    )
                                  }
                                  size="large"
                                  value={values.email4}
                                  onChange={handleChange('email4')}
                                />
                                <Input
                                  bordered={false}
                                  prefix={
                                    values.email5 ? (
                                      <BtnIcon
                                        onClick={() =>
                                          setFieldValue('email5', '')
                                        }>
                                        <CloseOutlined />
                                      </BtnIcon>
                                    ) : (
                                      <EmptyDiv />
                                    )
                                  }
                                  size="large"
                                  value={values.email5}
                                  onChange={handleChange('email5')}
                                />
                                <Input
                                  bordered={false}
                                  prefix={
                                    values.email6 ? (
                                      <BtnIcon
                                        onClick={() =>
                                          setFieldValue('email6', '')
                                        }>
                                        <CloseOutlined />
                                      </BtnIcon>
                                    ) : (
                                      <EmptyDiv />
                                    )
                                  }
                                  size="large"
                                  value={values.email6}
                                  onChange={handleChange('email6')}
                                  className="last-input"
                                />
                              </InputWrapper>
                              {pendingEmails > 0 && (
                                <EmailLabelWrapper>
                                  <EmailPendingLabel>
                                    {pendingEmails} EMAIL
                                    {pendingEmails > 1 ? 'S' : ''} PENDING
                                  </EmailPendingLabel>
                                </EmailLabelWrapper>
                              )}
                            </InviteEmailWrapper>
                          </InviteWrapper>
                        )}
                      </BodyWrapper>
                    </Content>
                  </MainBodyWrapper>
                  <FooterWrapper>
                    <CreateCampfireFooter
                      schedule={
                        values.hasSchedule && selected === 'schedule'
                          ? `${values.hour}:${
                              values.minutes
                            } ${values.period.toUpperCase()} ON ${transformDate}`
                          : ''
                      }
                      onClickGo={handleSubmit}
                      hasInvite={selected === 'invite'}
                      isLoading={isLoading}
                    />
                  </FooterWrapper>
                </>
              </Modal>
              <CreateCampfireInline
                profileUrl={profileUrl}
                onChangeTopic={handleChange('topic')}
                topicValue={values.topic}
                onChangeDescription={handleChange('description')}
                descriptionValue={values.description}
                onClickCreate={onClickCreate}
              />
            </>
          </Container>
        );
      }}
    </Formik>
  );
};

export default CreateCampfireFormNew;
