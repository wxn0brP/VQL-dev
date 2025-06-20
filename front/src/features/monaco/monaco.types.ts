import $store from "#store";
import { fetchVQL } from "@wxn0brp/vql-client";
import { monaco } from ".";

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

export function setDbList(dbs: string[]) {
    setTsType("dbList", `declare type V_DataBasesList = ${dbs.map(name => `"${name}"`).join(" | ")};`);
}

export function setCollectionList(dbs: string[]) {
    setTsType("collectionList", `declare type V_CollectionList = ${dbs.map(name => `"${name}"`).join(" | ")};`);
}

export function setRelationPaths(data: [string, string][]) {
    const mapped = data.map(([db, collection]) => `["${db}","${collection}"]`).join(" | ");
    setTsType("relationPaths", `declare type V_RelationPaths = ${mapped || "[string, string]"};`);
}

setDbList([]);
setCollectionList([]);
setRelationPaths([]);

export async function loadAllCollections() {
    const allCollections = [];
    const relationPaths: [string, string][] = [];

    const adapters = $store.adapters.get();
    for (const adapter of adapters) {
        const collections = await fetchVQL(`${adapter.logic_id} getCollections`); 
        allCollections.push(...collections);
        for (const collection of collections) {
            relationPaths.push([adapter.logic_id, collection]);
        }
    }

    setCollectionList(allCollections);
    setRelationPaths(relationPaths);
}

$store.adapters.subscribe(loadAllCollections);
$store.selectedAdapter.subscribe(loadAllCollections);
loadAllCollections();