type AnyObject = Record<string, any>;

function getTypeString(value: any): string {
    if (value === null) return "null";
    if (value === undefined) return "undefined";
    if (Array.isArray(value)) {
        if (value.length === 0) return "any[]";
        const elemTypes = new Set(value.map(getTypeString));
        return `(${[...elemTypes].sort().join(" | ")})[]`;
    }
    if (typeof value === "object") return "object";
    return typeof value;
}

function formatUnifiedTypes(
    data: AnyObject[],
    asString: true
): Record<string, string>;
function formatUnifiedTypes(
    data: AnyObject[],
    asString: false
): Record<string, string[]>;
function formatUnifiedTypes(
    data: AnyObject[],
    asString: boolean
): Record<string, any> {
    const fieldTypes: Record<string, Set<string>> = {};

    for (const obj of data) {
        for (const key in obj) {
            const typeStr = getTypeString(obj[key]);
            if (!fieldTypes[key]) fieldTypes[key] = new Set();
            fieldTypes[key].add(typeStr);
        }
    }

    const result: Record<string, string | string[]> = {};
    for (const [key, typesSet] of Object.entries(fieldTypes)) {
        const sortedTypes = [...typesSet].sort()
        result[key] = asString ? sortedTypes.join(" | ") : sortedTypes;
    }
    if (Object.keys(result).length === 0) {
        result["???"] = "???";
    }
    return result;
}

export { formatUnifiedTypes };