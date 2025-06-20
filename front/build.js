import esbuild from "esbuild";
import stylePlugin from "esbuild-style-plugin";
import { copyFileSync } from "fs";

const workerEntryPoints = [
	"vs/language/json/json.worker.js",
	"vs/language/css/css.worker.js",
	"vs/language/html/html.worker.js",
	"vs/language/typescript/ts.worker.js",
	"vs/language/typescript/ts.worker.js",
	"vs/editor/editor.worker.js"
];

esbuild.build({
	entryPoints: workerEntryPoints.map((entry) => `node_modules/monaco-editor/esm/${entry}`),
	bundle: true,
	format: "iife",
	outbase: "node_modules/monaco-editor/esm/",
	outdir: "dist",
    splitting: false,
});

esbuild.build({
    entryPoints: [
        "src/index.ts"
    ],
    outdir: "dist",
    format: "esm",
    target: "es2022",
    bundle: true,
    sourcemap: true,
    external: [],
    splitting: false,
    minify: true,
    plugins: [
        stylePlugin({
            renderOptions: {
                sassOptions: {
                    silenceDeprecations: ['legacy-js-api'],
                    outputStyle: "compressed"
                }
            }
        })
    ],
	loader: {
		".ttf": "file",
        ".ts": "ts"
	}
}).catch(() => process.exit(1));

copyFileSync("./node_modules/@wxn0brp/vql/vql.d.ts", "./dist/vql.d.ts");