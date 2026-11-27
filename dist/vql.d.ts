export declare interface AdapterCapabilities {
    transactions: boolean;
    indexes: boolean;
    persistent: boolean;
}
export declare type Arg<T = any> = IsStrict extends true ? FieldsOf<WithId<T>> : LooseArg<T>;
export declare type ArrayOperators<T = any> = {
    $arrInc?: {
        [K in keyof T]?: T[K] extends any[] ? T[K][number][] : T[K][];
    };
    $arrIncAll?: {
        [K in keyof T]?: T[K] extends any[] ? T[K][number][] : T[K][];
    };
    $size?: NestedValue<T, number>;
};
export declare type ArrayUpdater<T = any> = {
    $push?: NestedValue<T, any>;
    $pushSet?: NestedValue<T, any>;
    $pushAll?: NestedValue<T, any>;
    $pull?: NestedValue<T, any>;
    $pullAll?: NestedValue<T, any>;
};
export declare class Collection<D = Data> {
    db: ValtheraCompatible;
    collection: string;
    constructor(db: ValtheraCompatible, collection: string);
    add(data: Arg<D>, id_gen: false): Promise<D>;
    add(data: Arg<D>, id_gen?: true): Promise<D & {
        _id: string;
    }>;
    bulkAdd(data: Arg<D>[], id_gen: false): Promise<D[]>;
    bulkAdd(data: Arg<D>[], id_gen?: true): Promise<(D & {
        _id: string;
    })[]>;
    find(search?: Search<D>, options?: DbFindOpts<D>, findOpts?: FindOpts<D>): Promise<D[]>;
    findOne(search?: Search<D>, findOpts?: FindOpts<D>): Promise<D | null>;
    count(search?: Search<D>): Promise<number>;
    update(search: Search<D>, updater: Updater<D>): Promise<D[]>;
    updateOne(search: Search<D>, updater: Updater<D>): Promise<D | null>;
    remove(search: Search<D>): Promise<D[]>;
    removeOne(search: Search<D>): Promise<D | null>;
    updateOneOrAdd(search: Search<D>, updater: Updater<D>, { add_arg, id_gen }?: UpdateOneOrAdd<D>): ResultPromise<VQueryT.UpdateOneOrAddResult<D>>;
    toggleOne(search: Search<D>, data?: Arg<D>): ResultPromise<VQueryT.ToggleOneResult<D>>;
    createIndex(fields: string[], opts?: IndexOpts): Promise<void>;
    removeIndex(fields: string[]): Promise<void>;
}
export declare type ComparisonOperators<T = any> = {
    $ne?: NestedValue<T, any>;
    $gt?: NestedValue<T, number, number>;
    $lt?: NestedValue<T, number, number>;
    $gte?: NestedValue<T, number, number>;
    $lte?: NestedValue<T, number, number>;
    $between?: NestedValue<T, [
        number,
        number
    ], number>;
    $in?: {
        [K in keyof T]?: T[K] extends any[] ? T[K] : T[K][];
    };
    $nin?: {
        [K in keyof T]?: T[K] extends any[] ? T[K] : T[K][];
    };
    $idGt?: NestedValue<T, string | number, string | number>;
    $idLt?: NestedValue<T, string | number, string | number>;
    $idGte?: NestedValue<T, string | number, string | number>;
    $idLte?: NestedValue<T, string | number, string | number>;
};
export declare interface Data {
    [key: string]: any;
}
export declare interface DbFindOpts<T = any> {
    reverse?: boolean;
    limit?: number;
    offset?: number;
    sortBy?: KeysMatching<T, any> | {
        field: KeysMatching<T, any>;
        asc?: boolean;
    }[];
    sortAsc?: boolean;
    min?: Record<string, KeysMatching<T, number>>;
    max?: Record<string, KeysMatching<T, number>>;
    avg?: Record<string, KeysMatching<T, number>>;
    sum?: Record<string, KeysMatching<T, number>>;
    distinct?: KeysMatching<T, any>;
    groupBy?: KeysMatching<T, any> | KeysMatching<T, any>[];
    count?: Record<string, string>;
}
export declare type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
export declare type FieldPath<T = any> = KeysMatching<T, any> | (string & {}) | string[];
export declare type FieldsOf<T> = {
    [K in keyof T]?: T[K] extends Leaf ? T[K] : T[K] extends object ? FieldsOf<T[K]> | T[K] : T[K];
};
export declare interface FindOpts<T = any> {
    select?: FieldPath<T>[];
    exclude?: FieldPath<T>[];
    transform?: Function;
}
export declare interface IndexDefinition {
    collection: string;
    fields: string[];
    opts?: IndexOpts;
}
export declare interface IndexOpts {
    unique?: boolean;
    name?: string;
}
export declare type IsStrict = TypeConfig extends {
    strict: false;
} ? false : true;
export declare type JSPrimitiveType = "string" | "number" | "boolean" | "bigint" | "symbol" | "undefined" | "function" | "object";
export declare type KeysMatching<T, V, C = V> = {
    [K in keyof T]-?: T[K] extends C ? K : never;
}[keyof T];
export declare type Leaf = Date | RegExp | Function | readonly unknown[];
export declare type LogicalOperators<T = any> = {
    $and?: Array<SearchOptions<T>>;
    $or?: Array<SearchOptions<T>>;
    $not?: SearchOptions<T>;
};
export declare type LooseArg<T = any> = {
    [K in keyof T]?: any;
} & Record<string, any>;
export declare type NestedValue<T, V, C = V> = {
    [K in keyof T as T[K] extends C ? K : T[K] extends object ? K : never]?: T[K] extends C ? V : T[K] extends object ? NestedValue<T[K], V, C> : never;
};
export declare type ObjectUpdater<T = any> = {
    $merge?: NestedValue<T, any>;
    $deepMerge?: NestedValue<T, any>;
};
export declare type OtherOperators<T = any> = {
    $subset?: DeepPartial<T>;
};
export declare type PredefinedSearchOperators<T = any> = LogicalOperators<T> & ComparisonOperators<T> & TypeAndExistenceOperators<T> & ArrayOperators<T> & StringOperators<T> & OtherOperators<T>;
export declare namespace RelationTypes {
    type Path = [
        string,
        string
    ];
    type FieldPath = string[];
    interface DBS {
        [key: string]: ValtheraCompatible;
    }
    interface Relation {
        [key: string]: RelationConfig;
    }
    interface RelationConfig {
        path: Path;
        pk?: string;
        fk?: string;
        as?: string;
        select?: string[];
        dbFindOpts?: DbFindOpts;
        type?: "1" | "11" | "1n" | "nm" | "n1";
        relations?: Relation;
        through?: {
            table: string;
            db?: string;
            pk: string;
            fk: string;
        };
    }
}
export declare class ResultPromise<T extends {
    data: any;
    type: string;
}> extends Promise<T> {
    private _type?;
    private _data?;
    get type(): Promise<T["type"]>;
    get data(): Promise<T["data"]>;
    static get [Symbol.species](): PromiseConstructor;
    static wrap<S extends {
        data: any;
        type: string;
    }>(promise: Promise<S>): ResultPromise<S>;
}
export declare type Search<T = any> = SearchOptions<T>;
export declare type SearchOptions<T = any> = IsStrict extends true ? FieldsOf<WithId<T>> & PredefinedSearchOperators<WithId<T>> : PredefinedSearchOperators<T> & DeepPartial<T> & Record<string, any>;
export declare type StringOperators<T = any> = {
    $regex?: NestedValue<T, RegExp, string>;
    $startsWith?: NestedValue<T, string, string>;
    $endsWith?: NestedValue<T, string, string>;
    $iStartsWith?: NestedValue<T, string, string>;
    $iEndsWith?: NestedValue<T, string, string>;
};
export declare interface TransactionHandle {
    id: string;
    _adapterData?: unknown;
}
export declare type TypeAndExistenceOperators<T = any> = {
    $exists?: NestedValue<T, boolean, any>;
    $type?: NestedValue<T, JSPrimitiveType, any>;
};
export declare interface TypeConfig {
}
export declare interface UpdateOneOrAdd<T> {
    add_arg?: Arg<T>;
    id_gen?: boolean;
}
export declare type Updater<T = any> = UpdaterArg<T>;
export declare type UpdaterArg<T = any> = IsStrict extends true ? ArrayUpdater<WithId<T>> & ObjectUpdater<WithId<T>> & ValueUpdater<WithId<T>> & FieldsOf<WithId<T>> : ArrayUpdater<T> & ObjectUpdater<T> & ValueUpdater<T> & DeepPartial<T> & Record<string, any>;
export declare interface ValtheraCompatible {
    c<T = Data>(collection: string): Collection<T>;
    getCollections(): Promise<string[]>;
    ensureCollection(collection: string | VQueryT.Collection): Promise<boolean>;
    issetCollection(collection: string | VQueryT.Collection): Promise<boolean>;
    add<T = Data>(query: VQueryT.Add<T>): Promise<T>;
    find<T = Data>(query: VQueryT.Find<T>): Promise<T[]>;
    findOne<T = Data>(query: VQueryT.FindOne<T>): Promise<T | null>;
    update<T = Data>(query: VQueryT.Update<T>): Promise<T[]>;
    updateOne<T = Data>(query: VQueryT.Update<T>): Promise<T | null>;
    remove<T = Data>(query: VQueryT.Remove<T>): Promise<T[]>;
    removeOne<T = Data>(query: VQueryT.Remove<T>): Promise<T | null>;
    removeCollection(collection: string | VQueryT.Collection): Promise<boolean>;
    updateOneOrAdd<T = Data>(query: VQueryT.UpdateOneOrAdd<T>): ResultPromise<VQueryT.UpdateOneOrAddResult<T>>;
    toggleOne<T = Data>(query: VQueryT.ToggleOne<T>): ResultPromise<VQueryT.ToggleOneResult<T>>;
    createIndex(collection: string, fields: string[], opts?: IndexOpts): Promise<void>;
    removeIndex(collection: string, fields: string[]): Promise<void>;
    count(query: VQueryT.Count): Promise<number>;
    bulkAdd<T = Data>(query: VQueryT.BulkAdd<T>): Promise<T[]>;
    capabilities(): Promise<AdapterCapabilities>;
}
export declare class ValtheraError extends Error {
    code: string;
    suggestion?: string;
    context?: Record<string, unknown>;
    constructor(message: string, opts: ValtheraErrorOpts);
    toJSON(): {
        name: string;
        code: string;
        message: string;
        suggestion?: string | undefined;
        context?: Record<string, unknown> | undefined;
    };
}
export declare interface ValtheraErrorOpts {
    code: string;
    cause?: unknown;
    suggestion?: string;
    context?: Record<string, unknown>;
}
export declare type ValueUpdater<T = any> = {
    $inc?: NestedValue<T, number>;
    $dec?: NestedValue<T, number>;
    $unset?: NestedValue<T, any>;
    $rename?: NestedValue<T, any>;
    $set?: IsStrict extends true ? FieldsOf<T> : NestedValue<T, any>;
};
export declare type VQL_Fields = Record<string, boolean | number> | string[];
export declare interface VQL_OP_Add<T = any> {
    collection: string;
    data?: Arg<T>;
    id_gen?: boolean;
}
export declare interface VQL_OP_BulkAdd<T = any> {
    collection: string;
    datas: Arg<T>[];
    id_gen?: boolean;
}
export declare interface VQL_OP_CollectionOperation {
    collection: string;
}
export declare interface VQL_OP_Count<T = any> {
    collection: string;
    search?: Search<T>;
}
export declare interface VQL_OP_Find<T = any> {
    collection: string;
    search?: Search<T>;
    limit?: number;
    select?: VQL_Fields;
    options?: DbFindOpts<T>;
    searchOpts?: FindOpts<T>;
}
export declare interface VQL_OP_FindOne<T = any> {
    collection: string;
    search: Search<T>;
    select?: VQL_Fields;
    searchOpts?: FindOpts<T>;
}
export declare interface VQL_OP_Remove<T = any> {
    collection: string;
    search: Search<T>;
    select?: VQL_Fields;
}
export declare interface VQL_OP_ToggleOne<T = any> {
    collection: string;
    search: Search<T>;
    data?: Arg<T>;
    select?: VQL_Fields;
}
export declare interface VQL_OP_Update<T = any> {
    collection: string;
    search: Search<T>;
    updater: UpdaterArg<T>;
    select?: VQL_Fields;
}
export declare interface VQL_OP_UpdateOneOrAdd<T = any> {
    collection: string;
    search: Search<T>;
    updater: UpdaterArg<T>;
    add_arg?: Arg<T>;
    id_gen?: boolean;
    select?: VQL_Fields;
}
export declare type VQL_Query<T = any> = (VQL_Query_CRUD<T> | VQL_Query_Relation) & VQL_Var;
export declare interface VQL_Query_CRUD<T = any> {
    db: string;
    d: VQL_Query_CRUD_Data<T>;
}
export declare type VQL_Query_CRUD_Data<T = any> = {
    find: VQL_OP_Find<T>;
} | {
    findOne: VQL_OP_FindOne<T>;
} | {
    f: VQL_OP_FindOne<T>;
} | {
    add: VQL_OP_Add<T>;
} | {
    update: VQL_OP_Update<T>;
} | {
    updateOne: VQL_OP_Update<T>;
} | {
    remove: VQL_OP_Remove<T>;
} | {
    removeOne: VQL_OP_Remove<T>;
} | {
    updateOneOrAdd: VQL_OP_UpdateOneOrAdd<T>;
} | {
    toggleOne: VQL_OP_ToggleOne<T>;
} | {
    count: VQL_OP_Count<T>;
} | {
    bulkAdd: VQL_OP_BulkAdd<T>;
} | {
    removeCollection: VQL_OP_CollectionOperation;
} | {
    ensureCollection: VQL_OP_CollectionOperation;
} | {
    issetCollection: VQL_OP_CollectionOperation;
} | {
    getCollections: {};
};
export declare type VQL_Query_CRUD_Keys = VQL_Query_CRUD_Data extends infer U ? U extends Record<string, unknown> ? keyof U : never : never;
export declare interface VQL_Query_Relation {
    r: {
        path: RelationTypes.Path;
        search: Search;
        relations: RelationTypes.Relation;
        many?: boolean;
        options?: DbFindOpts;
        select?: RelationTypes.FieldPath[] | Record<string, any>;
    };
}
export declare interface VQL_Var {
    var?: {
        [k: string]: any;
    };
}
export declare class VQLError extends ValtheraError {
    statusCode: number;
    constructor(message: string, code: string, opts?: VQLErrorOpts);
}
export declare interface VQLErrorOpts {
    statusCode?: number;
    suggestion?: string;
    context?: Record<string, unknown>;
    cause?: unknown;
}
export declare type VQLUQ<T = any> = VQL_Query<T> | string | ({
    query: string;
} & VQL_Var);
export declare interface VQuery<T = Data> {
    collection?: string;
    search?: Search<T>;
    dbFindOpts?: DbFindOpts<T>;
    findOpts?: FindOpts<T>;
    data?: Arg<T>;
    datas?: Arg<T>[];
    id_gen?: boolean;
    add_arg?: Arg<T>;
    updater?: Updater<T>;
    control?: VQuery_Control;
    transaction?: TransactionHandle;
    index?: IndexDefinition;
}
export declare interface VQuery_Control {
}
export declare namespace VQueryT {
    type QueryBase<T = Data> = {
        collection: string;
        control?: VQuery_Control;
        transaction?: TransactionHandle;
    };
    type Add<T = Data> = QueryBase<T> & {
        data: Arg<T>;
        id_gen?: boolean;
    };
    type BulkAdd<T = Data> = QueryBase<T> & {
        datas: Arg<T>[];
        id_gen?: boolean;
    };
    type Find<T = Data> = QueryBase<T> & {
        search?: NoInfer<Search<T>>;
        findOpts?: FindOpts<T>;
        dbFindOpts?: DbFindOpts<T>;
    };
    type FindOne<T = Data> = QueryBase<T> & {
        search: NoInfer<Search<T>>;
        findOpts?: FindOpts<T>;
    };
    type Update<T = Data> = QueryBase<T> & {
        search: NoInfer<Search<T>>;
        updater: NoInfer<Updater<T>>;
    };
    type Remove<T = Data> = QueryBase<T> & {
        search: NoInfer<Search<T>>;
    };
    type UpdateOneOrAdd<T = Data> = QueryBase<T> & {
        search: NoInfer<Search<T>>;
        updater: NoInfer<Updater<T>>;
        add_arg?: NoInfer<Arg<T>>;
        id_gen?: boolean;
    };
    type ToggleOne<T = Data> = QueryBase<T> & {
        search: NoInfer<Search<T>>;
        data: NoInfer<Arg<T>>;
    };
    interface UpdateOneOrAddResult<T> {
        data: T;
        type: "added" | "updated";
    }
    interface ToggleOneResult<T> {
        data: T;
        type: "added" | "removed";
    }
    type CreateIndex<T = Data> = QueryBase<T> & {
        index: IndexDefinition;
    };
    type RemoveIndex<T = Data> = QueryBase<T> & {
        index: IndexDefinition;
    };
    type Count<T = Data> = QueryBase<T> & {
        search?: NoInfer<Search<T>>;
    };
    interface Collection {
        collection: string;
    }
}
export declare type WithId<T> = T & {
    _id?: string;
};
