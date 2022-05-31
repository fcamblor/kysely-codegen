"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogLevel = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["SILENT"] = 0] = "SILENT";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    LogLevel[LogLevel["DEBUG"] = 4] = "DEBUG";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
const getLogLevel = (name) => {
    switch (name) {
        case 'silent':
            return LogLevel.SILENT;
        case 'info':
            return LogLevel.INFO;
        case 'error':
            return LogLevel.ERROR;
        case 'debug':
            return LogLevel.DEBUG;
        default:
            return LogLevel.WARN;
    }
};
exports.getLogLevel = getLogLevel;
//# sourceMappingURL=log-level.js.map