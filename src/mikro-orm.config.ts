import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Yacht, BaseEntity, User } from './entities/index.js';

const config: Options = {
  type: 'postgresql',
  dbName: 'yacht_rent',
  user: 'yacht_rent',
  password: 'yacht_rent',
  // as we are using class references here, we don't need to specify `entitiesTs` option
  entities: [BaseEntity, Yacht, User],
  highlighter: new SqlHighlighter(),
  debug: true,
};

export default config;
