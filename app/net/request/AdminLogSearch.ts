/**
 * generated by template generator. don't modify it.
 *
 */

import { Context } from 'egg';
import GaiaRequest from 'study-gaiajs/app/lib/request';


/**
 * path: /admin/super/log/search
 *
 * adminLog查询
 */
export default class AdminLogSearchRequest extends GaiaRequest {
  static accessorName = 'AdminLogSearch';
  static path = '/admin/super/log/search';
  static method = 'GET';

  /**
   *
   * @type string
   * @memberof AdminLogSearch
   */
  type?: string;

  /**
   *
   * @type string
   * @memberof AdminLogSearch
   */
  subType?: string;

  /**
   *
   * @type string
   * @memberof AdminLogSearch
   */
  opType?: string;

  /**
   *
   * @type string
   * @memberof AdminLogSearch
   */
  targetId?: string;

  /**
   *
   * @type string
   * @memberof AdminLogSearch
   */
  admin_user?: string;

  /**
   *
   * @type number
   * @memberof AdminLogSearch
   */
  page: number;

  /**
   *
   * @type number
   * @memberof AdminLogSearch
   */
  limit?: number;

  // tslint:disable-next-line: max-func-body-length
  constructor(params: any, ctx: Context) {
    super(params, ctx);
    const data: {
      [K: string]: any;
    } = {};

    
    if (ctx.query.hasOwnProperty('type')) {
      data.type = ctx.query.type;
    }
    
    if (ctx.query.hasOwnProperty('subType')) {
      data.subType = ctx.query.subType;
    }
    
    if (ctx.query.hasOwnProperty('opType')) {
      data.opType = ctx.query.opType;
    }
    
    if (ctx.query.hasOwnProperty('targetId')) {
      data.targetId = ctx.query.targetId;
    }
    
    if (ctx.query.hasOwnProperty('admin_user')) {
      data.admin_user = ctx.query.admin_user;
    }
    
    if (ctx.query.hasOwnProperty('page')) {
      data.page = ctx.query.page;
    }
    
    if (ctx.query.hasOwnProperty('limit')) {
      data.limit = ctx.query.limit;
    }
    

    const rules = {
      type: {
        type: 'string', required: false, },
      subType: {
        type: 'string', required: false, },
      opType: {
        type: 'string', required: false, },
      targetId: {
        type: 'string', required: false, },
      admin_user: {
        type: 'string', required: false, },
      page: {
        type: 'number', required: true, },
      limit: {
        type: 'number', required: false, },

    };

    try {
      ctx.validate(rules, data);
    } catch (err) {
      ctx.service.error.throwRequestValidateError(err);
    }

    Object.defineProperties(this, {
      type: { value: data.type },
      subType: { value: data.subType },
      opType: { value: data.opType },
      targetId: { value: data.targetId },
      admin_user: { value: data.admin_user },
      page: { value: data.page },
      limit: { value: data.limit },
    });

    Object.defineProperty(this, 'toJSON', {
      value: () => {
        return data;
      },
    });
  }
}
