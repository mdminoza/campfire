import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import moment, { Moment } from 'moment';
import { Input } from 'antd';
import { CreateCampfireNewSchema } from './validation';

import { CreateCampfireInline } from '../../molecules/CreateCampfireInline';
import { CreateCampfireSchedule } from '../../molecules/CreateCampfireSchedule';
import { CreateCampfireSideBar } from '../../molecules/CreateCampfireSideBar';
import { CreateCampfireFooter } from '../../molecules/CreateCampfireFooter';
import { CreateCampfireHeader } from '../../molecules/CreateCampfireHeader';
import { CreateCampfireInviteList } from '../../molecules/CreateCampfireInviteList';
import { CloseOutlined } from '../../atoms/Icons';

const Container = styled.div``;

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
  top: 432px;
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
  }
  .ant-input-prefix {
    margin-right: 20px;
  }
  .last-input {
    margin-bottom: 0;
    border-bottom: none;
  }
  .ant-input-lg {
    font-size: 16px;
  }
`;

const EmptyDiv = styled.div`
  height: 27.1375px;
`;

const CreateCampfireFormNew = (): React.ReactElement => {
  const formRef = useRef<any>(null);
  const [selected, setSelected] = useState('schedule');
  const [toggle, setToggle] = useState(false);
  const [activeHour, setActiveHour] = useState(1);
  const [activeMinute, setActiveMinute] = useState(0);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    setUsers([
      {
        id: 'bvn88',
        name: 'Johnny',
        selected: false,
      },
      {
        id: 'qw33e',
        name: 'Steven',
        selected: false,
      },
      {
        id: '4rwer',
        name: 'Charles',
        selected: false,
      },
      {
        id: 'trett',
        name: 'Brent',
        selected: false,
      },
      {
        id: 'rghg',
        name: 'Abel',
        selected: false,
      },
      {
        id: 'qemn42',
        name: 'Cain',
        selected: false,
      },
    ]);
  }, []);

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

  const onSubmit = (values: any) => {
    console.log(values, 'test');
  };

  const onClickCreate = () => setToggle(true);

  const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));

  const onClickInviteUser = (id: string) => {
    const selectedUser = users.find((user) => user.id === id);
    const filtered = users.filter((user) => user.id !== id);
    setUsers([
      ...filtered,
      {
        ...selectedUser,
        selected: !selectedUser.selected,
      },
    ]);
  };

  const onClickSelectAll = () => {
    const selectedUser = users.map((user) => ({
      ...user,
      selected: true,
    }));
    setUsers(selectedUser);
  };

  const selectedUsers = users.filter((user) => user.selected);

  return (
    <Formik
      initialValues={{
        topic: '',
        description: '',
        hidden: true,
        scheduleToStart: moment(),
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
            {toggle ? (
              <>
                <MainBodyWrapper>
                  <SideBarWrapper>
                    <CreateCampfireSideBar
                      selected={selected}
                      onClickItem={onSelect}
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
                          onSelectDate={(val: Moment) => {
                            setFieldValue('scheduleToStart', val);
                          }}
                          hasSchedule={values.hasSchedule}
                          onClickSchedule={onClickSchedule}
                        />
                      ) : (
                        <InviteWrapper>
                          <InviteListsWrapper>
                            <CreateCampfireInviteList
                              users={sortedUsers}
                              onClick={onClickInviteUser}
                            />
                            <BtnWrapper>
                              <SelectAllBtn onClick={onClickSelectAll}>
                                SELECT ALL
                              </SelectAllBtn>
                              {selectedUsers.length > 0 && (
                                <PendingLabel>
                                  {selectedUsers.length} INVITATION
                                  {selectedUsers.length > 1 ? 'S' : ''} PENDING
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
                  />
                </FooterWrapper>
              </>
            ) : (
              <CreateCampfireInline
                profileUrl="https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY"
                onChangeTopic={handleChange('topic')}
                topicValue={values.topic}
                onChangeDescription={handleChange('description')}
                descriptionValue={values.description}
                onClickCreate={onClickCreate}
              />
            )}
          </Container>
        );
      }}
    </Formik>
  );
};

export default CreateCampfireFormNew;
