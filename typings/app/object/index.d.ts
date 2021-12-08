// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminLog from '../../../app/object/admin/log';
import ExportAdminPermissionNode from '../../../app/object/admin/permission_node';
import ExportAdminRole from '../../../app/object/admin/role';
import ExportAdminUser from '../../../app/object/admin/user';


declare module 'egg' {
  interface IAppObjectAdmin {
    Log: ObjectCreator<ExportAdminLog>;
    PermissionNode: ObjectCreator<ExportAdminPermissionNode>;
    Role: ObjectCreator<ExportAdminRole>;
    User: ObjectCreator<ExportAdminUser>;
  }
  interface IAppObject {
    Admin: IAppObjectAdmin;
  }
}
