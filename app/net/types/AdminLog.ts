/**
 * generated by template generator. don't modify it.
 *
 */

import { Context } from 'egg';
import Schema from '@gaiajs/gaiajs/app/lib/schema';

export default class AdminLog extends Schema {
  /**
   *
   * @type string
   * @memberof _id
   */
  _id: string;

  /**
   *
   * @type string
   * @memberof type
   */
  type: string;

  /**
   *
   * @type string
   * @memberof subType
   */
  subType: string;

  /**
   *
   * @type string
   * @memberof opType
   */
  opType: string;

  /**
   *
   * @type string
   * @memberof targetId
   */
  targetId: string;

  /**
   *
   * @type string
   * @memberof desc
   */
  desc: string;

  /**
   *
   * @type object
   * @memberof detail
   */
  detail: object;

  /**
   *
   * @type string
   * @memberof admin_user
   */
  admin_user: string;

  /**
   *
   * @type string
   * @memberof time
   */
  time: string;

  constructor(data: any, ctx?: Context) {
    super(data, ctx);
    
    Object.defineProperty(this, '_id', {
      enumerable: true,
      value: data._id,
    });
    Object.defineProperty(this, 'type', {
      enumerable: true,
      value: data.type,
    });
    Object.defineProperty(this, 'subType', {
      enumerable: true,
      value: data.subType,
    });
    Object.defineProperty(this, 'opType', {
      enumerable: true,
      value: data.opType,
    });
    Object.defineProperty(this, 'targetId', {
      enumerable: true,
      value: data.targetId,
    });
    Object.defineProperty(this, 'desc', {
      enumerable: true,
      value: data.desc,
    });
    Object.defineProperty(this, 'detail', {
      enumerable: true,
      value: data.detail,
    });
    Object.defineProperty(this, 'admin_user', {
      enumerable: true,
      value: data.admin_user,
    });
    Object.defineProperty(this, 'time', {
      enumerable: true,
      value: data.time,
    });
  }

  async dump() {
    const [_id,type,subType,opType,targetId,desc,detail,admin_user,time,] = await Promise.all([this._id,this.type,this.subType,this.opType,this.targetId,this.desc,(this.detail && (await (async detail => {return detail;})(this.detail))),this.admin_user,this.time,]) as [string,string,string,string,string,string,object,string,string,];
    return { _id, type, subType, opType, targetId, desc, detail, admin_user, time, };
  }
}
