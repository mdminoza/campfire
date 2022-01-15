import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import moment, { Moment } from 'moment';

import { CreateCampfireInline } from '../../molecules/CreateCampfireInline';
import { CreateCampfireSchedule } from '../../molecules/CreateCampfireSchedule';
import { CreateCampfireSideBar } from '../../molecules/CreateCampfireSideBar';
import { CreateCampfireFooter } from '../../molecules/CreateCampfireFooter';
import { CreateCampfireHeader } from '../../molecules/CreateCampfireHeader';
import { CreateCampfireInviteList } from '../../molecules/CreateCampfireInviteList';

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
      }}
      // validationSchema={CreateCampfireSchema}
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
                          </InviteListsWrapper>
                          <InviteEmailWrapper>Test</InviteEmailWrapper>
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
