import { Context } from 'egg';
import Log from '../../object/admin/log';
import { ObjectId } from 'mongodb';
import MongoModelService from 'study-gaiajs/app/lib/model/MongoModelService';
import { ObjectProperties } from 'study-gaiajs/app/object/BasePropertiesObject';

export default class LoggerService extends MongoModelService<Log, ObjectId> {
  constructor(ctx: Context) {
    super(ctx, 'AdminLog', {
      objectModelClass: Log,
      disableCache: true,
      disableRuntimeCache: true,
      collection: 'admin_log'
    });
  }

  get schema() {
    const Schema = this.app.mongoose.Schema;
    return {
      _id: { type: Schema.Types.ObjectId },
      type: { type: String },
      subType: { type: String },
      opType: { type: String },
      targetId: { type: String },
      desc: { type: String },
      detail: { type: Schema.Types.Mixed  },
      admin_user: { type: String },
      time: { type: Date },
    };
  }

  async log(obj: ObjectProperties<Log>) {
    try {
      return await this.create(this.createObject(Object.assign({
        _id: new ObjectId(),
        admin_user: this.ctx.user && this.ctx.user.id || '',
        time: Date.now(),
      }, obj, { detail: Object.assign({ query: this.ctx.query, post: this.ctx.request.body }, obj.detail || {}) })), { skipSetCache: true });
    } catch (err) {
      this.ctx.logError({ msg: 'save admin log failed', err, detail: { obj } });
      return false;
    }
  }

  async getLog(criteria: { type: string; subType?: string; targetId: string; }, limit?: number, skip?: number) {
    return await this.loadMultiWith(criteria, { fetchOptions: { skip, limit, sort: { createdAt: -1 } }, skipCache: true });
  }

  async searchWithPage(properties: { type?: string; subType?: string; opType?: string; targetId?: string; adminUser?: string }, page: number, limit = 10) {
    const clause = {};
    for (const prop in properties) {
      if (properties[prop]) {
        clause[prop] = properties[prop];
      }
    }

    const total = await this.countWith(clause, { skipCache: true });
    const skip = (page - 1) * limit;

    const logs = await this.loadMultiWith(clause, { fetchOptions: { sort: { time: -1 }, skip, limit }, skipCache: true });
    return { logs, total };
  }
}
