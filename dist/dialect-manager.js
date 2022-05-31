"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodegenDialectManager = void 0;
const postgres_1 = require("./dialects/postgres");
const sqlite_1 = require("./dialects/sqlite");
class CodegenDialectManager {
    getDialect(name) {
        switch (name) {
            case 'postgres':
                return new postgres_1.CodegenPostgresDialect();
            default:
                return new sqlite_1.CodegenSqliteDialect();
        }
    }
}
exports.CodegenDialectManager = CodegenDialectManager;
//# sourceMappingURL=dialect-manager.js.map