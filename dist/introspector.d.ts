import { TableMetadata } from 'kysely';
import { CodegenDialect } from './dialect';
export declare class CodegenDatabaseIntrospector {
    readonly connectionString: string;
    readonly dialect: CodegenDialect;
    constructor(options: {
        connectionString: string;
        dialect: CodegenDialect;
    });
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
    introspect(): Promise<TableMetadata[]>;
}
