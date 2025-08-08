export interface Data {
    [key: string]: any;
}
export interface VContext {
    [key: string]: any;
}
export type KeysMatching<T, V, C = V> = {
    [K in keyof T]-?: T[K] extends C ? K : never;
}[keyof T];
export type PartialOfType<T, V, C = V> = Partial<Record<KeysMatching<T, V, C>, V>>;
export type PartialPickMatching<T, V, C = V> = Partial<Pick<T, KeysMatching<T, V, C>>>;
export type LogicalOperators<T = any> = {
    $and?: Array<SearchOptions<T>>;
    $or?: Array<SearchOptions<T>>;
    $not?: SearchOptions<T>;
};
export type ComparisonOperators<T = any> = {
    $gt?: PartialOfType<T, number>;
    $lt?: PartialOfType<T, number>;
    $gte?: PartialOfType<T, number>;
    $lte?: PartialOfType<T, number>;
    $between?: PartialOfType<T, [
        number,
        number
    ], number>;
    $in?: Partial<Record<keyof T, T[keyof T][]>>;
    $nin?: Partial<Record<keyof T, T[keyof T][]>>;
};
export type TypeAndExistenceOperators<T = any> = {
    $exists?: PartialOfType<T, boolean, any>;
    $type?: PartialOfType<T, string>;
};
export type ArrayOperators<T = any> = {
    $arrinc?: PartialPickMatching<T, any[]>;
    $arrincall?: PartialPickMatching<T, any[]>;
    $size?: PartialOfType<T, number>;
};
export type StringOperators<T = any> = {
    $regex?: PartialOfType<T, RegExp, string>;
    $startsWith?: PartialOfType<T, string>;
    $endsWith?: PartialOfType<T, string>;
};
export type OtherOperators<T = any> = {
    $subset?: Partial<Record<keyof T, T[keyof T]>>;
};
export type PredefinedSearchOperators<T = any> = LogicalOperators<T> & ComparisonOperators<T> & TypeAndExistenceOperators<T> & ArrayOperators<T> & StringOperators<T> & OtherOperators<T>;
export type SearchOptions<T = any> = PredefinedSearchOperators<T> & Arg<T>;
export type ArrayUpdater<T = any> = {
    $push?: PartialOfType<T, any>;
    $pushset?: PartialOfType<T, any>;
    $pull?: PartialOfType<T, any>;
    $pullall?: PartialOfType<T, any>;
};
export type ObjectUpdater<T = any> = {
    $merge?: PartialOfType<T, any[]>;
};
export type ValueUpdater<T = any> = {
    $inc?: PartialOfType<T, number>;
    $dec?: PartialOfType<T, number>;
    $unset?: PartialOfType<T, any>;
    $rename?: PartialOfType<T, any>;
};
export type UpdaterArg<T = any> = ArrayUpdater<T> & ObjectUpdater<T> & ValueUpdater<T> & Arg<T>;
export type Arg<T = any> = {
    [K in keyof T]?: any;
} & Record<string, any>;
export type SearchFunc<T = any> = (data: T, context: VContext) => boolean;
export type UpdaterFunc<T = any> = (data: T, context: VContext) => boolean;
export type Search<T = any> = SearchOptions<T> | SearchFunc<T>;
export type Updater<T = any> = UpdaterArg<T> | UpdaterArg<T>[] | UpdaterFunc<T>;
export interface DbFindOpts<T = any> {
    reverse?: boolean;
    max?: number;
    offset?: number;
    sortBy?: KeysMatching<T, any>;
    sortAsc?: boolean;
}
export interface FindOpts<T = any> {
    select?: KeysMatching<T, any>[];
    exclude?: KeysMatching<T, any>[];
    transform?: Function;
}
declare class CollectionManager<D = Data> {
    private db;
    private collection;
    constructor(db: ValtheraCompatible, collection: string);
    add<T = Data>(data: Arg<T & D>, id_gen?: boolean): Promise<T>;
    find<T = Data>(search?: Search<T & D>, context?: VContext, options?: DbFindOpts<T & Data>, findOpts?: FindOpts<T & Data>): Promise<T[]>;
    findOne<T = Data>(search?: Search<T & Data>, context?: VContext, findOpts?: FindOpts<T & Data>): Promise<T>;
    update<T = Data>(search: Search<T & Data>, updater: Updater<T & Data>, context?: VContext): Promise<boolean>;
    updateOne<T = Data>(search: Search<T & Data>, updater: Updater<T & Data>, context?: VContext): Promise<boolean>;
    remove<T = Data>(search: Search<T & Data>, context?: VContext): Promise<boolean>;
    removeOne<T = Data>(search: Search<T & Data>, context?: VContext): Promise<boolean>;
    updateOneOrAdd<T = Data>(search: Search<T & Data>, updater: Updater<T & Data>, add_arg?: Arg<T & Data>, context?: VContext, id_gen?: boolean): Promise<boolean>;
}
export interface ValtheraCompatible {
    c(collection: string): CollectionManager;
    getCollections(): Promise<string[]>;
    ensureCollection(collection: string): Promise<boolean>;
    issetCollection(collection: string): Promise<boolean>;
    add<T = Data>(collection: string, data: Arg<T>, id_gen?: boolean): Promise<T>;
    find<T = Data>(collection: string, search: Search<T>, context?: VContext, options?: DbFindOpts<T>, findOpts?: FindOpts<T>): Promise<T[]>;
    findOne<T = Data>(collection: string, search: Search<T>, context?: VContext, findOpts?: FindOpts<T>): Promise<T | null>;
    update<T = Data>(collection: string, search: Search<T>, updater: Updater<T>, context?: VContext): Promise<boolean>;
    updateOne<T = Data>(collection: string, search: Search<T>, updater: Updater<T>, context?: VContext): Promise<boolean>;
    remove<T = Data>(collection: string, search: Search<T>, context?: VContext): Promise<boolean>;
    removeOne<T = Data>(collection: string, search: Search<T>, context?: VContext): Promise<boolean>;
    removeCollection(collection: string): Promise<boolean>;
    updateOneOrAdd<T = Data>(collection: string, search: Search<T>, updater: Updater<T>, add_arg?: Arg<T>, context?: VContext, id_gen?: boolean): Promise<boolean>;
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
        findOpts?: DbFindOpts;
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
    removeCollection: VQL_OP_CollectionOperation;
} | {
    ensureCollection: VQL_OP_CollectionOperation;
} | {
    issetCollection: VQL_OP_CollectionOperation;
} | {
    getCollections: {};
};
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
        select?: RelationTypes.FieldPath[];
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
