import { Context } from 'egg';
import { ObjectModelOptions } from '@gaiajs/gaiajs/app/lib/model/ObjectModelService';
import AdminUser from '../../object/admin/user';
import BaseAdminUserModelService from '@gaiajs/gaiajs/app/service/admin/user';
import * as crypto from 'crypto';

export default class AdminUserModelService<T extends AdminUser = AdminUser> extends BaseAdminUserModelService<T> {
  private key = 'a132456789abcdef';
  private iv = 'eedcba9876543210';

  constructor(ctx: Context, daoName = 'AdminUser', options: ObjectModelOptions<T> = {}) {
    super(ctx, daoName, Object.assign({ objectModelClass: AdminUser, disableCache: false, collection: 'admin_user' }, options));

  }

  get schema() {
    return {
      _id: { type: String, comment: '用户名' },
      password: { type: String, comment: '密码' },
      nickname: { type: String, comment: '姓名' },
      type: { type: String, comment: '类型' },
      roles: { type: [String], comment: '角色列表' },
      disabled: { type: Boolean, comment: '是否已删除' },
    };
  }

  async createWithPassword(prop: { username: string, password: string, nickname?: string, type?: string, roles: any }) {
    const ps = await this.passwordEncrypt(prop.password);
    return await this.ctx.service.admin.user.create({ _id: prop.username, password: ps, nickname: prop.nickname, type: prop.type, roles: prop.roles });
  }

  async passwordEncrypt(pd: string) {
    const cipher = crypto.createCipheriv('aes-128-cbc', this.key, this.iv);
    return cipher.update(pd, 'utf8', 'hex') + cipher.final('hex');
  }

  async passwordDecode(pd: string) {
    const decipher = crypto.createDecipheriv('aes-128-cbc', this.key, this.iv);
    return decipher.update(pd, 'hex', 'utf8') + decipher.final('utf8');
  }

  async verifyPassword(username: string, password: string) {
    const userAdmin = await this.load(username);
    if (!userAdmin) {
      return null;
    }
    const ps = await this.passwordEncrypt(password);
    if (ps === userAdmin.password) {
      return userAdmin;
    }
    return null;
  }
}
