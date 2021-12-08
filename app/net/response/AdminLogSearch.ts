/**
 * generated by template generator. don't modify it.
 *
 */

import { Context } from 'egg';
import GaiaResponse from '@gaiajs/gaiajs/app/lib/response';

import AdminLog from '../types/AdminLog';
/**
 *
 */
export default class AdminLogSearchResponse extends GaiaResponse {
  /**
   *
   * @type number
   * @memberof total
   */
  total: number;

  /**
   *
   * @type AdminLog[]
   * @memberof logs
   */
  logs: AdminLog[];

  constructor(data: any, ctx?: Context) {
    super(data, ctx);

  }

  async dump(): Promise<any> {
    const [total,logs,] = await Promise.all([this.total,(await Promise.all((await this.logs || []).map(async item => (((item) && (await (new AdminLog(await item, this.ctx)).dump())))))),]) as [number,AdminLog[],];
    return { total, logs, };
  }
}