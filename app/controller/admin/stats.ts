import bp from '@gaiajs/gaiajs/app/lib/router/admin_blueprint';
import { AdminBaseController } from '../../lib/router/admin';

export default class AdminController extends AdminBaseController {
  @bp.get('/admin/system/circuit/stats')
  async circuit() {
    const brakes = {
      open: Object.keys(this.app.circuitBreaker.stats).filter(name => this.app.circuitBreaker.stats[name].open),
      items: this.app.circuitBreaker.stats,
    };

    this.ctx.body = JSON.stringify({ brakes }, null, 2);
  }
}
