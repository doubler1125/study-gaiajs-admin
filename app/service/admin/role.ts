import { Context } from 'egg';
import { ObjectModelOptions } from '@gaiajs/gaiajs/app/lib/model/ObjectModelService';
import Role from '../../object/admin/role';
import BaseAdminRoleModelService from '@gaiajs/gaiajs/app/service/admin/role';

export default class AdminRoleModelService<T extends Role = Role> extends BaseAdminRoleModelService<T> {
  constructor(ctx: Context, daoName: string = 'AdminRole', options: ObjectModelOptions<T> = {}) {
    super(ctx, daoName, Object.assign({ objectModelClass: Role, disableCache: false, collection: 'admin_role' }, options));

  }

  get schema() {
    return {
      _id: { type: String, comment: '角色名称' },
      name: { type: String, comment: '显示名称' },
      roles: { type: [String], comment: '继承的角色' },
      rules: {
        type: {
          allow: { type: [String], comment: '允许的规则' },
          deny: { type: [String], comment: '禁止的规则' },
        },
        comment: '禁止规则优先，没命中任何规则则不允许访问',
      },
      allow: { type: [String], comment: '允许的权限项' },
      deny: { type: [String], comment: '禁止的权限项' },
      disabled: { type: Boolean, comment: '是否已删除' },
    };
  }
}
