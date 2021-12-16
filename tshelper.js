// eslint-disable-next-line @typescript-eslint/no-var-requires
const { gaiaAppDefault } = require('study-gaiajs/lib/tshelper/watch_dirs');

module.exports = {
  watchDirs: { ...gaiaAppDefault(__dirname), model: { enabled: false } },
};
