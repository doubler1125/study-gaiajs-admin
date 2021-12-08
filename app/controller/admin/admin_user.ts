import bp from '@gaiajs/gaiajs/app/lib/router/admin_blueprint';
import { AdminBaseController } from '../../lib/router/admin';
import AdminSuperUserRoleAddRequest from '../../net/request/AdminSuperUserRoleAdd';
import AdminSuperUserRoleDelRequest from '../../net/request/AdminSuperUserRoleDel';
import AdminSuperUserRoleAddResponse from '../../net/response/AdminSuperUserRoleAdd';
import AdminSuperUserRoleDelResponse from '../../net/response/AdminSuperUserRoleDel';
import AdminSuperUsersListRequest from '../../net/request/AdminSuperUsersList';
import AdminSuperUsersListResponse from '../../net/response/AdminSuperUsersList';
import AdminSuperUserAddRequest from '../../net/request/AdminSuperUserAdd';
import AdminSuperUserAddResponse from '../../net/response/AdminSuperUserAdd';
import AdminSuperUserDelRequest from '../../net/request/AdminSuperUserDel';
import AdminSuperUserDelResponse from '../../net/response/AdminSuperUserDel';
import AdminHasPermissionRequest from '../../net/request/AdminHasPermission';
import AdminUser from '../../object/admin/user';
import AdminHasPermissionResponse from '../../net/response/AdminHasPermission';
import { ObjectProperties } from '@gaiajs/gaiajs/app/object/BasePropertiesObject';

export default class AdminUserController extends AdminBaseController {
  @bp.action()
  async adminUsers(req: AdminSuperUsersListRequest) {
    const count = await this.ctx.service.admin.user.countAll();
    const users = await this.ctx.service.admin.user.loadAll(req.limit, req.skip || 0);

    return this.ctx.success({ data: { count, users } }, AdminSuperUsersListResponse);
  }

  @bp.action()
  async createAdminUser(req: AdminSuperUserAddRequest) {
    const userProperties: ObjectProperties<AdminUser> = req.getProperties() as ObjectProperties<AdminUser>;
    if (!userProperties.password) {
      return this.ctx.fail(400, '未设置密码');
    }
    userProperties._id = userProperties.username;
    userProperties.password = await this.ctx.service.admin.user.passwordEncrypt(userProperties.password);

    let user = await this.ctx.service.admin.user.load(userProperties._id!);
    if (user) {
      await this.ctx.service.admin.user.update(user, Object.assign(userProperties, { disabled: false }));
    } else {
      user = await this.ctx.service.admin.user.create(userProperties);

      await this.ctx.service.admin.logger.log({ type: 'super', subType: 'admin_user', targetId: userProperties._id, desc: '添加管理员' });
    }

    return this.ctx.success({ data: user }, AdminSuperUserAddResponse);
  }

  @bp.action()
  async deleteAdminUser(req: AdminSuperUserDelRequest) {
    const user = await this.ctx.service.admin.user.load(req.username);
    if (user) {
      await this.ctx.service.admin.user.delUser(user);
    }

    await this.ctx.service.admin.logger.log({ type: 'super', subType: 'admin_user', targetId: req.username, desc: '删除管理员' });

    return new AdminSuperUserDelResponse({ success: true });
  }

  @bp.action()
  async userAddRole(req: AdminSuperUserRoleAddRequest) {
    const user = await this.ctx.service.admin.user.load(req.username);
    if (!user) {
      return this.ctx.fail(404, '找不到管理员');
    }

    const role = await this.ctx.service.admin.role.load(req.role);
    if (!role || role.disabled) {
      return this.ctx.fail(404, '找不到角色');
    }

    if (user.hasRole(role)) {
      return this.ctx.fail(404, '权限已存在');
    }

    await user.addRole(role);

    await this.ctx.service.admin.logger.log({ type: 'super', subType: 'admin_user', targetId: req.username, desc: '添加角色: ' + req.role });

    return this.ctx.success({ data: user }, AdminSuperUserRoleAddResponse);
  }

  @bp.action()
  async userDelRole(req: AdminSuperUserRoleDelRequest) {
    const user = await this.ctx.service.admin.user.load(req.username);
    if (!user) {
      return this.ctx.fail(404, '找不到管理员');
    }

    const role = await this.ctx.service.admin.role.load(req.role);
    if (!role) {
      return this.ctx.fail(404, '找不到角色');
    }

    await user.delRole(role);

    await this.ctx.service.admin.logger.log({ type: 'super', subType: 'admin_user', targetId: req.username, desc: '删除角色: ' + req.role });

    return this.ctx.success({ data: user }, AdminSuperUserRoleDelResponse);
  }

  @bp.action()
  async hasPermission(req: AdminHasPermissionRequest) {
    // if (!(this.ctx.user instanceof AdminUser)) {
    //   return this.ctx.fail(403, 'access denied');
    // }

    const node = await this.ctx.service.admin.permissionNode.load(req.permission);
    if (!node) {
      return this.ctx.fail(404, 'not found');
    }

    const allow = await (this.ctx.user as AdminUser).hasPermissionNode(node);

    return this.ctx.success({ data: { allow } }, AdminHasPermissionResponse);
  }
}
