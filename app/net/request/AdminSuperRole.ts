/**
 * generated by template generator. don't modify it.
 *
 */

import { Context } from 'egg';
import GaiaRequest from 'study-gaiajs/app/lib/request';


/**
 * path: /admin/super/role
 *
 * 查看角色
 */
export default class AdminSuperRoleRequest extends GaiaRequest {
  static accessorName = 'AdminSuperRole';
  static path = '/admin/super/role';
  static method = 'GET';

  /**
   *
   * @type string
   * @memberof AdminSuperRole
   */
  role: string;

  // tslint:disable-next-line: max-func-body-length
  constructor(params: any, ctx: Context) {
    super(params, ctx);
    const data: {
      [K: string]: any;
    } = {};

    
    if (ctx.query.hasOwnProperty('role')) {
      data.role = ctx.query.role;
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
