import BaseAuthService from "../base_auth";
import { AuthenticateOptions, Strategy } from 'passport';
import { Context } from 'egg';
import { RouterOptions } from '@gaiajs/gaiajs/app/lib/router/blueprint';
import * as urllib from 'url';

export function passportStrategy() {
  return new class extends Strategy {
    async authenticate(req: any, options?: AuthenticateOptions & { bpOptions: RouterOptions }) {
      const ctx = req.ctx as Context;

      try {
        const user = await ctx.service.admin.auth.default.authUser();

        if (user) {
          this.success(user);
          return;
        }

        this.fail();
      } catch (e) {
        this.error(e);
      }
    }
  }();
}

export default class DefaultService extends BaseAuthService {

  async startAuth() {
    this.ctx.redirect('/admin/login');
    return true;
  }

  async authUser(token?: string) {
    token || (token = this.ctx.getCookie('admin_default_token'));

    if (!token) {
      return null;
    }

    const username = await this.ctx.service.auth.validateToken(token);
    if (!username) {
      return null;
    }

    const adminUser = await this.ctx.service.admin.user.loadWithUserName(username);
    if (!adminUser || adminUser.disabled) {
      return null;
    }

    return adminUser;
  }

  async login() {
    const { ctx } = this;
    
    const username = ctx.request.body.username || '';
    const password = ctx.request.body.password || '';
    if (!username || !password) {
      return null;
    }

    let adminUser = await this.ctx.service.admin.user.verifyPassword(username, password);
    if (!adminUser) {
      const count = await this.ctx.service.admin.user.countAll();
      if (!count) {
        await this.ctx.service.admin.permissionNode.create({ _id: 'all', name: '所有权限', rules: [ '.*' ] });
        await this.ctx.service.admin.permissionNode.create({ _id: 'super', name: '超级权限', rules: [ '^(GET|POST):/admin/super/.*' ] });
        await this.ctx.service.admin.permissionNode.create({ _id: 'system', name: '系统管理权限', rules: [ '^(GET|POST):/admin/system/.*' ] });
        await this.ctx.service.admin.role.create({ _id: 'super', name: '超级管理员', allow: [ 'all', 'super' ] });
        await this.ctx.service.admin.role.create({ _id: 'admin', name: '管理员', allow: [ 'all' ], deny: [ 'super', 'system' ] });
        adminUser = await this.ctx.service.admin.user.createWithPassword({ username, password, roles: [ 'super' ] as any /* rules: { allow: [ '.*' ] }*/ });
      } else {
        throw this.ctx.service.error.createBusinessError({ ...this.ctx.app.errorCodes.PERMISSION_DENIED, extra: { username } });
      }
    }

    const token = await ctx.service.auth.issueToken(username);
    ctx.setCookie('admin_default_token', token, { domain: this.ctx.hostname, path: '/admin' });

    if (ctx.query.success && ctx.query.success.length > 0) {
      const url = urllib.parse(ctx.query.success, true);
      if (url) {
        ctx.redirect(urllib.format(url));
      } else {
        ctx.redirect(ctx.query.success);
      }
    }
    
    return adminUser;
  }

  async logout() {
    this.ctx.setCookie('admin_default_token', undefined);
  }
}