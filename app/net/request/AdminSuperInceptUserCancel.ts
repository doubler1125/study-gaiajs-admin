/**
 * generated by template generator. don't modify it.
 *
 */

import { Context } from 'egg';
import GaiaRequest from '@gaiajs/gaiajs/app/lib/request';


/**
 * path: /admin/super/incept_user
 *
 * 取消变身用户
 */
export default class AdminSuperInceptUserCancelRequest extends GaiaRequest {
  static accessorName = 'AdminSuperInceptUserCancel';
  static path = '/admin/super/incept_user';
  static method = 'DELETE';

  /**
   *
   * @type string
   * @memberof AdminSuperInceptUserCancel
   */
  token: string;

  // tslint:disable-next-line: max-func-body-length
  constructor(params: any, ctx: Context) {
    super(params, ctx);
    const data: {
      [K: string]: any;
    } = {};

    
    if (ctx.request.body.hasOwnProperty('token')) {
      data.token = ctx.request.body.token;
    }
    

    const rules = {
      token: {
        type: 'string', required: true, },

    };

    try {
      ctx.validate(rules, data);
    } catch (err) {
      ctx.service.error.throwRequestValidateError(err);
    }

    Object.defineProperties(this, {
      token: { value: data.token },
    });

    Object.defineProperty(this, 'toJSON', {
      value: () => {
        return data;
      },
    });
  }
}
