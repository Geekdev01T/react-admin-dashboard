// in src/posts.js
import { Create, SimpleForm, TextInput, required } from 'react-admin';

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
      <TextInput source="username" multiline={true} label="Username" />
      <TextInput source="email" validate={[required()]} />
      <TextInput source="address.street" />
      <TextInput source="phone" />
      <TextInput source="website" />
      <TextInput source="company.name" />
    </SimpleForm>
  </Create>
);
