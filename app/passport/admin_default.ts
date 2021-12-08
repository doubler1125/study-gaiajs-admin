import { Application } from 'egg';
import { passportStrategy } from '../service/admin/auth/default';

module.exports = (app: Application) => {
  const { passportToken = {} } = app.config;
  passportToken.passReqToCallback = true;
  return passportStrategy();
};
