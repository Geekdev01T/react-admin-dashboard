import { Datagrid, EmailField, List, SearchInput, TextField } from 'react-admin';

export const UserList = () => (
  <List title="User List" sort={{ field: 'username', order: 'ASC' }} filters={[<SearchInput source="q" alwaysOn={true} />]}>
    
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="website" />
    </Datagrid>
    
  </List>
);