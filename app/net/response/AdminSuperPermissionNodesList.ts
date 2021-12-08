/**
 * generated by template generator. don't modify it.
 *
 */

import { Context } from 'egg';
import GaiaResponse from '@gaiajs/gaiajs/app/lib/response';

import PermissionNode from '../types/PermissionNode';
/**
 *
 */
export default class AdminSuperPermissionNodesListResponse extends GaiaResponse {
  /**
   *
   * @type { count: number; nodes: PermissionNode[] }
   * @memberof data
   */
  data: { count: number; nodes: PermissionNode[] };

  constructor(data: any, ctx?: Context) {
    super(data, ctx);

  }

  async dump(): Promise<any> {
    const [data,] = await Promise.all([(this.data && (await (async data => {const [count,nodes,] = await Promise.all([data.count,(await Promise.all((await data.nodes || []).map(async item => (((item) && (await (new PermissionNode(await item, this.ctx)).dump())))))),]) as [number,PermissionNode[],];return { count, nodes, };})(this.data))),]) as [{ count: number; nodes: PermissionNode[] },];
    return { data, };
  }
}
