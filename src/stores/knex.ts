import knexConfig  from 'knex'
import { dbConfig} from "../variables";

export default knexConfig({
    client: 'pg',
    connection: dbConfig,
})
