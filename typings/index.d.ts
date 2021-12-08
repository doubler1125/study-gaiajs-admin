import '@gaiajs/gaiajs';
import { IAppServiceAdmin, IGaiaObjectAdmin } from './app';
import { gaia } from '@gaiajs/gaiajs';
import 'egg';

declare module 'egg' {
  interface IServiceModel extends IGaiaAdminServiceModel, IGaiaServiceModel {
    admin: IGaiaAdminServiceModelAdmin;
  }

  interface IServiceAdmin extends IAppServiceAdmin, IGaiaServiceAdmin {}

  interface IService extends IGaiaAdminService, IGaiaService {
    cache: IGaiaServiceCache;
    rpc: IGaiaServiceRpc;
    model: IServiceModel;

    admin: IServiceAdmin;
  }

  interface IObjectAdmin extends IGaiaAdminObjectAdmin, IGaiaObjectAdmin {}

  interface IObject extends IGaiaObject {
    Admin: IObjectAdmin;
  }

  interface Context extends gaia.Context, Egg.Context {
    service: IService;
    object: IObject;
    model: IModel;
  }

  interface Application extends IGaiaApplication {
    service: IService;
    model: IModel;
  }
}
