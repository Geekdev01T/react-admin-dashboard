import { Edit, SimpleForm, TextInput, useRecordContext } from 'react-admin';

const PageTitle = () => {

  const record = useRecordContext();
  return <span>Edit &quot;{record?.name}&quot; </span>;
  
}

export const UserEdit = () => (
  <Edit title={<PageTitle />}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="address.street" />
      <TextInput source="phone" />
      <TextInput source="website" />
      <TextInput source="company.name" />
    </SimpleForm>
  </Edit>
);