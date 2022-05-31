import { TableMetadata } from 'kysely';
import { CodegenDialect } from './dialect';
import { CodegenFormat } from './enums/format';
export declare class CodegenSerializer {
    #private;
    readonly dialect: CodegenDialect;
    readonly format: CodegenFormat;
    readonly tables: TableMetadata[];
    constructor(options: {
        dialect: CodegenDialect;
        format: CodegenFormat;
        tables: TableMetadata[];
    });
    /**
     * @example
     * ```typescript
     * new Serializer({
     *   dialect: pgDialect,
     *   style: 'interface',
     *   tables: {
     *     name: 'user',
     *     schema: 'public',
     *     columns: [
     *       { name: 'created_at', dataType: 'timestamptz', isNullable: false },
     *       { name: 'full_name', dataType: 'varchar', isNullable: true },
     *     ],
     *   },
     * }).serialize();
     *
     * // Output:
     * export interface User {
     *   created_at: Date;
     *   full_name: string | null;
     * }
     *
     * export interface DB {
     *   user: User;
     * }
     * ```
     */
    serialize(): string;
}
