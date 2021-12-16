import bp from 'study-gaiajs/app/lib/router/admin_blueprint';
import { AdminBaseController } from '../../lib/router/admin';
import AdminSuperPermissionNodeRequest from '../../net/request/AdminSuperPermissionNode';
import AdminSuperPermissionNodeAddRequest from '../../net/request/AdminSuperPermissionNodeAdd';
import AdminSuperPermissionNodeDelRequest from '../../net/request/AdminSuperPermissionNodeDel';
import AdminSuperPermissionNodeEditRequest from '../../net/request/AdminSuperPermissionNodeEdit';
import AdminSuperPermissionNodesListRequest from '../../net/request/AdminSuperPermissionNodesList';
import AdminSuperPermissionNodeResponse from '../../net/response/AdminSuperPermissionNode';
import AdminSuperPermissionNodeAddResponse from '../../net/response/AdminSuperPermissionNodeAdd';
import AdminSuperPermissionNodeDelResponse from '../../net/response/AdminSuperPermissionNodeDel';
import AdminSuperPermissionNodeEditResponse from '../../net/response/AdminSuperPermissionNodeEdit';
import AdminSuperPermissionNodesListResponse from '../../net/response/AdminSuperPermissionNodesList';

export default class AdminUserController extends AdminBaseController {
  @bp.get('/admin/super/permission_node.html')
  async permissionNodePage() {
    await this.ctx.render('admin/permission_node');
  }

  @bp.action()
  async permissionNodesList(req: AdminSuperPermissionNodesListRequest) {
    const count = await this.ctx.service.admin.permissionNode.countAll();
    const nodes = await this.ctx.service.admin.permissionNode.loadAll(req.limit, req.skip || 0);

    return this.ctx.success({ data: { count, nodes } }, AdminSuperPermissionNodesListResponse);
  }

  @bp.action()
  async getPermissionNode(req: AdminSuperPermissionNodeRequest) {
    const node = await this.ctx.service.admin.permissionNode.load(req.id);
    if (!node || node.disabled) {
      return this.ctx.fail(404, 'not found');
    }

    return this.ctx.success({ data: node }, AdminSuperPermissionNodeResponse);
  }

  @bp.action()
  async addPermissionNode(req: AdminSuperPermissionNodeAddRequest) {
    const nodeProperties = req.node;
    if (!nodeProperties._id) {
      nodeProperties._id = nodeProperties.id || nodeProperties.name;
      delete nodeProperties.id;
    }

    if (!nodeProperties._id || !nodeProperties.name || !nodeProperties.rules) {
      return this.ctx.fail(406, '参数不合法');
    }

    let node = await this.ctx.service.admin.permissionNode.load(nodeProperties._id);
    if (node) {
      if (!node.disabled) {
        return this.ctx.fail(406, '权限项已存在');
      }

      await this.ctx.service.admin.permissionNode.update(node, Object.assign({ disabled: false }, nodeProperties));
    } else {
      node = await this.ctx.service.admin.permissionNode.create(nodeProperties);
    }

    await this.ctx.service.admin.logger.log({ type: 'super', subType: 'permission_node', targetId: nodeProperties._id, desc: '添加权限项:' + JSON.stringify(nodeProperties), detail: req.node });

    return this.ctx.success({ data: node }, AdminSuperPermissionNodeAddResponse);
  }

  @bp.action()
  async editPermissionNode(req: AdminSuperPermissionNodeEditRequest) {
    // if (['super'].indexOf(req.id) >= 0) {
    //   return this.ctx.fail(403, '禁止编辑');
    // }

    const node = await this.ctx.service.admin.permissionNode.load(req.id);
    if (!node) {
      return this.ctx.fail(404, 'not found');
    }

    try {
      await this.ctx.service.admin.permissionNode.update(node, req.node);

      await this.ctx.service.admin.logger.log({ type: 'super', subType: 'permission_node', targetId: req.id, desc: '修改权限项:' + JSON.stringify(req.node), detail: req.node });

      return this.ctx.success({ data: node }, AdminSuperPermissionNodeEditResponse);
    } catch (err) {
      return this.ctx.fail(500, err instanceof Error && err.message || 'unknown error');
    }
  }

  @bp.action()
  async delPermissionNode(req: AdminSuperPermissionNodeDelRequest) {
    // if (['super'].indexOf(req.id) >= 0) {
    //   return this.ctx.fail(403, '禁止删除');
    // }

    const node = await this.ctx.service.admin.permissionNode.load(req.id);
    if (!node) {
      return this.ctx.fail(404, 'not found');
    }

    try {
      await this.ctx.service.admin.permissionNode.delNode(node);

      await this.ctx.service.admin.logger.log({ type: 'super', subType: 'permission_node', targetId: req.id, desc: '删除权限项' });
    } catch (err) {
      return new AdminSuperPermissionNodeDelResponse({ success: false, info: err instanceof Error && err.message }, this.ctx);
    }

    return new AdminSuperPermissionNodeDelResponse({ success: true }, this.ctx);
  }
}
