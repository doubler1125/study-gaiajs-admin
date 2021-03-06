/**
 * generated by template generator. don't modify it.
 *
 */

import { Context } from 'egg';
import Schema from 'study-gaiajs/app/lib/schema';

export default class AdminUser extends Schema {
  /**
   *
   * @type string
   * @memberof username
   */
  username: string;

  /**
   *
   * @type string
   * @memberof nickname
   */
  nickname: string;

  /**
   *
   * @type Array<{ id: string; name: string }>
   * @memberof roles
   */
  roles: Array<{ id: string; name: string }>;

  constructor(data: any, ctx?: Context) {
    super(data, ctx);
    
    Object.defineProperty(this, 'username', {
      enumerable: true,
      value: data.username,
    });
    Object.defineProperty(this, 'nickname', {
      enumerable: true,
      value: data.nickname,
    });
    Object.defineProperty(this, 'roles', {
      enumerable: true,
      value: data.roles,
    });
  }

  async dump() {
    const [username,nickname,roles,] = await Promise.all([this.username,this.nickname,(await Promise.all((await this.roles || []).map(async item => ((item && (await (async roles => {const [id,name,] = await Promise.all([roles.id,roles.name,]) as [string,string,];return { id, name, };})(item))))))),]) as [string,string,Array<{ id: string; name: string }>,];
    return { username, nickname, roles, };
  }
}
