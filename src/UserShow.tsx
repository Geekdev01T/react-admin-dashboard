import { EmailField, Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';

const PageTitle = () => {

  const record = useRecordContext();
  return <span>Show &quot;{record?.name}&quot; </span>;
  
}

export const UserShow = () => (
  <Show title={<PageTitle />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="address.street" />
      <TextField source="phone" />
      <TextField source="website" />
      <TextField source="company.name" />
    </SimpleShowLayout>
  </Show>
);