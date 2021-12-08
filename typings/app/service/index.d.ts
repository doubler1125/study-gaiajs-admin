// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminAuth from '../../../app/service/admin_auth';
import ExportAdminBaseAuth from '../../../app/service/admin/base_auth';
import ExportAdminLogger from '../../../app/service/admin/logger';
import ExportAdminMenu from '../../../app/service/admin/menu';
import ExportAdminPermissionNode from '../../../app/service/admin/permission_node';
import ExportAdminRole from '../../../app/service/admin/role';
import ExportAdminUser from '../../../app/service/admin/user';
import ExportAdminAuthDefault from '../../../app/service/admin/auth/default';


declare module 'egg' {
  interface IAppServiceAdminAuth {
    default: ExportAdminAuthDefault;
  }
  interface IAppServiceAdmin {
    baseAuth: ExportAdminBaseAuth;
    logger: ExportAdminLogger;
    menu: ExportAdminMenu;
    permissionNode: ExportAdminPermissionNode;
    role: ExportAdminRole;
    user: ExportAdminUser;
    auth: IAppServiceAdminAuth;
  }
  interface IAppService {
    adminAuth: ExportAdminAuth;
    admin: IAppServiceAdmin;
  }
}
