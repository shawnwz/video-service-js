import { Knex } from "knex";

function getEnvVar(name: string, required: true, defaultValue?: string): string;
function getEnvVar(name: string, required: boolean, defaultValue: string): string;
function getEnvVar(name: string, required: boolean, defaultValue?: string): string | undefined {
    const value = process.env[name] ?? defaultValue;
    if (required && value === undefined) {
        console.error(`missing env. var. ${name}`);
        process.exit(1);
    }
    return value
}

export const dbConfig: Knex.PgConnectionConfig = {
    host: getEnvVar('PGSQL_HOST', true),
    user: getEnvVar('PGSQL_USER', true),
    password: getEnvVar('PGSQL_PASS', true),
    database: getEnvVar('PGSQL_DBNAME', true),
    port: parseInt(getEnvVar('PGSQL_PORT', true, '5432'), 10)
}
