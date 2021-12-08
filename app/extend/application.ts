import { Application } from 'egg';
import { Connection } from 'mongoose';
import { MongooseSingleton } from '../../typings/app';

const DB_NAME = 'default';

export default {
  get adminDB(): Connection {
    const app = this as any as Application;
    return (app.mongooseDB as MongooseSingleton).get(DB_NAME);
  },
};
