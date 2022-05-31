"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodegenSqliteDialect = void 0;
const kysely_1 = require("kysely");
const dialect_1 = require("../dialect");
class CodegenSqliteDialect extends dialect_1.CodegenDialect {
    constructor() {
        super(...arguments);
        this.defaultType = 'string';
        this.types = {
            ANY: 'unknown',
            BLOB: 'Buffer',
            INT: 'number',
            INTEGER: 'number',
            NUMERIC: 'number',
            REAL: 'number',
            TEXT: 'string',
        };
    }
    instantiate(options) {
        return new kysely_1.SqliteDialect({ databasePath: options.connectionString });
    }
}
exports.CodegenSqliteDialect = CodegenSqliteDialect;
//# sourceMappingURL=sqlite.js.map