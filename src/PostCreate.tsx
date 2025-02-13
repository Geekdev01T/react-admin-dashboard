// in src/posts.js
import { Create, SimpleForm, TextInput, DateInput, required } from 'react-admin';

export const PostCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="user" validate={[required()]} />
      <TextInput source="title" multiline={true} label="Title" validate={[required()]} />
      <TextInput source="body" />
      <DateInput label="Publication date" source="published_at" defaultValue={new Date()} />
      <TextInput source="status" />
    </SimpleForm>
  </Create>
);
