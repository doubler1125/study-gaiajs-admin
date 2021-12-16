import ContextExtend from 'study-gaiajs/app/extend/context';
import GaiaRequest from 'study-gaiajs/app/lib/request';
import bpAdmin, { AdminBaseController as BaseAdminBaseController } from 'study-gaiajs/app/lib/router/admin';
import AdminUser from '../../object/admin/user';

export class AdminBaseController extends BaseAdminBaseController {
  async beforeRequest(routeResolver: any, req: GaiaRequest) {
    if (!(await super.beforeRequest(routeResolver, req))) {
      return false;
    }

    this.ctx.success = ContextExtend.success.bind(this.ctx) as any;
    this.ctx.fail = ContextExtend.fail.bind(this.ctx) as any;

    if (this.ctx.accepts('json', 'html') !== 'json') {
      await this.ctx.service.admin.menu.prepare();
    }

    if (this.ctx.user && this.ctx.locals && this.ctx.locals.adminModule) {
      this.ctx.locals.adminModule = await this.ctx.service.cache.poolChain.load(
        this.ctx.user.id,
        async () => {
          const adminModules: any[] = this.ctx.locals.adminModule;
          for (let i = adminModules.length - 1; i >= 0; i--) {
            const module = adminModules[i];
            if (module.list) {
              for (let j = module.list.length - 1; j >= 0; j--) {
                const item = module.list[j];

                if (!(await (this.ctx.user as AdminUser).hasPermission(new GaiaRequest({}, { URL: { pathname: item.url }, method: 'GET' } as any)))) {
                  module.list.splice(j, 1);
                }
              }

              if (module.list.length === 0) {
                this.ctx.locals.adminModule.splice(i, 1);
              }
            }
          }

          return adminModules;
        },
        { prefix: 'admin_menu:', skipCache: this.app.deployment.debugging(), expires: 300 },
      );
    }

    return true;
  }
}

export default bpAdmin;
