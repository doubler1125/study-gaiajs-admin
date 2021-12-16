/**
 * generated by template generator. don't modify it.
 *
 */

import { Context } from 'egg';
import GaiaRequest from 'study-gaiajs/app/lib/request';


/**
 * path: /admin/super/role
 *
 * 删除角色
 */
export default class AdminSuperRoleDelRequest extends GaiaRequest {
  static accessorName = 'AdminSuperRoleDel';
  static path = '/admin/super/role';
  static method = 'DELETE';

  /**
   *
   * @type string
   * @memberof AdminSuperRoleDel
   */
  role: string;

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
        type: 'string', required: true, },

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
