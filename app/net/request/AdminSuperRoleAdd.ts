/**
 * generated by template generator. don't modify it.
 *
 */

import { Context } from 'egg';
import GaiaRequest from 'study-gaiajs/app/lib/request';


/**
 * path: /admin/super/role
 *
 * 新建角色
 */
export default class AdminSuperRoleAddRequest extends GaiaRequest {
  static accessorName = 'AdminSuperRoleAdd';
  static path = '/admin/super/role';
  static method = 'POST';

  /**
   *
   * @type any
   * @memberof AdminSuperRoleAdd
   */
  role: any;

  // tslint:disable-next-line: max-func-body-length
  constructor(params: any, ctx: Context) {
    super(params, ctx);
    const data: {
      [K: string]: any;
    } = {};

    
    if (ctx.request.body.hasOwnProperty('role')) {
      data.role = ctx.request.body.role;
    }
    

    const rules = {
      role: {
        type: 'object', required: true, },

    };

    try {
      ctx.validate(rules, data);
    } catch (err) {
      ctx.service.error.throwRequestValidateError(err);
    }

    Object.defineProperties(this, {
      role: { value: data.role },
    });

    Object.defineProperty(this, 'toJSON', {
      value: () => {
        return data;
      },
    });
  }
}
