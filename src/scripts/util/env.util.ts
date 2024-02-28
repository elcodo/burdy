import _ from 'lodash';
import { config } from 'dotenv-flow';
import PathUtil from '@scripts/util/path.util';

config({ silent: true });
const env = process.env;

const envDefaults = {
  TYPEORM_CONNECTION: 'sqlite',
  TYPEORM_DATABASE: PathUtil.database('database.sqlite'),
  SERVER_PORT: '4000',
  ADMIN_PORT: '4001',
  PUBLIC_API_URL: '/api',
  PUBLIC_ADMIN_NAME: 'Burdy CMS',
  REQ_LIMIT: '128mb',
  SIGNED_COOKIE: 'eK0hL1oG1bL8yL4z',
};

Object.keys(envDefaults).forEach((key) => {
  if (env?.[key] === undefined) {
    env[key] = envDefaults[key];
  }
});

const defineAllEnv = (withPrefix = true) =>
  _.mapValues(
    _.mapKeys(env, (_value, key) => (withPrefix ? `process.env.${key}` : key)),
    JSON.stringify
  );
const definePublicEnv = () =>
  _.pickBy(defineAllEnv(false), (_value, key) => _.startsWith(key, 'PUBLIC_'));

export { definePublicEnv, defineAllEnv };
