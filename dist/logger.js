"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const util_1 = require("util");
const log_level_1 = require("./enums/log-level");
class Logger {
    constructor(logLevel) {
        this.logLevel = logLevel;
    }
    inspect(values) {
        return values
            .map((value) => {
            return value instanceof Object
                ? (0, util_1.inspect)(value, { colors: true })
                : value;
        })
            .join(' ');
    }
    debug(...values) {
        if (this.logLevel >= log_level_1.LogLevel.DEBUG) {
            console.debug(this.serializeDebug(...values));
        }
    }
    error(...values) {
        if (this.logLevel >= log_level_1.LogLevel.ERROR) {
            console.error(this.serializeError(...values));
        }
    }
    info(...values) {
        if (this.logLevel >= log_level_1.LogLevel.INFO) {
            console.info(this.serializeInfo(...values));
        }
    }
    log(...values) {
        if (this.logLevel >= log_level_1.LogLevel.INFO) {
            console.log(...values);
        }
    }
    serializeDebug(...values) {
        return chalk_1.default.gray(`  ${this.inspect(values)}`);
    }
    serializeError(...values) {
        return chalk_1.default.red(`✗ ${this.inspect(values)}`);
    }
    serializeInfo(...values) {
        return chalk_1.default.blue(`• ${this.inspect(values)}`);
    }
    serializeSuccess(...values) {
        return chalk_1.default.green(`✓ ${this.inspect(values)}`);
    }
    serializeWarn(...values) {
        return chalk_1.default.yellow(`⚠ ${this.inspect(values)}`);
    }
    success(...values) {
        if (this.logLevel >= log_level_1.LogLevel.INFO) {
            console.log(this.serializeSuccess(...values));
        }
    }
    warn(...values) {
        if (this.logLevel >= log_level_1.LogLevel.WARN) {
            console.warn(this.serializeWarn(...values));
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map