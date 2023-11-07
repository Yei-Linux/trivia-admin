import { AppBar, Layout, Menu } from 'react-admin';
import { Avatar } from '@mui/material';
import Logout from '../../../components/admin/Logout/Logout';
import { useEffect, useState } from 'react';

export interface IPersonalInfo {
  email: string;
  fullName: string;
}

const MyAppBar = () => {
  const [personalInfo, setPersonalInfo] = useState<IPersonalInfo>({
    email: '',
    fullName: '',
  });

  useEffect(() => {
    const personalInfoStorage = localStorage.getItem('personalInfo');

    if (!personalInfoStorage) return;
    setPersonalInfo(JSON.parse(personalInfoStorage));
  }, []);

  return (
    <AppBar color="primary" userMenu={<></>}>
      <div className="w-full flex justify-between items-center">
        <div>
          <a href="/admin#/users">Trivia Bot</a>
        </div>

        <div className="h-full flex items-center gap-3">
          <Avatar alt="User" src="/assets/userprofile.png" />
          <span className="font-bold">{personalInfo?.fullName}</span>
          <Logout />
        </div>
      </div>
    </AppBar>
  );
};

export const MyMenu = () => (
  <div className="py-4">
    <Menu>
      <Menu.ResourceItem name="users" />
    </Menu>
  </div>
);

export const AdminLayout = (props: any) => (
  <Layout {...props} appBar={MyAppBar} menu={MyMenu} />
);
