import '@gaiajs/gaiajs';
import { gaia } from '@gaiajs/gaiajs';
import { IGaiaObjectAdmin, IGaiaServiceAdmin } from 'study-gaiajs-admin/typings/app';
import 'egg';
import './typings/app/controller/index';
import './typings/app/extend/application';
import './typings/app/index';
import './typings/app/object/index';
import './typings/app/service/index';
import './typings/config/index';
import './typings/config/plugin';

declare module gaiaAdmin {
  interface IObjectAdmin extends IGaiaObjectAdmin {}
  interface IObject extends gaia.IObject {
    admin: IObjectAdmin;
  }

  interface IServiceAdmin extends IGaiaServiceAdmin {}
  interface IService extends gaia.IService {
    admin: IServiceAdmin;
  }
}
