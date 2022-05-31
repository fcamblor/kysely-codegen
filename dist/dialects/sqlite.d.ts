import { SqliteDialect } from 'kysely';
import { CodegenDialect } from '../dialect';
export declare class CodegenSqliteDialect extends CodegenDialect {
    readonly defaultType = "string";
    readonly types: {
        ANY: string;
        BLOB: string;
        INT: string;
        INTEGER: string;
        NUMERIC: string;
        REAL: string;
        TEXT: string;
    };
    instantiate(options: {
        connectionString: string;
    }): SqliteDialect;
}
