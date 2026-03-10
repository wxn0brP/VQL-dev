export interface Data {
    [key: string]: any;
}
export type KeysMatching<T, V, C = V> = {
    [K in keyof T]-?: T[K] extends C ? K : never;
}[keyof T];
export type NestedValue<T, V, C = V> = {
    [K in keyof T as T[K] extends C ? K : T[K] extends object ? K : never]?: T[K] extends C ? V : T[K] extends object ? NestedValue<T[K], V, C> : never;
};
export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
export type JSPrimitiveType = "string" | "number" | "boolean" | "bigint" | "symbol" | "undefined" | "function" | "object";
export type LogicalOperators<T = any> = {
    $and?: Array<SearchOptions<T>>;
    $or?: Array<SearchOptions<T>>;
    $not?: SearchOptions<T>;
};
export type ComparisonOperators<T = any> = {
    $gt?: NestedValue<T, number, number>;
    $lt?: NestedValue<T, number, number>;
    $gte?: NestedValue<T, number, number>;
    $lte?: NestedValue<T, number, number>;
    $between?: NestedValue<T, [
        number,
        number
    ], number>;
    $in?: DeepPartial<T> & {
        [K in keyof T]?: T[K] extends any[] ? T[K] : T[K][];
    };
    $nin?: DeepPartial<T> & {
        [K in keyof T]?: T[K] extends any[] ? T[K] : T[K][];
    };
    $idGt?: NestedValue<T, string | number, string | number>;
    $idLt?: NestedValue<T, string | number, string | number>;
    $idGte?: NestedValue<T, string | number, string | number>;
    $idLte?: NestedValue<T, string | number, string | number>;
};
export type TypeAndExistenceOperators<T = any> = {
    $exists?: NestedValue<T, boolean, any>;
    $type?: NestedValue<T, JSPrimitiveType, any>;
};
export type ArrayOperators<T = any> = {
    $arrinc?: DeepPartial<T>;
    $arrincall?: DeepPartial<T>;
    $size?: NestedValue<T, number>;
};
export type StringOperators<T = any> = {
    $regex?: NestedValue<T, RegExp | string, string>;
    $startsWith?: NestedValue<T, string, string>;
    $endsWith?: NestedValue<T, string, string>;
};
export type OtherOperators<T = any> = {
    $subset?: DeepPartial<T>;
};
export type PredefinedSearchOperators<T = any> = LogicalOperators<T> & ComparisonOperators<T> & TypeAndExistenceOperators<T> & ArrayOperators<T> & StringOperators<T> & OtherOperators<T>;
export type SearchOptions<T = any> = PredefinedSearchOperators<T> & DeepPartial<T> & Record<string, any>;
export interface VContext {
    [key: string]: any;
}
export type ArrayUpdater<T = any> = {
    $push?: NestedValue<T, any>;
    $pushset?: NestedValue<T, any>;
    $pull?: NestedValue<T, any>;
    $pullall?: NestedValue<T, any>;
};
export type ObjectUpdater<T = any> = {
    $merge?: NestedValue<T, any>;
    $deepMerge?: NestedValue<T, any>;
};
export type ValueUpdater<T = any> = {
    $inc?: NestedValue<T, number>;
    $dec?: NestedValue<T, number>;
    $unset?: NestedValue<T, any>;
    $rename?: NestedValue<T, any>;
    $set?: NestedValue<T, any>;
};
export type UpdaterArg<T = any> = ArrayUpdater<T> & ObjectUpdater<T> & ValueUpdater<T> & DeepPartial<T> & Record<string, any>;
export type Arg<T = any> = {
    [K in keyof T]?: any;
} & Record<string, any>;
export type SearchFunc<T = any> = (data: T, context: VContext) => boolean;
export type UpdaterFunc<T = any> = (data: T, context: VContext) => boolean;
export type Search<T = any> = SearchOptions<T> | SearchFunc<T>;
export type Updater<T = any> = UpdaterArg<T> | UpdaterArg<T>[] | UpdaterFunc<T>;
export interface UpdateOneOrAdd<T> {
    add_arg?: Arg<T>;
    id_gen?: boolean;
    context?: VContext;
}
export interface VQuery_Control {
}
export interface VQuery<T = Data> {
    collection?: string;
    search?: Search<T>;
    context?: VContext;
    dbFindOpts?: DbFindOpts<T>;
    findOpts?: FindOpts<T>;
    data?: Arg<T>;
    id_gen?: boolean;
    add_arg?: Arg<T>;
    updater?: Updater<T>;
    control?: VQuery_Control;
}
export type QueryBase<T = Data> = Required<Pick<VQuery<T>, "collection" | "search">> & Pick<VQuery<T>, "control">;
export type AddQuery<T = Data> = Required<Pick<VQuery<T>, "data" | "collection">> & Pick<VQuery<T>, "id_gen" | "control">;
export type FindQuery<T = Data> = Omit<QueryBase, "search"> & Pick<VQuery<T>, "search"> & Pick<VQuery<T>, "findOpts" | "dbFindOpts" | "context">;
export type FindOneQuery<T = Data> = QueryBase & Pick<VQuery<T>, "findOpts" | "context">;
export type UpdateQuery<T = Data> = QueryBase & Required<Pick<VQuery<T>, "updater">> & Pick<VQuery<T>, "context">;
export type RemoveQuery<T = Data> = QueryBase & Pick<VQuery<T>, "context">;
export type UpdateOneOrAddQuery<T = Data> = QueryBase & UpdateQuery & Pick<VQuery<T>, "add_arg" | "id_gen">;
export type ToggleOneQuery<T = Data> = QueryBase & Pick<VQuery<T>, "data" | "context">;
export interface UpdateOneOrAddResult<T> {
    data: T;
    type: "added" | "updated";
}
export interface ToggleOneResult<T> {
    data: T;
    type: "added" | "removed";
}
export interface DbFindOpts<T = any> {
    reverse?: boolean;
    limit?: number;
    offset?: number;
    sortBy?: KeysMatching<T, any>;
    sortAsc?: boolean;
}
export interface FindOpts<T = any> {
    select?: KeysMatching<T, any>[];
    exclude?: KeysMatching<T, any>[];
    transform?: Function;
}
declare class Collection<D = Data> {
    db: ValtheraCompatible;
    collection: string;
    constructor(db: ValtheraCompatible, collection: string);
    add(data: Arg<D>, id_gen: false): Promise<D>;
    add(data: Arg<D>, id_gen?: true): Promise<D & {
        _id: string;
    }>;
    find(search?: Search<D>, options?: DbFindOpts<D>, findOpts?: FindOpts<D>, context?: VContext): Promise<D[]>;
    findOne(search?: Search<D>, findOpts?: FindOpts<D>, context?: VContext): Promise<D>;
    update(search: Search<D>, updater: Updater<D>, context?: VContext): Promise<D[]>;
    updateOne(search: Search<D>, updater: Updater<D>, context?: VContext): Promise<D | null>;
    remove(search: Search<D>, context?: VContext): Promise<D[]>;
    removeOne(search: Search<D>, context?: VContext): Promise<D | null>;
    updateOneOrAdd(search: Search<D>, updater: Updater<D>, { add_arg, context, id_gen }?: UpdateOneOrAdd<D>): Promise<UpdateOneOrAddResult<D>>;
    toggleOne(search: Search<D>, data?: Arg<D>, context?: VContext): Promise<ToggleOneResult<D>>;
}
export interface ValtheraCompatible {
    c<T = Data>(collection: string): Collection<T>;
    getCollections(): Promise<string[]>;
    ensureCollection(collection: string): Promise<boolean>;
    issetCollection(collection: string): Promise<boolean>;
    add<T = Data>(query: AddQuery<T>): Promise<T>;
    find<T = Data>(query: FindQuery<T>): Promise<T[]>;
    findOne<T = Data>(query: FindOneQuery<T>): Promise<T | null>;
    update<T = Data>(query: UpdateQuery<T>): Promise<T[]>;
    updateOne<T = Data>(query: UpdateQuery<T>): Promise<T | null>;
    remove<T = Data>(query: RemoveQuery<T>): Promise<T[]>;
    removeOne<T = Data>(query: RemoveQuery<T>): Promise<T | null>;
    removeCollection(collection: string): Promise<boolean>;
    updateOneOrAdd<T = Data>(query: UpdateOneOrAddQuery<T>): Promise<UpdateOneOrAddResult<T>>;
    toggleOne<T = Data>(query: ToggleOneQuery<T>): Promise<ToggleOneResult<T>>;
}
export interface VQuery_Control {
    dir?: {
        lastFileNum?: number;
        sortedFiles?: string[];
    };
}
declare namespace RelationTypes {
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
        type?: "1" | "11" | "1n" | "nm";
        relations?: Relation;
        through?: {
            table: string;
            db?: string;
            pk: string;
            fk: string;
        };
    }
}
export interface VQL_OP_Find<T = any> {
    collection: string;
    search?: Search<T>;
    limit?: number;
    fields?: VQL_Fields;
    select?: VQL_Fields;
    options?: DbFindOpts<T>;
    searchOpts?: FindOpts<T>;
}
export interface VQL_OP_FindOne<T = any> {
    collection: string;
    search: Search<T>;
    fields?: VQL_Fields;
    select?: VQL_Fields;
    searchOpts?: FindOpts<T>;
}
export interface VQL_OP_Add<T = any> {
    collection: string;
    data: Arg<T>;
    id_gen?: boolean;
}
export interface VQL_OP_Update<T = any> {
    collection: string;
    search: Search<T>;
    updater: UpdaterArg<T>;
}
export interface VQL_OP_Remove<T = any> {
    collection: string;
    search: Search<T>;
}
export interface VQL_OP_UpdateOneOrAdd<T = any> {
    collection: string;
    search: Search<T>;
    updater: UpdaterArg<T>;
    add_arg?: Arg<T>;
    id_gen?: boolean;
}
export interface VQL_OP_ToggleOne<T = any> {
    collection: string;
    search: Search<T>;
    data?: Arg<T>;
}
export interface VQL_OP_CollectionOperation {
    collection: string;
}
export type VQL_Fields = Record<string, boolean | number> | string[];
export type VQL_Query_CRUD_Data<T = any> = {
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
    removeCollection: VQL_OP_CollectionOperation;
} | {
    ensureCollection: VQL_OP_CollectionOperation;
} | {
    issetCollection: VQL_OP_CollectionOperation;
} | {
    getCollections: {};
};
export type VQL_Query_CRUD_Keys = VQL_Query_CRUD_Data extends infer U ? U extends Record<string, unknown> ? keyof U : never : never;
export interface VQL_Query_CRUD<T = any> {
    db: string;
    d: VQL_Query_CRUD_Data<T>;
}
export interface VQL_Query_Relation {
    r: {
        path: RelationTypes.Path;
        search: Search;
        relations: RelationTypes.Relation;
        many?: boolean;
        options?: DbFindOpts;
        select?: RelationTypes.FieldPath[] | Record<string, any>;
    };
}
export interface VQL_Var {
    var?: {
        [k: string]: any;
    };
}
export type VQL_Query<T = any> = (VQL_Query_CRUD<T> | VQL_Query_Relation) & VQL_Var;
export type VQLUQ<T = any> = VQL_Query<T> | string | {
    query: string;
} & VQL_Var;
export interface VQLError {
    err: true;
    msg: string;
    c: number;
}
export {};
