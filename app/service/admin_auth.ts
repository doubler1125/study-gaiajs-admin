import { ValidateOptions } from '@gaiajs/gaiajs/app/lib/request';
import BaseService from '@gaiajs/gaiajs/app/service/admin_auth';

export default class AdminAuthService extends BaseService {
  async startAuth(bpOptions?: ValidateOptions) {
  
    const adminAuth = bpOptions?.adminAuth || this.ctx.app.config.adminAuth || [];
    for (const auth of adminAuth) {
      if (this.ctx.service.admin.auth[ auth ]) {
        if (await this.ctx.service.admin.auth[ auth ].startAuth(bpOptions)) {
          return true;
        }
      }
    }

    return false;
  }

  async login(bpOptions?: ValidateOptions) {
    const adminAuth = bpOptions?.adminAuth || this.ctx.app.config.adminAuth || [];
    for (const auth of adminAuth) {
      if (this.ctx.service.admin.auth[ auth ]) {
        const user = await this.ctx.service.admin.auth[ auth ].login();

        if (user) {
          return user;
        }
      }
    }

    await this.startAuth();
  }

  async logout(bpOptions?: ValidateOptions) {
    const adminAuth = bpOptions?.adminAuth || this.ctx.app.config.adminAuth || [];
    for (const auth of adminAuth) {
      if (this.ctx.service.admin.auth[ auth ]) {
        await this.ctx.service.admin.auth[ auth ].logout();
      }
    }
  }
}
