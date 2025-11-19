#!/usr/bin/env node

const params = process.argv.slice(2).join(" ");
const port = process.env.VQL_PORT || 3000;
const endpoint = process.env.VQL_ENDPOINT || "http://localhost:" + port + "/VQL";

const res = await fetch(endpoint, {
    body: params.startsWith("{") ? params : JSON.stringify({ query: params }),
    headers: {
        "Content-Type": "application/json"
    },
    method: "POST"
}).then((res) => res.json());

if (res.err)
    console.log(res);
else
    console.dir(res.result, { depth: null });

export { }