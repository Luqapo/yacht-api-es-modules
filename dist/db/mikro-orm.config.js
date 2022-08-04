import { Yacht, BaseEntity } from '../entities/index.js';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
const config = {
    type: 'postgresql',
    dbName: 'yacht_rent',
    user: 'yacht_rent',
    password: 'yacht_rent',
    // as we are using class references here, we don't need to specify `entitiesTs` option
    entities: [Yacht, BaseEntity],
    highlighter: new SqlHighlighter(),
    debug: true,
};
export default config;
