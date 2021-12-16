import { Context } from 'egg';
import { ObjectModelOptions } from 'study-gaiajs/app/lib/model/ObjectModelService';
import BaseAdminPermissionNodeModelService from 'study-gaiajs/app/service/admin/permission_node';
import PermissionNode from '../../object/admin/permission_node';

export default class AdminPermissionNodeModelService<T extends PermissionNode = PermissionNode> extends BaseAdminPermissionNodeModelService<T> {
  constructor(ctx: Context, daoName: string = 'AdminPermissionNode', options: ObjectModelOptions<T> = {}) {
    super(ctx, daoName, Object.assign({ objectModelClass: PermissionNode, disableCache: false, collection: 'admin_permission_node' }, options));

  }

  get schema() {
    return {
      _id: { type: String, comment: '角色名称' },
      name: { type: String, comment: '显示名称' },
      rules: { type: [String], comment: '规则' },
      disabled: { type: Boolean, comment: '是否已删除' },
    };
  }
}
