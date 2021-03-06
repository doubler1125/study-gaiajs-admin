/**
 * generated by template generator. don't modify it.
 *
 */

import { Context } from 'egg';
import GaiaRequest from 'study-gaiajs/app/lib/request';


/**
 * path: /admin/super/admin_user/role
 *
 * 管理员添加角色
 */
export default class AdminSuperUserRoleAddRequest extends GaiaRequest {
  static accessorName = 'AdminSuperUserRoleAdd';
  static path = '/admin/super/admin_user/role';
  static method = 'POST';

  /**
   *
   * @type string
   * @memberof AdminSuperUserRoleAdd
   */
  username: string;

  /**
   *
   * @type string
   * @memberof AdminSuperUserRoleAdd
   */
  role: string;

  // tslint:disable-next-line: max-func-body-length
  constructor(params: any, ctx: Context) {
    super(params, ctx);
    const data: {
      [K: string]: any;
    } = {};

    
    if (ctx.request.body.hasOwnProperty('username')) {
      data.username = ctx.request.body.username;
    }
    
    if (ctx.request.body.hasOwnProperty('role')) {
      data.role = ctx.request.body.role;
    }
    

    const rules = {
      username: {
        type: 'string', required: true, },
      role: {
        type: 'string', required: true, },

    };

    try {
      ctx.validate(rules, data);
    } catch (err) {
      ctx.service.error.throwRequestValidateError(err);
    }

    Object.defineProperties(this, {
      username: { value: data.username },
      role: { value: data.role },
    });

    Object.defineProperty(this, 'toJSON', {
      value: () => {
        return data;
      },
    });
  }
}
