import BaseService from 'study-gaiajs/app/lib/BaseService';
import AdminUser from 'study-gaiajs/app/object/admin/user';

export default abstract class BaseAuthService extends BaseService {
  /**
   * 发起登录
   */
  abstract startAuth(): Promise<boolean>;

  /**
   * 验证登录
   */
  abstract login(): Promise<AdminUser | null>;

  async logout() {}
}
