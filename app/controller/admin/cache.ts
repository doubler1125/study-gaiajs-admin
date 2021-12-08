import bp from '@gaiajs/gaiajs/app/lib/router/admin_blueprint';
import { deepFindObject } from '@gaiajs/gaiajs/app/lib/obj_util';
import { AdminBaseController } from '../../lib/router/admin';
import BaseModelObject from '@gaiajs/gaiajs/app/object/BaseModelObject';

export default class AdminController extends AdminBaseController {
  @bp.post('/admin/system/flush_cache')
  async flushCache() {
    await this.ctx.service.cache.couchbase.flush({ repository: this.ctx.body.repo });

    return this.ctx.success({});
  }

  @bp.post('/admin/system/clear_cache')
  async clearCache() {
    if (!this.ctx.body.model || !this.ctx.body.id) {
      return this.ctx.fail(40600, 'missing model or id');
    }

    const { obj: model } = deepFindObject(this.ctx.service, this.ctx.body.model);
    if (!model) {
      return this.ctx.fail(40400, `cannot find ${this.ctx.body.model} model`);
    }

    if (!await model.removeCache(this.ctx.body.id)) {
      return this.ctx.fail(40401, `cannot remove cache ${this.ctx.body.model} model id: ${this.ctx.body.id}`);
    }

    let obj: BaseModelObject = await model.load(this.ctx.body.id);
    if (!obj && /[0-9]+/.test(this.ctx.body.id)) {
      obj = await model.load(parseInt(this.ctx.body.id));
    }

    if (!obj) {
      return this.ctx.fail(40402, `cannot load ${this.ctx.body.model} model id: ${this.ctx.body.id}`);
    }

    if (this.ctx.body.property) {
      if (typeof this.ctx.body.property !== 'string') {
        return this.ctx.fail(40601, `invalid property '${this.ctx.body.property}'`);
      }

      await obj.clearCacheableProperty(this.ctx.body.property);
    }

    return this.ctx.success({ obj, ...(this.ctx.body.property ? { [this.ctx.body.property]: await obj[this.ctx.body.property] } : {}) });
  }
}
