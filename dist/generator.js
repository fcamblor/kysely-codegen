"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodegenGenerator = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const connection_string_parser_1 = require("./connection-string-parser");
const format_1 = require("./enums/format");
const introspector_1 = require("./introspector");
const logger_1 = require("./logger");
const serializer_1 = require("./serializer");
class CodegenGenerator {
    constructor(options) {
        this.dialect = options.dialect;
        this.format = options.format ?? format_1.CodegenFormat.INTERFACE;
        this.logLevel = options.logLevel;
        this.outFile = options.outFile;
        this.print = options.print ?? false;
        this.url = options.url;
    }
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
    async generate() {
        const logger = new logger_1.Logger(this.logLevel);
        const connectionStringParser = new connection_string_parser_1.CodegenConnectionStringParser({
            logger,
            url: this.url,
        });
        const connectionString = connectionStringParser.parseConnectionString();
        const startTime = performance.now();
        logger.info('Introspecting database...');
        const introspector = new introspector_1.CodegenDatabaseIntrospector({
            connectionString,
            dialect: this.dialect,
        });
        const tables = await introspector.introspect();
        logger.debug();
        logger.debug(`Found ${tables.length} public tables:`);
        for (const table of tables) {
            logger.debug(` - ${table.name}`);
        }
        logger.debug();
        const serializer = new serializer_1.CodegenSerializer({
            dialect: this.dialect,
            format: this.format,
            tables,
        });
        const data = serializer.serialize();
        if (this.print) {
            logger.log();
            logger.log(data);
        }
        else {
            const outDir = (0, path_1.parse)(this.outFile).dir;
            await fs_1.promises.mkdir(outDir, { recursive: true });
            await fs_1.promises.writeFile(this.outFile, data);
            const endTime = performance.now();
            const relativeOutDir = `.${path_1.sep}${(0, path_1.relative)(process.cwd(), this.outFile)}`;
            const duration = Math.round(endTime - startTime);
            logger.success(`Introspected ${tables.length} tables and generated ${relativeOutDir} in ${duration}ms.`);
        }
    }
}
exports.CodegenGenerator = CodegenGenerator;
//# sourceMappingURL=generator.js.map