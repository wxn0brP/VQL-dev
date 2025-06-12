const urlParams = new URLSearchParams(window.location.search);
let param = urlParams.get("server") || urlParams.get("url") || urlParams.get("s");
if (param && !isNaN(parseInt(param))) param = "http://localhost:" + param;

export const defaultFetchUrl = param || "http://localhost:3000";