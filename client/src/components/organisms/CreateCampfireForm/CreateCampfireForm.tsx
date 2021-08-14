import React, { useRef, useEffect } from 'react';
import { Formik } from 'formik';

import { CreateCampfire } from '../../molecules/CreateCampfire';

import { CampfireParams } from '../../../../common/domain/entities/campfire';
import { CreateCampfireSchema } from './validation';

type Props = {
  onSubmit: (values: CampfireParams) => void;
  onPress: () => void;
  fetchUserList?: (username: string) => void;
  toggle: boolean;
  isLoading?: boolean;
  didSucceed?: boolean;
};

const CreateCampfireForm = ({
  onSubmit,
  onPress,
  fetchUserList = () => {},
  toggle,
  isLoading = false,
  didSucceed = false,
}: Props): React.ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef<any>(null);

  useEffect(() => {
    if (formRef && didSucceed) {
      formRef?.current?.resetForm();
    }
  }, [formRef, didSucceed]);

  return (
    <Formik
      initialValues={{
        topic: '',
        description: '',
        hidden: false,
        scheduleToStart: new Date(),
        openTo: 'Everyone',
        invited: [],
        duration: '01:00',
      }}
      validationSchema={CreateCampfireSchema}
      onSubmit={(values: CampfireParams) => {
        onSubmit(values);
      }}
      innerRef={formRef}>
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <CreateCampfire
          onChangeScheduleTostart={(schedule) => {
            const scheduleToStart =
              schedule === 'IMMEDIATELY' ? new Date() : new Date(schedule);
            setFieldValue('scheduleToStart', scheduleToStart);
          }}
          onPress={values.topic && values.description ? onPress : () => {}}
          onPressSubmit={
            !values.topic && !values.description && toggle
              ? onPress
              : handleSubmit
          }
          onChangeCheckbox={() => {
            setFieldValue('hidden', !values.hidden);
          }}
          checked={values.hidden}
          topicValue={values.topic}
          descriptionValue={values.description}
          onChangeTopic={handleChange('topic')}
          onChangeDescription={handleChange('description')}
          toggled={toggle}
          isLoading={isLoading}
          fetchUserList={fetchUserList}
          onChangeOpenTo={(type, invited) => {
            const invitedData = invited.map((val: any) => ({
              id: val[0],
              name: val[1],
              profileUrl: val[2],
              altName: val[3],
            }));
            setFieldValue('openTo', type);
            setFieldValue('invited', type === 'Everyone' ? [] : invitedData);
          }}
          onChangeDuration={(duration) => {
            setFieldValue('duration', duration);
          }}
        />
      )}
    </Formik>
  );
};

export default CreateCampfireForm;
