import bp from 'study-gaiajs/app/lib/router/admin_blueprint';
import { AdminBaseController } from '../../lib/router/admin';
import AdminSuperRoleListRequest from '../../net/request/AdminSuperRoleList';
import AdminSuperRoleRequest from '../../net/request/AdminSuperRole';
import AdminSuperRoleResponse from '../../net/response/AdminSuperRole';
import AdminSuperRoleListResponse from '../../net/response/AdminSuperRoleList';
import AdminSuperRoleAddRequest from '../../net/request/AdminSuperRoleAdd';
import AdminSuperRoleAddResponse from '../../net/response/AdminSuperRoleAdd';
import AdminSuperRoleEditRequest from '../../net/request/AdminSuperRoleEdit';
import AdminSuperRoleEditResponse from '../../net/response/AdminSuperRoleEdit';
import AdminSuperRoleDelRequest from '../../net/request/AdminSuperRoleDel';
import AdminSuperRoleDelResponse from '../../net/response/AdminSuperRoleDel';

export default class AdminUserController extends AdminBaseController {

  @bp.get('/admin/super/role.html')
  async rolePage() {
    await this.ctx.render('admin/role');
  }

  @bp.action()
  async roleList(req: AdminSuperRoleListRequest) {
    const count = await this.ctx.service.admin.role.countAll();
    const roles = await this.ctx.service.admin.role.loadAll(req.limit, req.skip || 0);

    return this.ctx.success({ data: { count, roles } }, AdminSuperRoleListResponse);
  }

  @bp.action()
  async getRole(req: AdminSuperRoleRequest) {
    const role = await this.ctx.service.admin.role.load(req.role);
    if (!role || role.disabled) {
      return this.ctx.fail(404, 'not found');
    }

    return this.ctx.success({ data: role }, AdminSuperRoleResponse);
  }

  @bp.action()
  async addRole(req: AdminSuperRoleAddRequest) {
    const roleProperties = req.role;
    if (!roleProperties._id) {
      roleProperties._id = roleProperties.id || roleProperties.name;
      delete roleProperties.id;
    }

    if (
      !roleProperties._id ||
      // !roleProperties.rules ||
      // !roleProperties.rules.allow || !Array.isArray(roleProperties.rules.allow) ||
      // !roleProperties.rules.deny || !Array.isArray(roleProperties.rules.deny) ||
      !roleProperties.hasOwnProperty('allow') || !Array.isArray(roleProperties.allow) ||
      !roleProperties.hasOwnProperty('deny') || !Array.isArray(roleProperties.deny)
    ) {
      return this.ctx.fail(406, '参数不合法');
    }

    let role = await this.ctx.service.admin.role.load(roleProperties._id);
    if (role) {
      if (!role.disabled) {
        return this.ctx.fail(406, '角色已存在');
      }

      await this.ctx.service.admin.role.update(role, Object.assign({ disabled: false }, roleProperties));
    } else {
      role = await this.ctx.service.admin.role.create(roleProperties);
    }

    await this.ctx.service.admin.logger.log({ type: 'super', subType: 'role', targetId: roleProperties._id, desc: '添加角色', detail: req.role });

    return this.ctx.success({ data: role }, AdminSuperRoleAddResponse);
  }

  @bp.action()
  async editRole(req: AdminSuperRoleEditRequest) {
    if ([ 'super', 'anonymous' ].indexOf(req.name) >= 0) {
      return this.ctx.fail(403, '禁止编辑');
    }

    const role = await this.ctx.service.admin.role.load(req.name);
    if (!role) {
      return this.ctx.fail(404, 'not found');
    }

    try {
      await this.ctx.service.admin.role.update(role, req.role);

      await this.ctx.service.admin.logger.log({ type: 'super', subType: 'role', targetId: req.name, desc: '修改角色:' + JSON.stringify(req.role), detail: req.role });

      return this.ctx.success({ data: role }, AdminSuperRoleEditResponse);
    } catch (err) {
      return this.ctx.fail(500, err instanceof Error && err.message || 'unknow error');
    }
  }

  @bp.action()
  async delRole(req: AdminSuperRoleDelRequest) {
    if ([ 'super', 'anonymous' ].indexOf(req.role) >= 0) {
      return this.ctx.fail(403, '禁止删除');
    }

    const role = await this.ctx.service.admin.role.load(req.role);
    if (!role) {
      return this.ctx.fail(404, 'not found');
    }

    try {
      await this.ctx.service.admin.role.delRole(role);

      await this.ctx.service.admin.logger.log({ type: 'super', subType: 'role', targetId: req.role, desc: '删除角色', detail: role.getProperties() });
    } catch (err) {
      return new AdminSuperRoleDelResponse({ success: false, info: err instanceof Error && err.message }, this.ctx);
    }

    return new AdminSuperRoleDelResponse({ success: true }, this.ctx);
  }

}
