import { Logger } from './logger';
export declare class CodegenConnectionStringParser {
    readonly logger: Logger;
    readonly url: string;
    constructor(options: {
        logger: Logger;
        url: string;
    });
    parseConnectionString(): string;
}
