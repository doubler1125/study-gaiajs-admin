/**
 * generated by template generator. don't modify it.
 *
 */

import { Context } from 'egg';
import GaiaRequest from '@gaiajs/gaiajs/app/lib/request';


/**
 * path: /admin/super/permissionNode
 *
 * 查看权限项
 */
export default class AdminSuperPermissionNodeRequest extends GaiaRequest {
  static accessorName = 'AdminSuperPermissionNode';
  static path = '/admin/super/permissionNode';
  static method = 'GET';

  /**
   *
   * @type string
   * @memberof AdminSuperPermissionNode
   */
  id: string;

  // tslint:disable-next-line: max-func-body-length
  constructor(params: any, ctx: Context) {
    super(params, ctx);
    const data: {
      [K: string]: any;
    } = {};

    
    if (ctx.query.hasOwnProperty('id')) {
      data.id = ctx.query.id;
    }
    

    const rules = {
      id: {
        type: 'string', required: true, },

    };

    try {
      ctx.validate(rules, data);
    } catch (err) {
      ctx.service.error.throwRequestValidateError(err);
    }

    Object.defineProperties(this, {
      id: { value: data.id },
    });

    Object.defineProperty(this, 'toJSON', {
      value: () => {
        return data;
      },
    });
  }
}