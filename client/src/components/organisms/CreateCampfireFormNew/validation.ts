import * as Yup from 'yup';

export const CreateCampfireNewSchema = Yup.object().shape({
  email1: Yup.string().email('Invalid email'),
  email2: Yup.string().email('Invalid email'),
  email3: Yup.string().email('Invalid email'),
  email4: Yup.string().email('Invalid email'),
  email5: Yup.string().email('Invalid email'),
  email6: Yup.string().email('Invalid email'),
});
