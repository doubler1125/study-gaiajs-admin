import { ObjectId } from 'mongodb';

import BaseBSONDocObject from 'study-gaiajs/app/object/BaseBSONDocObject';

export default class Log extends BaseBSONDocObject<ObjectId> {
  type: string;
  subType: string;
  opType: string;
  targetId: string|number;
  desc: string;
  detail: { [key: string]: any };
  admin_user: string|number;
  time: Date;

  get localTime() {
    const time = this.getProperty('time');
    return time instanceof Date ? time.toLocaleString() : time;
  }
}
