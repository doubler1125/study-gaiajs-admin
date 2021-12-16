import bp from 'study-gaiajs/app/lib/router/admin_blueprint';
import { AdminBaseController } from '../../lib/router/admin';

export default class AdminCircuitController extends AdminBaseController {
  @bp.get('/admin/system/circuit/')
  async circuit() {
    await this.ctx.render('admin/circuit');
  }

  @bp.get('/admin/system/circuit/status')
  async circuitStatus() {
    const stats = this.app.circuitBreaker.stats;

    this.ctx.body = { stats };
  }
}
