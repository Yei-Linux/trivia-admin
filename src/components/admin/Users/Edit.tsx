import {
  BooleanInput,
  Edit,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
} from 'react-admin';

import { Grid } from '@mui/material';
import {
  EditPageWrapper,
  EditWrapper,
} from '../../../layouts/admin/EditWrapper';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';

const ToolbarEdit = () => {
  return (
    <Toolbar>
      <div className="w-full flex justify-between">
        <SaveButton label="Save Usesr" />
      </div>
    </Toolbar>
  );
};

export const EditUser = () => {
  return (
    <div className="editpatient__view h-full">
      <Breadcrumb />

      <Edit component={EditPageWrapper}>
        <SimpleForm component={EditWrapper} toolbar={<ToolbarEdit />}>
          <h2 className="font-semibold mb-5">User Information</h2>

          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <TextInput source="fullName" label="Full Name" disabled />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextInput source="phone" label="Phone" disabled />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextInput source="email" label="Email" disabled />
            </Grid>
            <Grid item sm={6} xs={12}>
              <BooleanInput
                source="isInactive"
                label="Inactive Bot for this user"
              />
            </Grid>
          </Grid>
        </SimpleForm>
      </Edit>
    </div>
  );
};
