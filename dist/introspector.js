"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodegenDatabaseIntrospector = void 0;
const kysely_1 = require("kysely");
class CodegenDatabaseIntrospector {
    constructor(options) {
        this.connectionString = options.connectionString;
        this.dialect = options.dialect;
    }
    /**
     * Gets all public schemas from a database.
     *
     * @example
     * ```typescript
     * await introspect({
     *   connectionString: 'postgres://username:password@mydomain.com/database',
     *   driver: 'pg',
     * });
     *
     * // Output:
     * [
     *   {
     *     name: 'user',
     *     schema: 'public',
     *     columns: [
     *       { name: 'created_at', dataType: 'timestamptz', isNullable: false },
     *       { name: 'full_name', dataType: 'varchar', isNullable: true },
     *     ],
     *   },
     * ]
     * ```
     */
    async introspect() {
        let tables = [];
        // Insane solution in lieu of a better one.
        // We'll create a database connection with SSL, and if it complains about SSL, try without it.
        for (const ssl of [true, false]) {
            try {
                const db = new kysely_1.Kysely({
                    dialect: this.dialect.instantiate({
                        connectionString: this.connectionString,
                        ssl,
                    }),
                });
                tables = await db.introspection.getTables();
                await db.destroy();
                break;
            }
            catch (error) {
                const isSslError = error instanceof Error && /\bSSL\b/.test(error.message);
                const isUnexpectedError = !ssl || !isSslError;
                if (isUnexpectedError) {
                    throw error;
                }
            }
        }
        return tables
            .filter((table) => {
            return this.dialect.schema
                ? table.schema === this.dialect.schema
                : true;
        })
            .sort((a, b) => a.name.localeCompare(b.name));
    }
}
exports.CodegenDatabaseIntrospector = CodegenDatabaseIntrospector;
//# sourceMappingURL=introspector.js.map