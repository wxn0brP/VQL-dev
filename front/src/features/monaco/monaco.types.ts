import $store from "#store";
import { VQLR } from "@wxn0brp/vql-client/vql";
import { getQuery, monaco } from ".";
import { apiService } from "#services";

export function setTsType(file: string, content: string) {
    content = content
        .replace(/^\s*import .*?;?\s*$/gm, "")
        .replace(/^\s*export\s+{[^}]*};?\s*$/gm, "")
        .replace(/export\s+default\s+/, "declare ")
        .replace(/export\s+(?=(class|interface|type|const|function|enum|namespace))/g, "declare ")
    monaco.languages.typescript.typescriptDefaults.addExtraLib(content, "ts:VQL_" + file + ".d.ts");
}

fetch("./dist/vql.d.ts").then((res) => res.text()).then((content) => {
    content = content
        .replace("db: string;", "db: V_DataBasesList;")
        .replaceAll("collection: string;", "collection: V_CollectionList;")
        .replace("RelationTypes.Path", "V_RelationPaths")
        .replace("path: Path;", "path: V_RelationPaths;")
    setTsType("raw", content);
});

function mapCollection(collection: string[]) {
    return collection.map((item) => `"${item}"`).join(" | ");
}

export function setDbList(dbs: string[]) {
    setTsType("dbList", `declare type V_DataBasesList = ${mapCollection(dbs)};`);
}

setTsType("collectionList", `declare type V_CollectionList = "";`);

export function setRelationPaths(data: [string, string][]) {
    const mapped = data.map(([db, collection]) => `["${db}","${collection}"]`).join(" | ");
    setTsType("relationPaths", `declare type V_RelationPaths = ${mapped || "[string, string]"};`);
}

export function setTsCollectionList(adapterId: string, collections: string[]) {
    setTsType(`collections_${adapterId}`, `declare type V_CollectionList_${adapterId} = ${mapCollection(collections)};`);
}

setDbList([]);
setRelationPaths([]);

export async function loadAllCollections() {
    const relationPaths: [string, string][] = [];

    const adapters = $store.adapters.get();
    for (const adapter of adapters) {
        const collections = await apiService.fetchVQL(`${adapter.logic_id} getCollections`);

        for (const collection of collections) {
            relationPaths.push([adapter.logic_id, collection]);
        }

        setTsCollectionList(adapter.logic_id, collections);
    }
    
    setRelationPaths(relationPaths);
}

$store.adapters.subscribe(loadAllCollections);
loadAllCollections();

qs("#editor").addEventListener("keyup", (e) => {
    try {
        const query = getQuery() as VQLR;
        setTsType("collectionList", `declare type V_CollectionList = ${"db" in query ? `V_CollectionList_${query.db}` : ""};`);
    } catch {}
});