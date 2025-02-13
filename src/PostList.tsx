import { Datagrid, List, ReferenceField, SearchInput, TextField } from 'react-admin';

export const PostList = () => (
  <List title="Posts List" filters={[<SearchInput source="q" alwaysOn={true} />]}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="userId" reference="users" />
      <TextField source="title" />
      <TextField source="body" />
      <TextField source="Created_at" />
      <TextField source="status" />
    </Datagrid>
  </List>
);