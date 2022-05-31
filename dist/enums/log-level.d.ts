export declare const enum LogLevel {
    SILENT = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    DEBUG = 4
}
export declare const getLogLevel: (name?: 'silent' | 'info' | 'warn' | 'error' | 'debug') => LogLevel;
