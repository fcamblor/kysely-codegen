import { CodegenDialect } from './dialect';
export declare type CodegenDialectName = 'postgres' | 'sqlite';
export declare class CodegenDialectManager {
    getDialect(name: CodegenDialectName): CodegenDialect;
}
