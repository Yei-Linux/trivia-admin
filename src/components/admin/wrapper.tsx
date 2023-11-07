import { Admin, Resource } from 'react-admin';
import { UserList } from './Users/List';
import { adminTheme } from './theme';
import { EditUser } from './Users/Edit';
import { AdminLayout } from '../../layouts/admin/AdminLayout';
import PeopleIcon from '@mui/icons-material/People';
import authProvider from '../../config/auth-provider';
import { Login } from './Login/Login';
import { queryClient } from '../../config/react-query';
import { dataProvider } from '../../config/life-cycle-callbacks';

export const AdminWrapper = () => {
  return (
    <Admin
      loginPage={Login}
      authProvider={authProvider}
      dataProvider={dataProvider}
      layout={AdminLayout}
      theme={adminTheme}
      queryClient={queryClient}
    >
      <Resource
        options={{ label: 'Users' }}
        name="users"
        list={UserList}
        edit={EditUser}
        icon={PeopleIcon}
      ></Resource>
    </Admin>
  );
};
