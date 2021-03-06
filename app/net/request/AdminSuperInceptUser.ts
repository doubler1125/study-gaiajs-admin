/**
 * generated by template generator. don't modify it.
 *
 */

import { Context } from 'egg';
import GaiaRequest from 'study-gaiajs/app/lib/request';


/**
 * path: /admin/super/incept_user
 *
 * 变身用户
 */
export default class AdminSuperInceptUserRequest extends GaiaRequest {
  static accessorName = 'AdminSuperInceptUser';
  static path = '/admin/super/incept_user';
  static method = 'POST';

  /**
   *
   * @type string
   * @memberof AdminSuperInceptUser
   */
  token: string;

  /**
   *
   * @type number
   * @memberof AdminSuperInceptUser
   */
  userId: number;

  // tslint:disable-next-line: max-func-body-length
  constructor(params: any, ctx: Context) {
    super(params, ctx);
    const data: {
      [K: string]: any;
    } = {};

    
    if (ctx.request.body.hasOwnProperty('token')) {
      data.token = ctx.request.body.token;
    }
    
    if (ctx.request.body.hasOwnProperty('userId')) {
      data.userId = ctx.request.body.userId;
    }
    

    const rules = {
      token: {
        type: 'string', required: true, },
      userId: {
        type: 'number', required: true, },

    };

    try {
      ctx.validate(rules, data);
    } catch (err) {
      ctx.service.error.throwRequestValidateError(err);
    }

    Object.defineProperties(this, {
      token: { value: data.token },
      userId: { value: data.userId },
    });

    Object.defineProperty(this, 'toJSON', {
      value: () => {
        return data;
      },
    });
  }
}
