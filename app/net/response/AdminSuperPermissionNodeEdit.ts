/**
 * generated by template generator. don't modify it.
 *
 */

import { Context } from 'egg';
import GaiaResponse from 'study-gaiajs/app/lib/response';

import PermissionNode from '../types/PermissionNode';
/**
 *
 */
export default class AdminSuperPermissionNodeEditResponse extends GaiaResponse {
  /**
   *
   * @type PermissionNode
   * @memberof data
   */
  data: PermissionNode;

  constructor(data: any, ctx?: Context) {
    super(data, ctx);

  }

  async dump(): Promise<any> {
    const [data,] = await Promise.all([((this.data) && (await (new PermissionNode(await this.data, this.ctx)).dump())),]) as [PermissionNode,];
    return { data, };
  }
}
