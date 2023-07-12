import esbuild from "esbuild";
import { minifyHTMLLiteralsPlugin } from "esbuild-plugin-minify-html-literals";

await esbuild.build({
  entryPoints: ["./src/index.ts"],
  plugins: [minifyHTMLLiteralsPlugin()],
  outdir: "dist/src",
  format: "esm",
  minify: true,
  bundle: true,
});
