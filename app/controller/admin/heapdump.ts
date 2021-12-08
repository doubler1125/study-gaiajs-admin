import * as fs from 'fs';
import * as os from 'os';
import { promisify } from 'util';
// import * as heapdump from 'heapdump';
import bpAdmin, { AdminBaseController } from '../../lib/router/admin';

@bpAdmin.controller({ prefix: '/admin/system' })
export default class SystemController extends AdminBaseController {
  @bpAdmin.get('/heapdump')
  async heapdump() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const heapdump = require('heapdump');
    if (!heapdump) {
      return this.ctx.fail(404, 'heapdump not installed');
    }

    if (this.ctx.request.query.hostname && this.ctx.request.query.hostname !== os.hostname()) {
      return this.ctx.fail(404, 'try again');
    }

    if (this.ctx.request.query.pid && String(this.ctx.request.query.pid) !== String(process.pid)) {
      return this.ctx.fail(404, 'try again');
    }

    const fileName = await promisify(heapdump.writeSnapshot)();

    const stream = fs.createReadStream(fileName);
    stream.on('end', () => {
      fs.unlink(fileName, err => {
        if (err) {
          this.ctx.logError({ msg: `cannot remove file: ${fileName}` }, err);
        }
      });
    });

    stream.on('error', err => {
      this.ctx.logError({ msg: 'read error', detail: { fileName } }, err);

      fs.unlink(fileName, err => {
        if (err) {
          this.ctx.logError({ msg: `cannot remove file: ${fileName}` }, err);
        }
      });
    });

    this.ctx.status = 200;
    this.ctx.set('Content-Disposition', "attachment; filename*=UTF-8''" + encodeURIComponent(fileName));
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.body = stream;
  }
}
