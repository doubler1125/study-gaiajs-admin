import bp from 'study-gaiajs/app/lib/router/admin_blueprint';
import { AdminBaseController } from '../../lib/router/admin';

export default class AdminController extends AdminBaseController {

  @bp.get('/admin', { auth_required: true, name: 'AdminIndex' })
  async index() {

    const hello = 'Hello World'

    await this.ctx.render('admin/index', {
      hello,
    });
  }

  @bp.get('/admin/login', { auth_required: false })
  async getLogin() {
    await this.ctx.render('admin/login');
  }

  @bp.post('/admin/login', { auth_required: false })
  async login() {
    await this.ctx.service.adminAuth.login();
    return this.ctx.success();
  }

}