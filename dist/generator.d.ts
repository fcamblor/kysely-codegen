import { CodegenDialect } from './dialect';
import { CodegenFormat } from './enums/format';
import { LogLevel } from './enums/log-level';
export declare class CodegenGenerator {
    readonly dialect: CodegenDialect;
    readonly format: CodegenFormat;
    readonly logLevel: LogLevel;
    readonly outFile: string;
    readonly print: boolean;
    readonly url: string;
    constructor(options: {
        dialect: CodegenDialect;
        format?: CodegenFormat;
        logLevel: LogLevel;
        outFile: string;
        print?: boolean;
        url: string;
    });
    /**
     * Generates a file with database type definitions.
     *
     * @example
     * ```typescript
     * import { generate } from 'kysely-codegen';
     *
     * await generate({
     *   driver: 'pg',
     *   logLevel: LogLevel.WARN,
     *   outFile: './kysely-codegen/index.d.ts',
     *   url: 'env(DATABASE_URL)',
     * });
     *
     * // Output:
     * export type User = {
     *   created_at: Date;
     *   email: string;
     *   full_name: string;
     *   is_active: boolean;
     * };
     * ```
     */
    generate(): Promise<void>;
}
