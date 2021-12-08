/**
 * generated by template generator. don't modify it.
 *
 */

import { Context } from 'egg';
import GaiaRequest from '@gaiajs/gaiajs/app/lib/request';


/**
 * path: /admin/super/roles
 *
 * 查看角色列表
 */
export default class AdminSuperRoleListRequest extends GaiaRequest {
  static accessorName = 'AdminSuperRoleList';
  static path = '/admin/super/roles';
  static method = 'GET';

  /**
   *
   * @type number
   * @memberof AdminSuperRoleList
   */
  skip?: number;

  /**
   *
   * @type number
   * @memberof AdminSuperRoleList
   */
  limit?: number;

  // tslint:disable-next-line: max-func-body-length
  constructor(params: any, ctx: Context) {
    super(params, ctx);
    const data: {
      [K: string]: any;
    } = {};

    
    if (ctx.query.hasOwnProperty('skip')) {
      data.skip = ctx.query.skip;
    }
    
    if (ctx.query.hasOwnProperty('limit')) {
      data.limit = ctx.query.limit;
    }
    

    const rules = {
      skip: {
        type: 'number', required: false, },
      limit: {
        type: 'number', required: false, },

    };

    try {
      ctx.validate(rules, data);
    } catch (err) {
      ctx.service.error.throwRequestValidateError(err);
    }

    Object.defineProperties(this, {
      skip: { value: data.skip },
      limit: { value: data.limit },
    });

    Object.defineProperty(this, 'toJSON', {
      value: () => {
        return data;
      },
    });
  }
}