import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

import * as path from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
      path.join(__dirname, '../app/view'),
    ].join(','),
    cache: true,
    mapping: {
      '.html': 'nunjucks',
    },
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.html',
  };

  config.nunjucks = {
    tags: {
      variableStart: '{$',
      variableEnd: '$}',
    }
  }

  config.static = {
    dir: [
      path.resolve(appInfo.baseDir, 'app/public'),
      path.resolve(__dirname, '../app/public'),
    ],
  };

  config.token_key = 'C8DEE42E06244F1E';

  config.adminPassports = ['adminDefault'];
  config.adminAuth = ['default']; // service.admin.auth[]

  config.helmetOptions = {
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'script-src': [ "'self'", "'unsafe-eval'", "'unsafe-inline'"],
        'style-src': [ "'self'", "'unsafe-eval'", "'unsafe-inline'"],
      },
    },
  };

  return {
    ...config,
  };
};
