"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CodegenSerializer_instances, _CodegenSerializer_serializeExport, _CodegenSerializer_serializeExports, _CodegenSerializer_serializeInterface, _CodegenSerializer_serializeInterfaceName;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodegenSerializer = void 0;
class CodegenSerializer {
    constructor(options) {
        _CodegenSerializer_instances.add(this);
        this.dialect = options.dialect;
        this.format = options.format;
        this.tables = options.tables;
    }
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
    serialize() {
        const importedTypes = new Set();
        const imports = {};
        const models = [];
        const interfaces = [];
        const exports = [];
        for (const table of this.tables) {
            for (const { dataType } of table.columns) {
                const type = this.dialect.types?.[dataType];
                const moduleName = this.dialect.imports?.[type];
                if (moduleName && !importedTypes.has(type)) {
                    if (!imports[moduleName]) {
                        imports[moduleName] = [];
                    }
                    imports[moduleName].push(type);
                    importedTypes.add(type);
                }
                else {
                    const model = this.dialect.models?.[type];
                    if (model) {
                        models.push([type, model]);
                    }
                }
            }
            const interfaceName = __classPrivateFieldGet(this, _CodegenSerializer_instances, "m", _CodegenSerializer_serializeInterfaceName).call(this, table.name);
            interfaces.push({
                body: __classPrivateFieldGet(this, _CodegenSerializer_instances, "m", _CodegenSerializer_serializeInterface).call(this, interfaceName, table.columns),
                name: interfaceName,
            });
            exports.push([table.name, interfaceName]);
        }
        let data = '';
        const importEntries = Object.entries(imports).sort(([a], [b]) => a.localeCompare(b));
        for (const [moduleName, moduleImports] of importEntries) {
            data += 'import {';
            for (let i = 0; i < moduleImports.length; i++) {
                if (i) {
                    data += ',';
                }
                data += ' ';
                data += moduleImports[i];
            }
            if (moduleImports.length) {
                data += ' ';
            }
            data += "} from '";
            data += moduleName;
            data += "';\n";
        }
        if (importEntries.length) {
            data += '\n';
        }
        for (const [name, model] of models) {
            const entries = Object.entries(model).sort(([a], [b]) => a.localeCompare(b));
            data += __classPrivateFieldGet(this, _CodegenSerializer_instances, "m", _CodegenSerializer_serializeExport).call(this, name);
            data += ' {';
            for (const [key, value] of entries) {
                data += '\n  ';
                data += key;
                data += ': ';
                data += value;
                data += ';';
            }
            if (entries.length) {
                data += '\n';
            }
            data += '}\n\n';
        }
        interfaces.sort((a, b) => a.name.localeCompare(b.name));
        for (const { body } of interfaces) {
            data += body;
        }
        data += __classPrivateFieldGet(this, _CodegenSerializer_instances, "m", _CodegenSerializer_serializeExports).call(this, exports);
        return data;
    }
}
exports.CodegenSerializer = CodegenSerializer;
_CodegenSerializer_instances = new WeakSet(), _CodegenSerializer_serializeExport = function _CodegenSerializer_serializeExport(name) {
    let data = '';
    data += 'export ';
    data += this.format;
    data += ' ';
    data += name;
    if (this.format === 'type') {
        data += ' =';
    }
    return data;
}, _CodegenSerializer_serializeExports = function _CodegenSerializer_serializeExports(exports) {
    let data = '';
    data += __classPrivateFieldGet(this, _CodegenSerializer_instances, "m", _CodegenSerializer_serializeExport).call(this, 'DB');
    data += ' {';
    if (exports.length) {
        data += '\n';
        for (const [tableName, interfaceName] of exports) {
            data += '  ';
            data += tableName;
            data += ': ';
            data += interfaceName;
            data += ';\n';
        }
    }
    data += '}\n';
    return data;
}, _CodegenSerializer_serializeInterface = function _CodegenSerializer_serializeInterface(interfaceName, columns) {
    let data = '';
    data += __classPrivateFieldGet(this, _CodegenSerializer_instances, "m", _CodegenSerializer_serializeExport).call(this, interfaceName);
    data += ' {';
    const sortedColumns = [...columns].sort((a, b) => a.name.localeCompare(b.name));
    for (const column of sortedColumns) {
        const dataType = column.dataType;
        const type = this.dialect.types?.[dataType] ?? this.dialect.defaultType ?? 'unknown';
        data += '\n  ';
        data += column.name;
        data += ': ';
        data += type;
        if (column.isNullable) {
            data += ' | null';
        }
        data += ';';
    }
    if (columns.length) {
        data += '\n';
    }
    data += '}\n\n';
    return data;
}, _CodegenSerializer_serializeInterfaceName = function _CodegenSerializer_serializeInterfaceName(tableName) {
    return tableName
        .split('_')
        .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
};
//# sourceMappingURL=serializer.js.map