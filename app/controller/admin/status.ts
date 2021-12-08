import bp from '@gaiajs/gaiajs/app/lib/router/admin_blueprint';
import { AdminBaseController } from '../../lib/router/admin';

export default class AdminController extends AdminBaseController {
  @bp.get('/admin/system/status')
  async status() {
    return this.ctx.success({
      uptime: Date.now() - Math.floor(process.uptime() * 1000),
      mem: process.memoryUsage(),
      res: process.resourceUsage(),
      env: process.env,
    });
  }
}
