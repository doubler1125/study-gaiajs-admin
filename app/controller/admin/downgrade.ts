import bpAdmin, { AdminBaseController } from "../../lib/router/admin";

@bpAdmin.controller({ prefix: '/admin/system' })
export default class SystemController extends AdminBaseController {
  @bpAdmin.get('/downgrade')
  async list() {
    const modules = {};
    for (const module of this.app.downGrader.modules.values()) {
      modules[module] = this.app.downGrader.isDowngraded(module);
    }

    return this.ctx.success({ modules });
  }

  @bpAdmin.post('/downgrade')
  async downgrade() {
    const module = this.ctx.request.body.module;

    if (!module) {
      return this.ctx.fail(406, '参数错误');
    }

    if (!this.app.downGrader.modules.has(module)) {
      return this.ctx.fail(406, '模块不存在');
    }

    this.app.downGrader.downGrade(module, typeof this.ctx.request.body.on === 'boolean' ? this.ctx.request.body.on : true);

    return this.ctx.success({ on: this.app.downGrader.isDowngraded(module) });
  }
}
