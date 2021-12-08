import bp from '@gaiajs/gaiajs/app/lib/router/admin_blueprint';
import { AdminBaseController } from '../../lib/router/admin';
import AdminLogSearchRequest from '../../net/request/AdminLogSearch';
import AdminLogSearchResponse from '../../net/response/AdminLogSearch';

export default class AdminController extends AdminBaseController {

  @bp.get('/admin/super/log/index')
  async task() {
    await this.ctx.render('admin/log');
  }

  @bp.action()
  public async search(req: AdminLogSearchRequest) {
    const { type, subType, opType, targetId, admin_user, page, limit } = req;
    const conditions = { type, subType, opType, targetId, admin_user };
    const res = await this.ctx.service.admin.logger.searchWithPage(conditions, page, limit);

    return this.ctx.success({ total: res.total, logs: res.logs }, AdminLogSearchResponse);
  }
}
