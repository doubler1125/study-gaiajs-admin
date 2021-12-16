import bp from 'study-gaiajs/app/lib/router/admin_blueprint';
import GenericTask, { TaskSource } from 'study-gaiajs/app/lib/task/generic_task';
import { sleep } from 'study-gaiajs/app/lib/utils';
import { Context } from 'egg';
import { AdminBaseController } from '../../lib/router/admin';

class SimulateTaskSource implements TaskSource<number, number> {
  ctx: Context;

  constructor(ctx: Context) {
    Object.defineProperty(this, 'ctx', {
      enumerable: false,
      writable: false,
      configurable: false,
      value: ctx,
    });
  }

  static info() {
    return {
      id: 'simulate_task',
      name: '模拟任务',
    };
  }

  async getTotalItemsCount() {
    return 1000;
  }

  async *[Symbol.asyncIterator]() {
    for (let i = 0; i < 1000; i++) {
      yield i;
    }
  }

  async exec(results: number) {
    await sleep(100);
    return {
      step: 1,
      id: results,
    };
  }
}
export default class AdminController extends AdminBaseController {
  @bp.get('/admin/system/task/index')
  async task() {
    await this.ctx.render('admin/task');
  }

  @bp.get('/admin/system/task/status')
  async taskStatus() {
    const tasks = await this.app.taskManager.retrieveTasks();

    this.ctx.body = { tasks: Object.values(tasks) };
  }

  @bp.post('/admin/system/task/remove_finish')
  async removeAllFinishedTasks() {
    const tasks = await this.app.taskManager.clearAllFinishedTasks();

    this.ctx.body = { success: true, tasks };
  }

  @bp.post('/admin/system/task/stop')
  async stopTask() {
    const success = await this.app.taskManager.stopTask(this.ctx.request.body.hostname, parseInt(this.ctx.request.body.pid), this.ctx.request.body.id);

    this.ctx.body = { success: success };
  }

  @bp.post('/admin/system/task/clear')
  async clearTask() {
    await this.app.taskManager.clearTask(this.ctx.request.body.id);

    this.ctx.body = { success: true };
  }

  @bp.post('/admin/system/task/simulate')
  async simulateTask() {
    const task = this.ctx.app.taskManager.runTask(new GenericTask(this.app, SimulateTaskSource, { workers: 3 }) as any);
    /* this.app.taskManager.runTask(new (class extends Task {
      async exec() {
        this.progress.updateEstimatedTotal(1000);

        for (let i = 0; i < 50; i++) {
          if (this.stopping) {
            return;
          }

          await sleep(500);

          this.progress.increaseProgress(20, i);
        }

        return 1000;
      }
    })(this.app)); */

    this.ctx.body = { success: true, task };
  }
}
