import esbuild from "esbuild";
import stylePlugin from "esbuild-style-plugin";

esbuild.build({
    entryPoints: [
        "src/front/index.ts"
    ],
    outdir: "dist/front-build",
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
    ]
}).catch(() => process.exit(1));