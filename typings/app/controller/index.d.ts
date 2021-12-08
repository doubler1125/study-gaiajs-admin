// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminAdmin from '../../../app/controller/admin/admin';
import ExportAdminAdminUser from '../../../app/controller/admin/admin_user';
import ExportAdminCache from '../../../app/controller/admin/cache';
import ExportAdminCircuit from '../../../app/controller/admin/circuit';
import ExportAdminDowngrade from '../../../app/controller/admin/downgrade';
import ExportAdminHeapdump from '../../../app/controller/admin/heapdump';
import ExportAdminLog from '../../../app/controller/admin/log';
import ExportAdminPermissionNode from '../../../app/controller/admin/permission_node';
import ExportAdminRole from '../../../app/controller/admin/role';
import ExportAdminStats from '../../../app/controller/admin/stats';
import ExportAdminStatus from '../../../app/controller/admin/status';
import ExportAdminSuper from '../../../app/controller/admin/super';
import ExportAdminTask from '../../../app/controller/admin/task';

declare module 'egg' {
  interface IController {
    admin: {
      admin: ExportAdminAdmin;
      adminUser: ExportAdminAdminUser;
      cache: ExportAdminCache;
      circuit: ExportAdminCircuit;
      downgrade: ExportAdminDowngrade;
      heapdump: ExportAdminHeapdump;
      log: ExportAdminLog;
      permissionNode: ExportAdminPermissionNode;
      role: ExportAdminRole;
      stats: ExportAdminStats;
      status: ExportAdminStatus;
      super: ExportAdminSuper;
      task: ExportAdminTask;
    }
  }
}
