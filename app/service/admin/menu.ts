import { Context } from 'egg';
import BaseService from '@gaiajs/gaiajs/app/lib/BaseService';
import { capitalize } from '@gaiajs/gaiajs/app/lib/string';

type MenuItem = { name: string; url: string };
type AdminModule = { name: string; list: MenuItem[] };

class Locals {
  private _data: any;
  private _modules: AdminModule[];

  constructor() {
    this._data = {};
    this._modules = [];
  }

  get data() {
    return this._data;
  }

  get adminModule() {
    return this._modules;
  }

  addMenus(menus: AdminModule[]) {
    menus.forEach(item => {
      this._modules.push(item);
    });
  }
}

export class MenuService extends BaseService {
  locals: Locals;

  constructor(ctx: Context) {
    super(ctx);

    this.locals = new Locals();
    ctx.locals.data = this.locals.data;
    ctx.locals.adminModule = this.locals.adminModule;
  }

  async prepare() {
    if (!this.ctx.locals.data.env) {
      this.ctx.locals.data.env = `${this.ctx.app.deployment.name}(${this.ctx.app.deployment.stage})`;
    }

    if (!this.ctx.locals.data.admin_title) {
      this.ctx.locals.data.admin_title = `${capitalize(this.ctx.app.name)} Admin`;
    }

    this.locals.addMenus([
      {
        name: '超级管理',
        list: [
          {
            name: '系统用户管理',
            url: '/admin/super/admin_user.html',
          },
          {
            name: '角色权限管理',
            url: '/admin/super/role.html',
          },
          {
            name: '权限项管理',
            url: '/admin/super/permission_node.html',
          },
        ],
      },
      {
        name: '系统管理',
        list: [
          {
            name: '任务管理',
            url: '/admin/system/task/index',
          },
          {
            name: '日志查询',
            url: '/admin/super/log/index',
          },
        ],
      },
    ]);
  }
}

export default MenuService;
