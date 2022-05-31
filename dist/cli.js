#!/usr/bin/env node
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _CodegenCli_instances, _CodegenCli_parseOptions, _CodegenCli_generate;
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const dialect_manager_1 = require("./dialect-manager");
const format_1 = require("./enums/format");
const log_level_1 = require("./enums/log-level");
const generator_1 = require("./generator");
const logger_1 = require("./logger");
const DEFAULT_OUT_FILE = './node_modules/kysely-codegen/dist/index.d.ts';
const VALID_DIALECTS = ['postgres', 'sqlite'];
const VALID_FORMATS = ['interface', 'type'];
const VALID_FLAGS = new Set([
    '_',
    'dialect',
    'format',
    'h',
    'help',
    'log-level',
    'out-file',
    'print',
    'url',
]);
class CodegenCli {
    constructor() {
        _CodegenCli_instances.add(this);
    }
    async run() {
        const options = __classPrivateFieldGet(this, _CodegenCli_instances, "m", _CodegenCli_parseOptions).call(this, process.argv.slice(2));
        await __classPrivateFieldGet(this, _CodegenCli_instances, "m", _CodegenCli_generate).call(this, options);
    }
}
_CodegenCli_instances = new WeakSet(), _CodegenCli_parseOptions = function _CodegenCli_parseOptions(args) {
    const argv = (0, minimist_1.default)(args);
    const _ = argv._;
    const dialectName = argv.dialect;
    const format = argv.format ?? format_1.CodegenFormat.INTERFACE;
    const help = !!argv.h || !!argv.help || _.includes('-h') || _.includes('--help');
    const logLevel = (0, log_level_1.getLogLevel)(argv['log-level']);
    const outFile = argv['out-file'] ?? DEFAULT_OUT_FILE;
    const print = !!argv.print;
    const url = argv.url ?? 'env(DATABASE_URL)';
    const logger = new logger_1.Logger(logLevel);
    try {
        for (const key in argv) {
            if (!VALID_FLAGS.has(key)) {
                throw new RangeError(`Invalid flag: "${key}"`);
            }
        }
        const dialectValues = VALID_DIALECTS.join(', ');
        const formatValues = VALID_FORMATS.join(', ');
        if (help) {
            logger.log('\n' +
                'kysely-codegen [options]\n' +
                '\n' +
                `  --dialect    Set the SQL dialect. (values: [${dialectValues}])\n` +
                `  --format     Set the output format. (values: [${formatValues}], default: interface)\n` +
                '  --help, -h   Print this message.\n' +
                '  --log-level  Set the terminal log level. (values: [debug, info, warn, error, silent], default: warn)\n' +
                `  --out-file   Set the file build path. (default: ${DEFAULT_OUT_FILE})\n` +
                '  --print      Print the generated output to the terminal.\n' +
                '  --url        Set the database connection string URL. This may point to an environment variable. (default: env(DATABASE_URL))\n');
            process.exit(0);
        }
        if (!VALID_DIALECTS.includes(dialectName)) {
            throw new RangeError(`Parameter '--dialect' must have one of the following values: ${dialectValues}`);
        }
        if (!VALID_FORMATS.includes(format)) {
            throw new RangeError(`Parameter '--format' must have one of the following values: ${formatValues}`);
        }
        if (!url) {
            throw new TypeError("Parameter '--url' must be a valid connection string. Examples:\n\n" +
                '  --url=postgres://username:password@mydomain.com/database\n' +
                '  --url=env(DATABASE_URL)');
        }
    }
    catch (error) {
        if (logLevel > log_level_1.LogLevel.SILENT) {
            if (error instanceof Error) {
                console.error(logger.serializeError(error.message));
                if (logLevel >= log_level_1.LogLevel.DEBUG) {
                    console.error();
                    throw error;
                }
                else {
                    process.exit(0);
                }
            }
            else {
                throw error;
            }
        }
    }
    const dialectManager = new dialect_manager_1.CodegenDialectManager();
    const dialect = dialectManager.getDialect(dialectName);
    return {
        dialect,
        format,
        logLevel,
        outFile,
        print,
        url,
    };
}, _CodegenCli_generate = async function _CodegenCli_generate(options) {
    const generator = new generator_1.CodegenGenerator(options);
    await generator.generate();
};
const cli = new CodegenCli();
void cli.run();
//# sourceMappingURL=cli.js.map