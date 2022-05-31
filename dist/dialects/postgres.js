"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodegenPostgresDialect = void 0;
const kysely_1 = require("kysely");
const dialect_1 = require("../dialect");
class CodegenPostgresDialect extends dialect_1.CodegenDialect {
    constructor() {
        super(...arguments);
        this.defaultType = 'string';
        this.imports = {
            IPostgresInterval: 'postgres-interval',
        };
        this.models = {
            Circle: {
                radius: 'number',
                x: 'number',
                y: 'number',
            },
        };
        this.schema = 'public';
        this.types = {
            bool: 'boolean',
            bytea: 'Buffer',
            circle: 'Circle',
            float4: 'number',
            float8: 'number',
            int2: 'number',
            int4: 'number',
            int8: 'number',
            interval: 'IPostgresInterval',
            json: 'unknown',
            jsonb: 'unknown',
            numeric: 'number',
            oid: 'number',
            text: 'string',
            timestamp: 'number|string|Date',
            timestamptz: 'number|string|Date',
        };
    }
    instantiate(options) {
        return new kysely_1.PostgresDialect({
            connectionString: options.connectionString,
            ssl: options.ssl ? { rejectUnauthorized: false } : false,
        });
    }
}
exports.CodegenPostgresDialect = CodegenPostgresDialect;
//# sourceMappingURL=postgres.js.map