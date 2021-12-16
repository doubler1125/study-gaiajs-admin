import DBModelService from 'study-gaiajs/app/lib/model/DBModelService';
import { deepFindObject } from 'study-gaiajs/app/lib/obj_util';
import BaseModelObject, { KeyType } from 'study-gaiajs/app/object/BaseModelObject';
import { Application, Context } from 'egg';
import bp, { AdminBaseController } from './router/admin';

export type SchemaType = 'string' | 'number' | 'text' | 'boolean' | string[] | number[] | 'json';

export interface Schema<Type> {
  displayName: string;
  type: SchemaType;
  default?: Type; // string | number | boolean | any;
  required?: boolean;
  desc?: string; // 描述
}

export type ModelSchema<T, KT> = { id: Schema<KT> } & Partial<{ [K in keyof T]: Schema<T[K]> }>;

export interface ManagedModelService<KT, T extends BaseModelObject<KT>> {
  getManagedSchema(): ModelSchema<T, KT> | Promise<ModelSchema<T, KT>>;
  loadAll(limit?: number, skip?: number): Promise<T[]>;
}

export class ModelAdminController<KT = KeyType, T extends BaseModelObject<KT> = BaseModelObject<KT>> extends AdminBaseController {
  protected model: DBModelService<KT, T> & ManagedModelService<KT, T>;

  protected modelName: string;
  protected modelDesc?: string;
  protected modelPath: string;

  constructor(model: DBModelService<KT, T> & ManagedModelService<KT, T>, ctx: Context) {
    super(ctx);

    this.model = model;
  }

  async getSchema() {
    if (!this['SCHEMA']) {
      this['SCHEMA'] = await this.model.getManagedSchema();
    }

    return this['SCHEMA'];
  }

  async formatObject(item: T) {
    const schema = await this.getSchema();
    const obj = {};
    for (const name of Object.keys(schema)) {
      obj[name] = await item[name];
    }

    return obj;
  }

  async index() {
    const schema = await this.getSchema();

    const schemaList: any[] = [];
    for (const name of Object.keys(schema)) {
      schemaList.push(Object.assign({ name }, schema[name]));
    }

    return this.ctx.render('admin/model_admin.html', { modelName: this.modelName, modelPath: this.modelPath, modelDesc: this.modelDesc, schema: schemaList });
  }

  async create() {
    const obj = await this.model.create(this.ctx.request.body.values);

    return this.ctx.success({ obj });
  }

  async update() {
    const obj = await this.model.load(this.ctx.request.body.id);
    if (!obj) {
      return this.ctx.fail(404, 'cannot find item');
    }

    await this.model.update(obj, this.ctx.request.body.values);

    return this.ctx.success({ obj });
  }

  async delete() {
    const obj = await this.model.load(this.ctx.request.body.id);
    if (!obj) {
      return this.ctx.fail(404, 'cannot find item');
    }

    await this.model.remove(obj);

    return this.ctx.success();
  }

  async list() {
    const items = await this.model.loadAll(Number(this.ctx.request.query.limit || 10), Number(this.ctx.request.query.skip || 0));

    const list: any[] = [];
    for (const item of items) {
      list.push(await this.formatObject(item));
    }

    return this.ctx.success({ list });
  }

  async doOperator() {
    // this.ctx.request.body.action;
  }
}

export interface ModelAdminOptions {
  serviceModel: string; // 从ctx.service开始的路径
  modelName: string; // 显示名称（菜单、标题）
  modelDesc?: string; // 描述
}

export function ModelAdmin<KT, T extends BaseModelObject<KT>>(options: ModelAdminOptions) {
  return <TModelAdmin extends { new (...args: any[]): ModelAdminController<KT, T> }>(constructor: TModelAdmin) => {
    const modelPath = options.serviceModel.replace(/\./g, '/');

    const ModelClass = class extends constructor {
      constructor(...params: any[]) {
        const [ctx] = params;

        const model = deepFindObject(ctx, 'service.' + options.serviceModel).obj;
        ctx.assert(model, `找不到ctx.${options.serviceModel}`);
        super(model, ctx);

        this.modelPath = modelPath;
        this.modelName = options.modelName;
        if (options.modelDesc) {
          this.modelDesc = options.modelDesc;
        }
      }

      async _index() {
        return await this.index();
      }

      async _create() {
        return await this.create();
      }

      async _update() {
        return await this.update();
      }

      async _delete() {
        return await this.delete();
      }

      async _list() {
        return await this.list();
      }

      async _operator() {
        return await this.doOperator();
      }
    };

    const Methods = {
      index: 'GET',
    };

    for (const name of ['index', 'create', 'update', 'delete', 'list', 'operator']) {
      const descriptor = Object.getOwnPropertyDescriptor(ModelClass.prototype, '_' + name);
      if (descriptor) {
        bp.action({ method: Methods[name] || 'POST', path: `/admin/model/${modelPath}/${name}` })(ModelClass.prototype, '_' + name, descriptor!);
      }
    }

    return ModelClass as TModelAdmin;
  };
}

export default function registerAdminModel<KT, T extends BaseModelObject<KT>>(app: Application, options: ModelAdminOptions) {
  ModelAdmin<KT, T>(options)(ModelAdminController);
}
