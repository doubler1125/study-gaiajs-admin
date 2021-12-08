import bp from '@gaiajs/gaiajs/app/lib/router/admin_blueprint';
import { AdminBaseController } from '../../lib/router/admin';
import AdminSuperInceptUserRequest from '../../net/request/AdminSuperInceptUser';
import AdminSuperInceptUserResponse from '../../net/response/AdminSuperInceptUser';
import AdminSuperInceptUserCancelRequest from '../../net/request/AdminSuperInceptUserCancel';
import AdminSuperInceptUserCancelResponse from '../../net/response/AdminSuperInceptUserCancel';

export default class AdminSuperController extends AdminBaseController {
  @bp.action()
  public async incept(req: AdminSuperInceptUserRequest) {
    const info = await this.ctx.service.auth.inceptToken(req.userId, req.token);

    return new AdminSuperInceptUserResponse(info);
  }

  @bp.action()
  public async cancelIncept(req: AdminSuperInceptUserCancelRequest) {
    const info = await this.ctx.service.auth.cancelIncept(req.token);

    return new AdminSuperInceptUserCancelResponse(info);
  }

  @bp.get('/admin/super/admin_user.html')
  async adminUserPage() {
    await this.ctx.render('admin/admin_user');
  }

  @bp.get('/admin/super/incept.html')
  async inceptPage() {
    await this.ctx.render('admin/incept');
  }
}
