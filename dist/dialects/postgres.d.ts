import { PostgresDialect } from 'kysely';
import { CodegenDialect } from '../dialect';
export declare class CodegenPostgresDialect extends CodegenDialect {
    readonly defaultType = "string";
    readonly imports: {
        IPostgresInterval: string;
    };
    readonly models: {
        Circle: {
            radius: string;
            x: string;
            y: string;
        };
    };
    readonly schema = "public";
    readonly types: {
        bool: string;
        bytea: string;
        circle: string;
        float4: string;
        float8: string;
        int2: string;
        int4: string;
        int8: string;
        interval: string;
        json: string;
        jsonb: string;
        numeric: string;
        oid: string;
        text: string;
        timestamp: string;
        timestamptz: string;
    };
    instantiate(options: {
        connectionString: string;
        ssl: boolean;
    }): PostgresDialect;
}
