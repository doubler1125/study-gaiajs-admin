/**
 * generated by template generator. don't modify it.
 *
 */

import { Context } from 'egg';
import GaiaResponse from 'study-gaiajs/app/lib/response';

import AdminRole from '../types/AdminRole';
/**
 *
 */
export default class AdminSuperRoleListResponse extends GaiaResponse {
  /**
   *
   * @type { count: number; roles: AdminRole[] }
   * @memberof data
   */
  data: { count: number; roles: AdminRole[] };

  constructor(data: any, ctx?: Context) {
    super(data, ctx);

  }

  async dump(): Promise<any> {
    const [data,] = await Promise.all([(this.data && (await (async data => {const [count,roles,] = await Promise.all([data.count,(await Promise.all((await data.roles || []).map(async item => (((item) && (await (new AdminRole(await item, this.ctx)).dump())))))),]) as [number,AdminRole[],];return { count, roles, };})(this.data))),]) as [{ count: number; roles: AdminRole[] },];
    return { data, };
  }
}
